import express from "express";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import "./auth/google.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import pool from "./db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "..")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
if (!fs.existsSync(path.join(__dirname, "uploads"))) {
  fs.mkdirSync(path.join(__dirname, "uploads"));
}

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).send("Unauthorized");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ========== ROUTES ==========

app.get("/", (req, res) => res.send("OAuth server running"));

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login.html" }),
  async (req, res) => {
    const { email, displayName } = req.user;
    try {
      const existing = await pool.query("SELECT user_id FROM user_profiles WHERE email = $1", [email]);
      if (existing.rows.length === 0) {
        await pool.query(
          "INSERT INTO user_profiles (email, full_name) VALUES ($1, $2)",
          [email, displayName]
        );
      }
    } catch (err) {
      console.error("Error inserting user profile:", err.message);
    }
    res.redirect("/dashboard.html");
  }
);

app.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/login.html"));
});

// ========== PROFILE ROUTES ==========

app.get("/api/user", ensureAuthenticated, async (req, res) => {
  try {
    const email = req.user.email;
    const result = await pool.query("SELECT * FROM user_profiles WHERE email = $1", [email]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Error fetching user profile");
  }
});

app.post("/api/user/update", ensureAuthenticated, async (req, res) => {
  const { phone, address } = req.body;
  const email = req.user.email;
  try {
    await pool.query(
      `UPDATE user_profiles SET phone_number = $1, address = $2 WHERE email = $3`,
      [phone, address, email]
    );
    res.send("Profile updated");
  } catch (err) {
    console.error("Profile update failed:", err);
    res.status(500).send("Error updating profile");
  }
});

// ========== LOST ITEM ROUTES ==========


app.post("/api/lost", ensureAuthenticated, upload.single("image"), async (req, res) => {
  try {
    const { itemName, lostDate, line, station, remarks } = req.body;
    const image = req.file?.filename;
    const email = req.user.email;

    const user = await pool.query("SELECT user_id FROM user_profiles WHERE email = $1", [email]);
    const userId = user.rows[0]?.user_id;

    await pool.query(
      `INSERT INTO lost_items (item_name, lost_date, line, station, remarks, image, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [itemName, lostDate, line, station, remarks, image, userId]
    );

    res.send("Lost item reported");
  } catch (err) {
    console.error("Lost item insert failed:", err);
    res.status(500).send("DB error");
  }
});

app.get("/api/lost", async (req, res) => {
  const { line, station, date } = req.query;
  let query = `SELECT li.*, up.full_name as user_name, up.email as user_email, up.phone_number, up.address
               FROM lost_items li
               JOIN user_profiles up ON li.user_id = up.user_id WHERE 1=1`;
  const values = [];

  if (line) {
    values.push(line.toLowerCase());
    query += ` AND LOWER(li.line) = $${values.length}`;
  }
  if (station) {
    values.push(station.toLowerCase());
    query += ` AND LOWER(li.station) = $${values.length}`;
  }
  if (date) {
    values.push(date);
    query += ` AND li.lost_date = $${values.length}`;
  }

  try {
    const result = await pool.query(query, values);
    const rows = result.rows.map(row => ({ ...row, type: "lost" }));
    res.json(rows);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).send("Fetch error");
  }
});


// ========== FOUND ITEM ROUTES ==========

app.post("/api/found", ensureAuthenticated, upload.single("image"), async (req, res) => {
  try {
    // Form field names MUST match those sent by the frontend form
    const { item_name, remarks, found_date, line, station } = req.body; // `date` is the name in HTML form
    const image = req.file?.filename;
    const email = req.user.email;

    // Get user_id
    const userResult = await pool.query(
      "SELECT user_id FROM user_profiles WHERE email = $1",
      [email]
    );

    const userId = userResult.rows[0]?.user_id;
    if (!userId) return res.status(400).send("User not found");

    // Insert into found_items
    await pool.query(
      `INSERT INTO found_items (item_name, found_date, line, station, remarks, image, user_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [item_name, found_date, line, station, remarks, image, userId]
    );

    res.send("Found item reported successfully.");
  } catch (err) {
    console.error("Found item insert failed:", err);
    res.status(500).send("DB error while inserting found item");
  }
});

app.get("/api/found", async (req, res) => {
  const { line, station, found_date } = req.query; // Match query param names with frontend (use `date`, not `found_date`)

  let query = `
    SELECT fi.*, up.full_name AS user_name, up.email AS user_email, up.phone_number, up.address
    FROM found_items fi
    JOIN user_profiles up ON fi.user_id = up.user_id
    WHERE 1=1`;
  
  const values = [];

  if (line) {
    values.push(line.toLowerCase());
    query += ` AND LOWER(fi.line) = $${values.length}`;
  }
  if (station) {
    values.push(station.toLowerCase());
    query += ` AND LOWER(fi.station) = $${values.length}`;
  }
  if (found_date) {
    values.push(found_date);
    query += ` AND fi.found_date = $${values.length}`;
  }

  try {
    const result = await pool.query(query, values);
    const rows = result.rows.map(row => ({ ...row, type: "found" }));
    res.json(rows);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).send("Error fetching found items");
  }
});



// ===== SERVER START =====
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});

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

// In-memory storage for profile fields
const userProfiles = {}; // userId -> { phone, address }

// Serve static files
app.use(express.static(path.join(__dirname, "..")));
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== MULTER CONFIG ==========
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ========== ROUTES ==========
app.get("/", (req, res) => res.send("OAuth server running"));

// Google OAuth
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login.html"
  }),
  (req, res) => {
    res.redirect("/dashboard.html");
  }
);

// Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login.html");
  });
});

// LOST FORM - INSERT TO DB
app.post("/api/lost", upload.single("image"), async (req, res) => {
  try {
    const { itemName, lostDate, line, station, remarks } = req.body;
    const image = req.file?.filename;
    const user = req.user;

    await pool.query(
      `INSERT INTO lost_items (item_name, lost_date, line, station, remarks, image, user_email, user_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [itemName, lostDate, line, station, remarks, image, user?.emails?.[0]?.value, user?.displayName]
    );

    res.send("Lost item saved to DB!");
  } catch (err) {
    console.error("Error inserting lost item:", err);
    res.status(500).send("DB error: " + err.message);
  }
});

// LOST GET - FETCH FROM DB
app.get("/api/lost", async (req, res) => {
  const { line, station, date } = req.query;

  let query = "SELECT * FROM lost_items WHERE 1=1";
  const values = [];

  if (line) {
    values.push(line);
    query += ` AND line = $${values.length}`;
  }
  if (station) {
    values.push(station);
    query += ` AND station = $${values.length}`;
  }
  if (date) {
    values.push(date);
    query += ` AND lost_date = $${values.length}`;
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching lost items:", err);
    res.status(500).send("DB fetch error");
  }
});

// FOUND FORM
app.post("/api/found", upload.single("image"), async (req, res) => {
  try {
    const { itemName, foundDate, line, station, remarks } = req.body;
    const image = req.file?.filename;
    const user = req.user;

    await pool.query(
      `INSERT INTO found_items (item_name, found_date, line, station, remarks, image, user_email, user_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [itemName, foundDate, line, station, remarks, image, user?.emails?.[0]?.value, user?.displayName]
    );

    res.send("Found item saved to DB!");
  } catch (err) {
    console.error("Error inserting found item:", err);
    res.status(500).send("DB error: " + err.message);
  }
});

// FOUND GET - FETCH FROM DB
app.get("/api/found", async (req, res) => {
  const { line, station, date } = req.query;

  let query = "SELECT * FROM found_items WHERE 1=1";
  const values = [];

  if (line) {
    values.push(line);
    query += ` AND line = $${values.length}`;
  }
  if (station) {
    values.push(station);
    query += ` AND station = $${values.length}`;
  }
  if (date) {
    values.push(date);
    query += ` AND found_date = $${values.length}`;
  }

  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching found items:", err);
    res.status(500).send("DB fetch error");
  }
});

// Get user info with custom profile fields
app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    const userId = req.user.id;
    const profile = userProfiles[userId] || {};
    res.json({
      name: req.user.displayName,
      email: req.user.email,
      phone: profile.phone || "",
      address: profile.address || ""
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Update phone/address
app.post("/api/user/update", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;
  const { phone, address } = req.body;

  if (!userProfiles[userId]) userProfiles[userId] = {};
  userProfiles[userId].phone = phone;
  userProfiles[userId].address = address;

  res.send("Profile updated successfully");
});

// ========== SERVER ==========
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

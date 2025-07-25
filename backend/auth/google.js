import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import pool from "../db.js"; // ✅ Import DB connection

dotenv.config();

// 🔐 Session handling
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 🔑 Google OAuth Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails?.[0]?.value || "";
    const name = profile.displayName;

    try {
      // ✅ Check if user already exists
      const result = await pool.query(
        "SELECT id FROM user_profiles WHERE email = $1",
        [email]
      );

      // ➕ If not, insert new user
      if (result.rows.length === 0) {
        await pool.query(
          "INSERT INTO user_profiles (email, name) VALUES ($1, $2)",
          [email, name]
        );
      }

      const user = {
        id: profile.id,
        displayName: name,
        email: email,
        photo: profile.photos?.[0]?.value || "",
      };

      return done(null, user);

    } catch (err) {
      console.error("Error checking/inserting user:", err);
      return done(err, null);
    }
  }
));
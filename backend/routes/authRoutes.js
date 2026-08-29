
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");

const router = express.Router();

// =====================================================
// REGISTER
// =====================================================

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = req.body;

    // -------------------------------------------------
    // Check required fields
    // -------------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // -------------------------------------------------
    // Check password length
    // -------------------------------------------------

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // -------------------------------------------------
    // Check if email already exists
    // -------------------------------------------------

    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    // -------------------------------------------------
    // Hash password
    // -------------------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // -------------------------------------------------
    // Insert user
    // -------------------------------------------------

    const result = await pool.query(
      `
      INSERT INTO users
      (
        first_name,
        last_name,
        email,
        phone,
        password
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        first_name,
        last_name,
        email,
        phone,
        role,
        created_at
      `,
      [
        firstName,
        lastName,
        email,
        phone,
        hashedPassword,
      ]
    );

    // -------------------------------------------------
    // Send response
    // -------------------------------------------------

    res.status(201).json({
      message: "Registration successful",
      user: result.rows[0],
    });

  } catch (error) {

    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req, res) => {
  try {

    const {
      email,
      password,
    } = req.body;

    // -------------------------------------------------
    // Check fields
    // -------------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // -------------------------------------------------
    // Find user
    // -------------------------------------------------

    const result = await pool.query(
      `
      SELECT
        id,
        first_name,
        last_name,
        email,
        phone,
        password,
        role
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // -------------------------------------------------
    // Compare password
    // -------------------------------------------------

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // -------------------------------------------------
    // Create JWT
    // -------------------------------------------------

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // -------------------------------------------------
    // Send response
    // -------------------------------------------------

    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;


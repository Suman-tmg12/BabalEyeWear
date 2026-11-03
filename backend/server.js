require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed frontend origins (Vite uses 5173 by default, 5174 if 5173 is busy)
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
].filter(Boolean);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl) and the listed frontends
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());

// Rate limiting (Increased for testing, but still protects against abuse)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Allow 100 requests per 15 minutes
  message: { message: "Too many requests from this IP, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/auth", authLimiter);

// Routes
app.use("/api/auth", authRoutes);

// Health check endpoint (optional but recommended)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler (MUST be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`⚠️  Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(", ")}`);
});
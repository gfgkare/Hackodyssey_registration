import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import registrationRouter from "./modules/registration/registration.routes";
import authRouter from "./modules/auth/auth.routes";
import adminRouter from "./modules/admin/admin.routes";

dotenv.config();

const app = express();

const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "https://hackodyssey4.vercel.app",
];

const envOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((url) => url.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.trim().replace(/\/+$/, "");

      // Check configured origins or any local development origin (localhost / 127.0.0.1 on any port)
      const isConfigured =
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes(normalizedOrigin);
      const isLocalhost =
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
      const isVercelDomain =
        /^https:\/\/hackodyssey4.*\.vercel\.app$/.test(normalizedOrigin) ||
        /^https:\/\/.*hackodyssey.*\.vercel\.app$/.test(normalizedOrigin);

      if (isConfigured || isLocalhost || isVercelDomain) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-admin-setup-key",
      "Cookie",
    ],
    exposedHeaders: ["Set-Cookie"],
    optionsSuccessStatus: 200,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.method === "OPTIONS",
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/registrations", registrationRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Hackodessey backend is running",
  });
});

export default app;
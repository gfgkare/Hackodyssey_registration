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

app.use(helmet());


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
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
import { Router } from "express";
import {
  createAdminAccount,
  loginAdmin,
  logoutAdmin,
} from "./auth.controller";
import { setupKeyMiddleware } from "../../middleware/setup-key.middleware";
import { adminAuthMiddleware } from "../../middleware/admin-auth.middleware";

const authRouter = Router();

authRouter.post("/setup", setupKeyMiddleware, createAdminAccount);

authRouter.post("/login", loginAdmin);

authRouter.post("/logout", adminAuthMiddleware, logoutAdmin);

export default authRouter;
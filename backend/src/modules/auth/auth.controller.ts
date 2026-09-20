import { Request, Response } from "express";
import { z } from "zod";
import {
  createAdmin,
  generateAdminToken,
  validateAdminCredentials,
  createAuditLog,
} from "./auth.service";
import { AuthenticatedRequest } from "../../middleware/admin-auth.middleware";
import { adminAuthMiddleware } from "../../middleware/admin-auth.middleware";

const createAdminSchema = z.object({
  username: z.string().trim().min(3).max(50),
  password: z.string().min(12, "Password must contain at least 12 characters"),
});

export async function createAdminAccount(
  req: Request,
  res: Response
): Promise<void> {
  const validationResult = createAdminSchema.safeParse(req.body);

  if (!validationResult.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten(),
    });
    return;
  }

  try {
    const admin = await createAdmin(
      validationResult.data.username,
      validationResult.data.password
    );

    res.status(201).json({
      success: true,
      message: "Admin account created successfully",
      data: admin,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Admin creation failed";

    if (message.includes("already exists")) {
      res.status(409).json({
        success: false,
        message,
      });
      return;
    }

    console.error("Admin creation error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function loginAdmin(
  req: Request,
  res: Response
): Promise<void> {
  const validationResult = loginSchema.safeParse(req.body);

  if (!validationResult.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten(),
    });
    return;
  }

  try {
    const admin = await validateAdminCredentials(
      validationResult.data.username,
      validationResult.data.password
    );

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
      return;
    }

    const token = generateAdminToken(admin.id);

    await createAuditLog(
     admin.id,
     "ADMIN_LOGIN",
     "Admin logged in successfully"
    );

    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: {
        id: admin.id,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}

export async function logoutAdmin(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    if (req.adminId) {
      await createAuditLog(
        req.adminId,
        "ADMIN_LOGOUT",
        "Admin logged out successfully"
      );
    }

    res.clearCookie("admin_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Admin logout successful",
    });
  } catch (error) {
    console.error("Admin logout error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}

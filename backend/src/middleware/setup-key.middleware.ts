import { Request, Response, NextFunction } from "express";

export function setupKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const providedKey = req.header("x-setup-key");
  const configuredKey = process.env.ADMIN_SETUP_KEY;

  if (!configuredKey) {
    res.status(500).json({
      success: false,
      message: "Admin setup is not configured",
    });
    return;
  }

  if (!providedKey || providedKey !== configuredKey) {
    res.status(403).json({
      success: false,
      message: "Invalid admin setup key",
    });
    return;
  }

  next();
}
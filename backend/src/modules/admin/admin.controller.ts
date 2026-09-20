import { Request, Response } from "express";
import { z } from "zod";
import { RegistrationStatus } from "@prisma/client";

import {
  getAllRegistrations,
  updateRegistrationStatus,
  getAuditLogs,
} from "./admin.service";

import { AuthenticatedRequest } from "../../middleware/admin-auth.middleware";

const teamIdSchema = z.object({
  teamId: z.string().uuid("Invalid team ID"),
});

export async function listRegistrations(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const teams = await getAllRegistrations();

    res.status(200).json({
      success: true,
      message: "Registrations fetched successfully",
      data: teams,
    });
  } catch (error) {
    console.error("Fetch registrations error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}

export async function changeRegistrationStatus(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  const validationResult = teamIdSchema.safeParse(req.params);

  if (!validationResult.success) {
    res.status(400).json({
      success: false,
      message: "Invalid team ID",
      errors: validationResult.error.flatten(),
    });

    return;
  }

  if (!req.adminId) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }

  const status = req.body?.status;

  if (status !== RegistrationStatus.CONFIRMED) {
    res.status(400).json({
      success: false,
      message: "Only CONFIRMED status is supported",
    });

    return;
  }

  try {
    const team = await updateRegistrationStatus(
      validationResult.data.teamId,
      status,
      req.adminId
    );

    res.status(200).json({
      success: true,
      message: `Registration ${status.toLowerCase()} successfully`,
      data: team,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Status update failed";

    if (
      message === "Registration not found" ||
      message.startsWith("Registration is already")
    ) {
      res.status(400).json({
        success: false,
        message,
      });

      return;
    }

    console.error("Status update error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}

export async function listAuditLogs(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const logs = await getAuditLogs();

    res.status(200).json({
      success: true,
      message: "Audit logs fetched successfully",
      data: logs,
    });
  } catch (error) {
    console.error("Fetch audit logs error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}
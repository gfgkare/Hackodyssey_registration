import { Request, Response } from "express";
import {
  registrationSchema,
} from "./registration.schema";
import {
  registerTeam,
  getTeamByName,
  getTeamByRegistrationNumber,
} from "./registration.service";

export async function createRegistration(
  req: Request,
  res: Response
): Promise<void> {
  const validationResult = registrationSchema.safeParse(req.body);

  // Validation errors
  if (!validationResult.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validationResult.error.flatten(),
    });
    return;
  }

  try {
    const team = await registerTeam(validationResult.data);

    res.status(201).json({
      success: true,
      message: "Team registered successfully",
      data: team,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Registration failed";

    // Known duplicate-data errors
    if (
      message.includes("already exists") ||
      message.includes("same email and mobile") ||
      message.includes("registration number")
    ) {
      res.status(409).json({
        success: false,
        message,
      });
      return;
    }

    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}

export async function getRegistrationStatus(
  req: Request,
  res: Response
): Promise<void> {
  const teamName =
    typeof req.query.teamName === "string"
      ? req.query.teamName.trim()
      : "";

  const registrationNumber =
    typeof req.query.registrationNumber === "string"
      ? req.query.registrationNumber.trim()
      : "";

  // Require at least one search parameter
  if (!teamName && !registrationNumber) {
    res.status(400).json({
      success: false,
      message: "Provide either teamName or registrationNumber",
    });
    return;
  }

  // Prevent ambiguous searches
  if (teamName && registrationNumber) {
    res.status(400).json({
      success: false,
      message: "Provide only one search parameter",
    });
    return;
  }

  try {
    const team = registrationNumber
      ? await getTeamByRegistrationNumber(registrationNumber)
      : await getTeamByName(teamName);

    if (!team) {
      res.status(404).json({
        success: false,
        message: "Registration not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Registration status fetched successfully",
      data: team,
    });
  } catch (error: unknown) {
    console.error("Status lookup error:", error);

    res.status(500).json({
      success: false,
      message: "An internal server error occurred",
    });
  }
}
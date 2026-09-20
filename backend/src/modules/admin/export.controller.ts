import { Request, Response } from "express";

import {
  generateCsvExport,
  generateExcelExport,
  generateTeamsCsvExport,
  generateTeamsExcelExport,
} from "./export.service";

export async function exportCsv(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const csv = await generateCsvExport();

    res.status(200);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="hackodessey-participants.csv"',
    );

    res.send(csv);
  } catch (error) {
    console.error("Participants CSV export error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate participants CSV export",
    });
  }
}

export async function exportExcel(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const workbook = await generateExcelExport();

    res.status(200);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="hackodessey-participants.xlsx"',
    );

    res.send(workbook);
  } catch (error) {
    console.error("Participants Excel export error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate participants Excel export",
    });
  }
}

export async function exportTeamsCsv(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const csv = await generateTeamsCsvExport();

    res.status(200);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="hackodessey-teams.csv"',
    );

    res.send(csv);
  } catch (error) {
    console.error("Teams CSV export error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate teams CSV export",
    });
  }
}

export async function exportTeamsExcel(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const workbook = await generateTeamsExcelExport();

    res.status(200);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="hackodessey-teams.xlsx"',
    );

    res.send(workbook);
  } catch (error) {
    console.error("Teams Excel export error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate teams Excel export",
    });
  }
}
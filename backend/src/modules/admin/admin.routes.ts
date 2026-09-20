import { Router, Response } from "express";

import {
  adminAuthMiddleware,
  AuthenticatedRequest,
} from "../../middleware/admin-auth.middleware";

import {
  listRegistrations,
  changeRegistrationStatus,
  listAuditLogs,
} from "./admin.controller";
import {
  exportCsv,
  exportExcel,
  exportTeamsCsv,
  exportTeamsExcel,
} from "./export.controller";

const adminRouter = Router();

adminRouter.get(
  "/me",
  adminAuthMiddleware,
  (req: AuthenticatedRequest, res: Response): void => {
    res.status(200).json({
      success: true,
      message: "Admin authentication verified",
      data: {
        adminId: req.adminId,
      },
    });
  }
);

adminRouter.get(
  "/registrations",
  adminAuthMiddleware,
  listRegistrations
);

adminRouter.patch(
  "/registrations/:teamId/status",
  adminAuthMiddleware,
  changeRegistrationStatus
);

adminRouter.get(
  "/audit-logs",
  adminAuthMiddleware,
  listAuditLogs
);

adminRouter.get(
  "/exports/registrations.csv",
  adminAuthMiddleware,
  exportCsv
);

adminRouter.get(
  "/exports/teams.xlsx",
  adminAuthMiddleware,
  exportTeamsExcel,
);

adminRouter.get(
  "/exports/registrations.xlsx",
  adminAuthMiddleware,
  exportExcel
);

adminRouter.get(
  "/exports/teams.csv",
  adminAuthMiddleware,
  exportTeamsCsv,
);

export default adminRouter;
import { AuditAction, RegistrationStatus } from "@prisma/client";
import prisma from "../../config/prisma";

export async function getAllRegistrations() {
  return prisma.team.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      members: {
        select: {
          id: true,
          fullName: true,
          registrationNumber: true,
          collegeName: true,
          email: true,
          mobile: true,
          gender: true,
          academicYear: true,
          department: true,
          role: true,
          accommodationType: true,
          hostelName: true,
          roomNumber: true,
          wardenName: true,
          wardenContact: true,
        },
      },
    },
  });
}

export async function updateRegistrationStatus(
  teamId: string,
  status: RegistrationStatus,
  adminId: string
) {
  return prisma.$transaction(async (transaction) => {
    const team = await transaction.team.findUnique({
      where: {
        id: teamId,
      },
    });

    if (!team) {
      throw new Error("Registration not found");
    }

    if (team.status !== RegistrationStatus.CONFIRMED) {
      throw new Error("Registration is not confirmed");
    }

    const updatedTeam = await transaction.team.update({
      where: {
        id: teamId,
      },
      data: {
        status,
        confirmedAt:
          status === RegistrationStatus.CONFIRMED ? new Date() : null,
      },
      include: {
        members: true,
      },
    });

    await transaction.auditLog.create({
      data: {
        adminId,
        teamId,
        action:
          status === RegistrationStatus.CONFIRMED
            ? AuditAction.REGISTRATION_CONFIRMED
            : AuditAction.REGISTRATION_CANCELLED,
        details: `Registration status changed to ${status}`,
      },
    });

    return updatedTeam;
  });
}

export async function getAuditLogs() {
  return prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      admin: {
        select: {
          id: true,
          username: true,
        },
      },
      team: {
        select: {
          id: true,
          teamName: true,
        },
      },
    },
  });
}


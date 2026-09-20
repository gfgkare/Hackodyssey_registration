import { Prisma } from "@prisma/client";
import prisma from "../../config/prisma";
import { RegistrationInput } from "./registration.schema";

export async function registerTeam(data: RegistrationInput) {
  const existingTeam = await prisma.team.findFirst({
    where: {
      teamName: {
        equals: data.teamName,
        mode: "insensitive",
      },
    },
  });

  if (existingTeam) {
    throw new Error("A team with this name already exists");
  }

  try {
    const team = await prisma.$transaction(async (transaction) => {
      return transaction.team.create({
        data: {
          teamName: data.teamName,
          institution: data.institution ?? "",
          category: data.category,

          // Automatically confirm every successful registration
          status: "CONFIRMED",
          confirmedAt: new Date(),

          members: {
            create: data.members.map((member) => ({
              fullName: member.fullName,
              registrationNumber: member.registrationNumber,
              collegeName: member.collegeName || null,
              email: member.email,
              mobile: member.mobile,
              gender: member.gender,
              academicYear: member.academicYear,
              department: member.department,
              role: member.role,
              accommodationType: member.accommodationType || null,
              hostelName: member.hostelName || null,
              roomNumber: member.roomNumber || null,
              wardenName: member.wardenName || null,
              wardenContact: member.wardenContact || null,
            })),
          },
        },

        include: {
          members: true,
        },
      });
    });

    return team;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = Array.isArray(error.meta?.target)
          ? error.meta.target.join(", ")
          : String(error.meta?.target ?? "");

        if (target.includes("registrationNumber")) {
          throw new Error(
            "A member with this registration number already exists",
          );
        }

        if (target.includes("email") || target.includes("mobile")) {
          throw new Error(
            "A member with the same email and mobile combination already exists",
          );
        }

        if (target.includes("teamName")) {
          throw new Error("A team with this name already exists");
        }
      }
    }

    throw error;
  }
}

export async function getTeamByName(teamName: string) {
  return prisma.team.findFirst({
    where: {
      teamName: {
        equals: teamName,
        mode: "insensitive",
      },
    },
    include: {
      members: {
        select: {
          fullName: true,
          registrationNumber: true,
          role: true,
        },
      },
    },
  });
}

export async function getTeamByRegistrationNumber(
  registrationNumber: string,
) {
  return prisma.team.findFirst({
    where: {
      members: {
        some: {
          registrationNumber: {
            equals: registrationNumber,
            mode: "insensitive",
          },
        },
      },
    },
    include: {
      members: {
        select: {
          fullName: true,
          registrationNumber: true,
          role: true,
        },
      },
    },
  });
}
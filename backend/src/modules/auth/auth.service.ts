import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";
import { AuditAction } from "@prisma/client";

const SALT_ROUNDS = 12;

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export async function createAdmin(
  username: string,
  password: string
) {
  const existingAdmin = await prisma.admin.findUnique({
    where: { username },
  });

  if (existingAdmin) {
    throw new Error("An admin with this username already exists");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.admin.create({
    data: {
      username,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      isActive: true,
      createdAt: true,
    },
  });
}

export async function validateAdminCredentials(
  username: string,
  password: string
) {
  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin || !admin.isActive) {
    return null;
  }

  const passwordIsValid = await bcrypt.compare(
    password,
    admin.passwordHash
  );

  if (!passwordIsValid) {
    return null;
  }

  return {
    id: admin.id,
    username: admin.username,
    isActive: admin.isActive,
  };
}

export function generateAdminToken(adminId: string): string {
  const expiresIn = process.env.JWT_EXPIRES_IN || "2h";

  return jwt.sign(
    {
      sub: adminId,
      role: "ADMIN",
    },
    getJwtSecret(),
    {
      expiresIn,
    } as jwt.SignOptions
  );
}
export async function createAuditLog(
  adminId: string,
  action: AuditAction,
  details?: string
) {
  return prisma.auditLog.create({
    data: {
      adminId,
      action,
      details,
    },
  });
}
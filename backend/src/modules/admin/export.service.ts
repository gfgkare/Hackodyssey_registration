import ExcelJS from "exceljs";
import { format } from "@fast-csv/format";
import prisma from "../../config/prisma";

async function fetchExportData() {
  return prisma.team.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      members: {
        orderBy: {
          role: "asc",
        },
      },
    },
  });
}

function flattenRegistrations(
  teams: Awaited<ReturnType<typeof fetchExportData>>,
) {
  return teams.flatMap((team) =>
    team.members.map((member) => ({
      teamId: team.id,
      teamName: team.teamName,
      institution: team.institution ?? "",
      category: team.category,
      status: team.status,
      confirmedAt: team.confirmedAt?.toISOString() ?? "",
      teamCreatedAt: team.createdAt.toISOString(),
      memberName: member.fullName,
      registrationNumber: member.registrationNumber,
      collegeName: member.collegeName ?? "",
      email: member.email,
      mobile: member.mobile,
      gender: member.gender ?? "",
      academicYear: member.academicYear ?? "",
      department: member.department ?? "",
      role: member.role,
      accommodationType: member.accommodationType ?? "",
      hostelName: member.hostelName ?? "",
      roomNumber: member.roomNumber ?? "",
      wardenName: member.wardenName ?? "",
      wardenContact: member.wardenContact ?? "",
    })),
  );
}

function flattenTeams(
  teams: Awaited<ReturnType<typeof fetchExportData>>,
) {
  return teams.map((team) => {
    const leader = team.members.find((member) => member.role === "LEADER");

    return {
      teamId: team.id,
      teamName: team.teamName,
      institution: team.institution ?? "",
      category: team.category,
      status: team.status,
      memberCount: team.members.length,
      leaderName: leader?.fullName ?? "",
      leaderRegistrationNumber: leader?.registrationNumber ?? "",
      leaderEmail: leader?.email ?? "",
      leaderMobile: leader?.mobile ?? "",
      teamCreatedAt: team.createdAt.toISOString(),
      confirmedAt: team.confirmedAt?.toISOString() ?? "",
    };
  });
}

export async function generateCsvExport(): Promise<string> {
  const teams = await fetchExportData();
  const rows = flattenRegistrations(teams);

  return new Promise((resolve, reject) => {
    const csvRows: string[] = [];

    const csvStream = format({
      headers: true,
      quoteColumns: true,
    });

    csvStream.on("data", (chunk: Buffer | string) => {
      csvRows.push(chunk.toString());
    });

    csvStream.on("end", () => {
      resolve(csvRows.join(""));
    });

    csvStream.on("error", reject);

    rows.forEach((row) => csvStream.write(row));
    csvStream.end();
  });
}

export async function generateExcelExport(): Promise<Buffer> {
  const teams = await fetchExportData();
  const rows = flattenRegistrations(teams);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Participants");

  worksheet.columns = [
    { header: "Team ID", key: "teamId", width: 38 },
    { header: "Team Name", key: "teamName", width: 25 },
    { header: "Institution", key: "institution", width: 30 },
    { header: "Category", key: "category", width: 15 },
    { header: "Status", key: "status", width: 15 },
    { header: "Confirmed At", key: "confirmedAt", width: 25 },
    { header: "Team Created At", key: "teamCreatedAt", width: 25 },
    { header: "Member Name", key: "memberName", width: 25 },
    { header: "Registration Number", key: "registrationNumber", width: 22 },
    { header: "College Name", key: "collegeName", width: 30 },
    { header: "Email", key: "email", width: 35 },
    { header: "Mobile", key: "mobile", width: 15 },
    { header: "Gender", key: "gender", width: 12 },
    { header: "Academic Year", key: "academicYear", width: 18 },
    { header: "Department", key: "department", width: 25 },
    { header: "Role", key: "role", width: 12 },
    { header: "Accommodation Type", key: "accommodationType", width: 22 },
    { header: "Hostel Name", key: "hostelName", width: 20 },
    { header: "Room Number", key: "roomNumber", width: 15 },
    { header: "Warden Name", key: "wardenName", width: 20 },
    { header: "Warden Contact", key: "wardenContact", width: 18 },
  ];

  rows.forEach((row) => worksheet.addRow(row));

  worksheet.getRow(1).font = {
    bold: true,
  };

  worksheet.views = [{ state: "frozen", ySplit: 1 }];
  worksheet.autoFilter = {
    from: "A1",
    to: "U1",
  };

  const buffer = await workbook.xlsx.writeBuffer();

  return Buffer.from(buffer);
}

export async function generateTeamsExcelExport(): Promise<Buffer> {
  const teams = await fetchExportData();
  const rows = flattenTeams(teams);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Teams");

  worksheet.columns = [
    { header: "Team ID", key: "teamId", width: 38 },
    { header: "Team Name", key: "teamName", width: 25 },
    { header: "Institution", key: "institution", width: 30 },
    { header: "Category", key: "category", width: 15 },
    { header: "Status", key: "status", width: 15 },
    { header: "Member Count", key: "memberCount", width: 15 },
    { header: "Leader Name", key: "leaderName", width: 25 },
    {
      header: "Leader Registration Number",
      key: "leaderRegistrationNumber",
      width: 25,
    },
    { header: "Leader Email", key: "leaderEmail", width: 35 },
    { header: "Leader Mobile", key: "leaderMobile", width: 18 },
    { header: "Team Created At", key: "teamCreatedAt", width: 25 },
    { header: "Confirmed At", key: "confirmedAt", width: 25 },
  ];

  rows.forEach((row) => worksheet.addRow(row));

  worksheet.getRow(1).font = {
    bold: true,
  };

  worksheet.views = [{ state: "frozen", ySplit: 1 }];
  worksheet.autoFilter = {
    from: "A1",
    to: "L1",
  };

  const buffer = await workbook.xlsx.writeBuffer();

  return Buffer.from(buffer);
}

export async function generateTeamsCsvExport(): Promise<string> {
  const teams = await fetchExportData();
  const rows = flattenTeams(teams);

  return new Promise((resolve, reject) => {
    const csvRows: string[] = [];

    const csvStream = format({
      headers: true,
      quoteColumns: true,
    });

    csvStream.on("data", (chunk: Buffer | string) => {
      csvRows.push(chunk.toString());
    });

    csvStream.on("end", () => {
      resolve(csvRows.join(""));
    });

    csvStream.on("error", reject);

    rows.forEach((row) => csvStream.write(row));
    csvStream.end();
  });
}

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
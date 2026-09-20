import { z } from "zod";

const emptyStringToUndefined = (value: unknown) =>
  value === "" ? undefined : value;

const optionalText = (max: number, message: string) =>
  z.preprocess(
    emptyStringToUndefined,
    z.string().trim().max(max, message).optional()
  );

const memberSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must contain at least 2 characters")
      .max(100, "Full name is too long"),

    registrationNumber: z
      .string()
      .trim()
      .min(1, "Registration number is required")
      .max(50, "Registration number is too long"),

    department: z
      .string()
      .trim()
      .min(2, "Department is required")
      .max(100, "Department is too long"),

    gender: z.enum(["MALE", "FEMALE"], {
      error: "Gender is required",
    }),

    academicYear: z.enum(
      ["FIRST_YEAR", "SECOND_YEAR", "THIRD_YEAR", "FOURTH_YEAR"],
      {
        error: "Academic year is required",
      }
    ),

    collegeName: optionalText(150, "College name is too long"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Enter a valid email address"),

    mobile: z
      .string()
      .trim()
      .regex(/^\d{10}$/, "Mobile number must contain exactly 10 digits"),

    role: z.enum(["LEADER", "MEMBER"], {
      error: "Role is required",
    }),

    accommodationType: z.preprocess(
      emptyStringToUndefined,
      z.enum(["HOSTELLER", "DAY_SCHOLAR"]).optional()
    ),

    hostelName: optionalText(100, "Hostel name is too long"),

    roomNumber: optionalText(50, "Room number is too long"),

    wardenName: optionalText(100, "Warden name is too long"),

    wardenContact: z.preprocess(
      emptyStringToUndefined,
      z
        .string()
        .regex(
          /^\d{10}$/,
          "Warden contact must contain exactly 10 digits"
        )
        .optional()
    ),
  })
  .superRefine((member, context) => {
    if (member.accommodationType === "HOSTELLER") {
      if (!member.hostelName) {
        context.addIssue({
          code: "custom",
          path: ["hostelName"],
          message: "Hostel name is required for hostellers",
        });
      }

      if (!member.roomNumber) {
        context.addIssue({
          code: "custom",
          path: ["roomNumber"],
          message: "Room number is required for hostellers",
        });
      }

      if (!member.wardenName) {
        context.addIssue({
          code: "custom",
          path: ["wardenName"],
          message: "Warden name is required for hostellers",
        });
      }

      if (!member.wardenContact) {
        context.addIssue({
          code: "custom",
          path: ["wardenContact"],
          message: "Warden contact is required for hostellers",
        });
      }
    }

    if (member.accommodationType === "DAY_SCHOLAR") {
      const hasHostelDetails =
        Boolean(member.hostelName) ||
        Boolean(member.roomNumber) ||
        Boolean(member.wardenName) ||
        Boolean(member.wardenContact);

      if (hasHostelDetails) {
        context.addIssue({
          code: "custom",
          path: ["accommodationType"],
          message: "Hostel details are not allowed for day scholars",
        });
      }
    }
  });

export const registrationSchema = z
  .object({
    teamName: z
      .string()
      .trim()
      .min(3, "Team name must contain at least 3 characters")
      .max(100, "Team name is too long"),

    // Required only for KLU teams
    institution: optionalText(150, "Institution name is too long"),

    category: z.enum(["KLU", "OTHER"], {
      error: "Category is required",
    }),

    members: z
      .array(memberSchema)
      .refine(
        (members) => members.length === 4 || members.length === 5,
        "A team must contain exactly 4 or 5 members"
      )
      .refine(
        (members) =>
          members.filter((member) => member.role === "LEADER").length === 1,
        "A team must have exactly one leader"
      )
      .refine(
        (members) =>
          members.filter((member) => member.role === "MEMBER").length >= 3,
        "A team must have at least 3 members besides the leader"
      ),
  })
  .superRefine((data, context) => {
    const emails = data.members.map((member) =>
      member.email.toLowerCase()
    );

    const mobiles = data.members.map((member) => member.mobile);

    const registrationNumbers = data.members.map(
      (member) => member.registrationNumber
    );

    // Team-level duplicate email validation
    if (new Set(emails).size !== emails.length) {
      context.addIssue({
        code: "custom",
        path: ["members"],
        message: "Member email addresses must be unique within the team",
      });
    }

    // Team-level duplicate mobile validation
    if (new Set(mobiles).size !== mobiles.length) {
      context.addIssue({
        code: "custom",
        path: ["members"],
        message: "Member mobile numbers must be unique within the team",
      });
    }

    // Team-level duplicate registration-number validation
    if (
      new Set(registrationNumbers).size !== registrationNumbers.length
    ) {
      context.addIssue({
        code: "custom",
        path: ["members"],
        message: "Registration numbers must be unique within the team",
      });
    }

    /*
     * KLU TEAM VALIDATION
     */
    if (data.category === "KLU") {
      // KLU registration numbers must contain only digits
      const invalidRegistrationNumber = data.members.some(
        (member) => !/^\d+$/.test(member.registrationNumber)
      );

      if (invalidRegistrationNumber) {
        context.addIssue({
          code: "custom",
          path: ["members"],
          message: "KLU registration numbers must contain only digits",
        });
      }

      // Institution is mandatory for KLU teams
      if (!data.institution) {
        context.addIssue({
          code: "custom",
          path: ["institution"],
          message: "Institution is required for KLU teams",
        });
      }

      // All KLU members must use official KLU email addresses
      const invalidEmail = data.members.some(
        (member) => !member.email.toLowerCase().endsWith("@klu.ac.in")
      );

      if (invalidEmail) {
        context.addIssue({
          code: "custom",
          path: ["members"],
          message:
            "All KLU team members must use their official @klu.ac.in email address",
        });
      }

      // Accommodation is mandatory for every KLU member
      const missingAccommodation = data.members.some(
        (member) => !member.accommodationType
      );

      if (missingAccommodation) {
        context.addIssue({
          code: "custom",
          path: ["members"],
          message:
            "Accommodation type is required for all KLU team members",
        });
      }
    }

    /*
     * OTHER COLLEGE TEAM VALIDATION
     */
    if (data.category === "OTHER") {
      // Other College registration numbers must follow EUPH-26-... format
      const invalidRegistrationNumber = data.members.some(
        (member) =>
          !/^EUPH-26-[A-Za-z0-9-]+$/i.test(
            member.registrationNumber
          )
      );

      if (invalidRegistrationNumber) {
        context.addIssue({
          code: "custom",
          path: ["members"],
          message:
            "Other College registration numbers must follow the EUPH-26-... format",
        });
      }

      // Every Other College member must provide a college name
      const missingCollegeName = data.members.some(
        (member) => !member.collegeName
      );

      if (missingCollegeName) {
        context.addIssue({
          code: "custom",
          path: ["members"],
          message:
            "College name is required for every Other College team member",
        });
      }

      // Accommodation details are not allowed for Other College teams
      const hasAccommodationDetails = data.members.some(
        (member) =>
          Boolean(member.accommodationType) ||
          Boolean(member.hostelName) ||
          Boolean(member.roomNumber) ||
          Boolean(member.wardenName) ||
          Boolean(member.wardenContact)
      );

      if (hasAccommodationDetails) {
        context.addIssue({
          code: "custom",
          path: ["members"],
          message:
            "Accommodation and hostel details are only applicable to KLU teams",
        });
      }
    }
  });

export type RegistrationInput = z.infer<typeof registrationSchema>;
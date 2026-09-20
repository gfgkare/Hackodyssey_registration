import { useState } from "react";

import TeamDetailsForm from "./TeamDetailsForm";
import MemberFields from "./MemberFields";

import {
  submitRegistration,
  type RegistrationResponse,
} from "../../services/registration.service";

import type {
  RegistrationFormData,
  TeamMember,
} from "../../types/registration";

function createMember(role: "LEADER" | "MEMBER"): TeamMember {
  return {
    fullName: "",
    registrationNumber: "",
    collegeName: "",
    email: "",
    mobile: "",
    gender: "",
    academicYear: "",
    department: "",
    role,
    accommodationType: "",
    hostelName: "",
    roomNumber: "",
    wardenName: "",
    wardenContact: "",
  };
}

function createInitialMembers(size: number): TeamMember[] {
  return [
    createMember("LEADER"),
    ...Array.from({ length: size - 1 }, () =>
      createMember("MEMBER")
    ),
  ];
}

function RegistrationForm() {
  const [teamSize, setTeamSize] = useState<4 | 5>(4);

  const [formData, setFormData] = useState<RegistrationFormData>({
    teamName: "",
    institution: "Kalasalingam Academy of Research and Education",
    category: "KLU",
    members: createInitialMembers(4),
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [registrationResult, setRegistrationResult] =
    useState<NonNullable<RegistrationResponse["data"]> | null>(null);

  function handleTeamDetailsChange(
    field: "teamName" | "institution" | "category",
    value: string
  ) {
    setFormData((previous) => {
      const updatedData: RegistrationFormData = {
        ...previous,
        [field]: value,
      };

      if (field === "category") {
        updatedData.members = updatedData.members.map((member) => ({
          ...member,
          accommodationType: "",
          hostelName: "",
          roomNumber: "",
          wardenName: "",
          wardenContact: "",
        }));

        if (value === "KLU") {
          updatedData.institution =
            "Kalasalingam Academy of Research and Education";
        } else {
          updatedData.institution = "";
        }
      }

      return updatedData;
    });
  }

  function handleTeamSizeChange(size: 4 | 5) {
    setTeamSize(size);

    setFormData((previous) => {
      let updatedMembers = [...previous.members];

      if (size > updatedMembers.length) {
        while (updatedMembers.length < size) {
          updatedMembers.push(createMember("MEMBER"));
        }
      } else {
        updatedMembers = updatedMembers.slice(0, size);
      }

      updatedMembers = updatedMembers.map((member, index) => ({
        ...member,
        role: index === 0 ? "LEADER" : "MEMBER",
      }));

      return {
        ...previous,
        members: updatedMembers,
      };
    });
  }

  function handleMemberChange(
    index: number,
    field: keyof TeamMember,
    value: string
  ) {
    setFormData((previous) => {
      const updatedMembers = [...previous.members];

      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value,
      };

      if (
        field === "accommodationType" &&
        value === "DAY_SCHOLAR"
      ) {
        updatedMembers[index] = {
          ...updatedMembers[index],
          hostelName: "",
          roomNumber: "",
          wardenName: "",
          wardenContact: "",
        };
      }

      return {
        ...previous,
        members: updatedMembers,
      };
    });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setIsSuccess(false);
    setRegistrationResult(null);

    // Team name validation
    if (!formData.teamName.trim()) {
      setMessage("Please enter a team name.");
      return;
    }

    // Team size validation
    if (
      formData.members.length !== 4 &&
      formData.members.length !== 5
    ) {
      setMessage("A team must contain exactly 4 or 5 members.");
      return;
    }

    // Category validation
    if (!formData.category) {
      setMessage("Please select a college type.");
      return;
    }

    // Member validation
    for (let index = 0; index < formData.members.length; index++) {
      const member = formData.members[index];
      const memberNumber = index + 1;

      if (
        !member.fullName.trim() ||
        !member.registrationNumber.trim() ||
        !member.department.trim() ||
        !member.gender ||
        !member.academicYear ||
        !member.email.trim() ||
        !member.mobile.trim()
      ) {
        setMessage(
          `Please complete all required fields for Member ${memberNumber}.`
        );
        return;
      }

      // Other college student registration number validation
      if (formData.category === "OTHER") {
        if (!member.collegeName.trim()) {
          setMessage(
            `Please enter the college name for Member ${memberNumber}.`
          );
          return;
        }

        if (
          !/^EUPH-26-[A-Za-z0-9]+$/i.test(
            member.registrationNumber.trim()
          )
        ) {
          setMessage(
            `Member ${memberNumber} registration number must follow the format EUPH-26-XXXXXX.`
          );
          return;
        }
      }

      // Mobile number validation
      if (!/^\d{10}$/.test(member.mobile.trim())) {
        setMessage(
          `Member ${memberNumber} must have a valid 10-digit phone number.`
        );
        return;
      }

      // KLU-specific validation
      if (formData.category === "KLU") {
        if (!/^\d+$/.test(member.registrationNumber.trim())) {
          setMessage(
            `Member ${memberNumber} must have a valid numeric registration number.`
          );
          return;
        }

        if (
          !member.email
            .trim()
            .toLowerCase()
            .endsWith("@klu.ac.in")
        ) {
          setMessage(
            `Member ${memberNumber} must use a valid @klu.ac.in email address.`
          );
          return;
        }

        if (!member.accommodationType) {
          setMessage(
            `Please select accommodation type for Member ${memberNumber}.`
          );
          return;
        }

        if (member.accommodationType === "HOSTELLER") {
          if (
            !member.hostelName.trim() ||
            !member.roomNumber.trim() ||
            !member.wardenName.trim() ||
            !/^\d{10}$/.test(member.wardenContact.trim())
          ) {
            setMessage(
              `Please complete valid hostel details for Member ${memberNumber}.`
            );
            return;
          }
        }
      }

      // Other college accommodation validation
      if (formData.category === "OTHER") {
        if (
          member.accommodationType ||
          member.hostelName.trim() ||
          member.roomNumber.trim() ||
          member.wardenName.trim() ||
          member.wardenContact.trim()
        ) {
          setMessage(
            `Accommodation details must be empty for Member ${memberNumber} of an Other College.`
          );
          return;
        }
      }
    }

    // Duplicate email validation
    const emails = formData.members.map((member) =>
      member.email.trim().toLowerCase()
    );

    if (new Set(emails).size !== emails.length) {
      setMessage("Each member must have a unique email address.");
      return;
    }

    // Duplicate mobile validation
    const mobiles = formData.members.map((member) =>
      member.mobile.trim()
    );

    if (new Set(mobiles).size !== mobiles.length) {
      setMessage("Each member must have a unique mobile number.");
      return;
    }

    // Duplicate registration-number validation
    const registrationNumbers = formData.members.map((member) =>
      member.registrationNumber.trim().toLowerCase()
    );

    if (
      new Set(registrationNumbers).size !==
      registrationNumbers.length
    ) {
      setMessage(
        "Each member must have a unique registration number."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await submitRegistration(formData);

      if (response.success && response.data) {
        setIsSuccess(true);
        setMessage(response.message);
        setRegistrationResult(response.data);
      } else {
        setIsSuccess(false);
        setMessage(
          response.message || "Registration could not be completed."
        );
      }
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        setMessage(
          axiosError.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } else {
        setMessage("Unable to connect to the backend.");
      }

      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Registration success screen
  if (isSuccess && registrationResult) {
    return (
      <section className="rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-6 text-6xl">✅</div>

        <h2 className="mb-3 text-3xl font-bold text-green-700">
          Registration Successful!
        </h2>

        <p className="mb-6 text-gray-600">
          {message || "Your team has been registered successfully."}
        </p>

        <div className="mb-6 rounded-xl bg-green-50 p-6 text-left">
          <h3 className="mb-4 text-xl font-bold text-gray-800">
            Registration Details
          </h3>

          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">Team ID:</span>{" "}
              {registrationResult.id}
            </p>

            <p>
              <span className="font-semibold">Team Name:</span>{" "}
              {registrationResult.teamName}
            </p>

            <p>
              <span className="font-semibold">Institution:</span>{" "}
              {registrationResult.institution}
            </p>

            <p>
              <span className="font-semibold">Category:</span>{" "}
              {registrationResult.category}
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              {registrationResult.status}
            </p>

            <p>
              <span className="font-semibold">Team Members:</span>{" "}
              {registrationResult.members.length}
            </p>
          </div>
        </div>

        {/* WhatsApp Group Button */}
        <a
          href="https://chat.whatsapp.com/D2EVvQ3OThT5nx1wFsznx5"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl bg-green-600 px-6 py-3 text-center text-lg font-semibold text-white transition hover:bg-green-700"
        >
          Join WhatsApp Group
        </a>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Team Details */}
      <TeamDetailsForm
        teamName={formData.teamName}
        category={formData.category}
        onChange={handleTeamDetailsChange}
      />

      {/* Team Size */}
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <label className="mb-2 block text-lg font-semibold text-slate-800">
          Team Size
        </label>

        <select
          value={teamSize}
          onChange={(event) =>
            handleTeamSizeChange(
              Number(event.target.value) as 4 | 5
            )
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value={4}>4 Members</option>
          <option value={5}>5 Members</option>
        </select>
      </section>

      {/* Team Members */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Team Members
          </h2>

          <p className="mt-1 text-slate-600">
            Enter the details of all {teamSize} team members.
          </p>
        </div>

        {formData.members.map((member, index) => (
          <MemberFields
            key={index}
            member={member}
            index={index}
            category={formData.category}
            onChange={handleMemberChange}
          />
        ))}
      </section>

      {/* Error Message */}
      {message && (
        <div className="rounded-lg bg-red-100 px-4 py-3 font-medium text-red-700">
          {message}
        </div>
      )}

      {/* Critical Notice */}
      <div className="rounded-lg border border-red-500 bg-red-950/90 p-5 text-red-100 shadow-md">
        <div className="flex items-start gap-4">
          <div className="mt-1 text-2xl text-red-400">ⓘ</div>

          <div>
            <h3 className="mb-2 font-mono text-lg font-bold uppercase tracking-wider text-red-400">
              Critical Notice:
            </h3>

            <p className="font-mono text-sm leading-relaxed text-red-100">
              Ensure all details are accurate before submission. Once
              registered, details cannot be modified and will be used for
              CERTIFICATES &amp; CREDITS.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}

export default RegistrationForm;
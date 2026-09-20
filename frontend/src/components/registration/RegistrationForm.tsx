import { useState } from "react";

import TeamDetailsForm from "./TeamDetailsForm";
import MemberFields from "./MemberFields";

import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

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
    ...Array.from({ length: size - 1 }, () => createMember("MEMBER")),
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

    if (!formData.teamName.trim()) {
      setMessage("Please enter a team name.");
      return;
    }

    if (
      formData.members.length !== 4 &&
      formData.members.length !== 5
    ) {
      setMessage("A team must contain exactly 4 or 5 members.");
      return;
    }

    if (!formData.category) {
      setMessage("Please select a college type.");
      return;
    }

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

      if (formData.category === "OTHER") {
        if (!member.collegeName?.trim()) {
          setMessage(
            `Please enter the college name for Member ${memberNumber}.`
          );
          return;
        }

        if (
          !/^EUPH-26-[A-Za-z0-9-]+$/i.test(
            member.registrationNumber.trim()
          )
        ) {
          setMessage(
            `Member ${memberNumber} registration number must follow the format EUPH-26-XXXXXX.`
          );
          return;
        }
      }

      if (!/^\d{10}$/.test(member.mobile.trim())) {
        setMessage(
          `Member ${memberNumber} must have a valid 10-digit phone number.`
        );
        return;
      }

      if (formData.category === "KLU") {
        if (!/^\d+$/.test(member.registrationNumber.trim())) {
          setMessage(
            `Member ${memberNumber} must have a valid numeric registration number.`
          );
          return;
        }

        if (
          !member.email.trim().toLowerCase().endsWith("@klu.ac.in")
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
            !member.hostelName?.trim() ||
            !member.roomNumber?.trim() ||
            !member.wardenName?.trim() ||
            !/^\d{10}$/.test(member.wardenContact?.trim() || "")
          ) {
            setMessage(
              `Please complete valid hostel details for Member ${memberNumber}.`
            );
            return;
          }
        }
      }

      if (formData.category === "OTHER") {
        if (
          member.accommodationType ||
          member.hostelName?.trim() ||
          member.roomNumber?.trim() ||
          member.wardenName?.trim() ||
          member.wardenContact?.trim()
        ) {
          setMessage(
            `Accommodation details must be empty for Member ${memberNumber} of an Other College.`
          );
          return;
        }
      }
    }

    const emails = formData.members.map((member) =>
      member.email.trim().toLowerCase()
    );

    if (new Set(emails).size !== emails.length) {
      setMessage("Each member must have a unique email address.");
      return;
    }

    const mobiles = formData.members.map((member) =>
      member.mobile.trim()
    );

    if (new Set(mobiles).size !== mobiles.length) {
      setMessage("Each member must have a unique mobile number.");
      return;
    }

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

  if (isSuccess && registrationResult) {
    return (
      <GlassCard className="mx-auto max-w-3xl p-6 text-center sm:p-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-4xl">
          ✅
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Submission Complete
        </p>

        <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Registration Successful!
        </h2>

        <p className="mt-4 text-slate-400">
          {message || "Your team has been registered successfully."}
        </p>

        <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-left sm:p-6">
          <h3 className="mb-5 text-xl font-bold text-white">
            Registration Details
          </h3>

          <div className="space-y-4 text-sm">
            <p className="break-all text-slate-300">
              <span className="font-semibold text-emerald-300">
                Team ID:
              </span>{" "}
              {registrationResult.id}
            </p>

            <p className="text-slate-300">
              <span className="font-semibold text-emerald-300">
                Team Name:
              </span>{" "}
              {registrationResult.teamName}
            </p>

            <p className="text-slate-300">
              <span className="font-semibold text-emerald-300">
                Institution:
              </span>{" "}
              {registrationResult.institution}
            </p>

            <p className="text-slate-300">
              <span className="font-semibold text-emerald-300">
                Category:
              </span>{" "}
              {registrationResult.category}
            </p>

            <p className="text-slate-300">
              <span className="font-semibold text-emerald-300">
                Status:
              </span>{" "}
              {registrationResult.status}
            </p>

            <p className="text-slate-300">
              <span className="font-semibold text-emerald-300">
                Team Members:
              </span>{" "}
              {registrationResult.members.length}
            </p>
          </div>
        </div>

        <a
          href="https://chat.whatsapp.com/D2EVvQ3OThT5nx1wFsznx5"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full rounded-xl bg-emerald-500 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-400"
        >
          Join WhatsApp Group
        </a>

        <p className="mt-5 text-xs leading-6 text-slate-500">
          Please save your Team ID for future communication.
        </p>
      </GlassCard>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <TeamDetailsForm
        teamName={formData.teamName}
        category={formData.category}
        teamSize={teamSize}
        onChange={handleTeamDetailsChange}
        onTeamSizeChange={handleTeamSizeChange}
      />

      <section className="space-y-5">
        <div className="mb-6">
          <SectionHeading
            eyebrow="Step 02"
            title="Team Members"
            description={`Enter the details of all ${teamSize} team members. The first member is the team leader.`}
          />
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

      {message && (
        <div
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200"
        >
          {message}
        </div>
      )}

      <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5">
        <div className="flex items-start gap-3">
          <span className="text-xl text-red-300">ⓘ</span>

          <div>
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-red-300">
              Critical Notice
            </h3>

            <p className="mt-2 text-sm leading-6 text-red-100">
              Ensure all details are accurate before submission. Once
              registered, details cannot be modified and will be used
              for <strong>CERTIFICATES &amp; CREDITS.</strong>
            </p>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full py-4 text-base"
      >
        Submit Registration
      </Button>
    </form>
  );
}

export default RegistrationForm;
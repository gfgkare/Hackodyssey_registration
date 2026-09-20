import type { RegistrationCategory } from "../../types/registration";
import GlassCard from "../ui/GlassCard";
import SectionHeading from "../ui/SectionHeading";

interface TeamDetailsFormProps {
  teamName: string;
  category: RegistrationCategory;
  teamSize: 4 | 5;
  onChange: (
    field: "teamName" | "institution" | "category",
    value: string
  ) => void;
  onTeamSizeChange: (size: 4 | 5) => void;
}

export default function TeamDetailsForm({
  teamName,
  category,
  teamSize,
  onChange,
  onTeamSizeChange,
}: TeamDetailsFormProps) {
  return (
    <GlassCard className="p-5 sm:p-6">
      <SectionHeading
        eyebrow="Step 01"
        title="Team Details"
        description="Enter your team information to begin the registration process."
      />

      <div className="mt-6 space-y-5">
        {/* Team Name */}
        <div>
          <label
            htmlFor="teamName"
            className="mb-2 block text-sm font-semibold text-slate-200"
          >
            Team Name
          </label>

          <input
            id="teamName"
            type="text"
            value={teamName}
            onChange={(event) =>
              onChange("teamName", event.target.value)
            }
            placeholder="Enter your team name"
            className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* College Type and Team Size */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* College Type */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              College Type
            </label>

            <select
              id="category"
              value={category}
              onChange={(event) =>
                onChange("category", event.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="KLU">KLU</option>
              <option value="OTHER">Other College</option>
            </select>
          </div>

          {/* Team Size */}
          <div>
            <label
              htmlFor="teamSize"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Team Size
            </label>

            <select
              id="teamSize"
              value={teamSize}
              onChange={(event) =>
                onTeamSizeChange(
                  Number(event.target.value) as 4 | 5
                )
              }
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value={4}>4 Members</option>
              <option value={5}>5 Members</option>
            </select>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
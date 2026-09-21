import type { RegistrationCategory } from "../../types/registration";

interface TeamDetailsFormProps {
  teamName: string;
  category: RegistrationCategory;
  onChange: (
    field: "teamName" | "institution" | "category",
    value: string
  ) => void;
}

export default function TeamDetailsForm({
  teamName,
  category,
  onChange,
}: TeamDetailsFormProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Team Details
      </h2>

      <div className="space-y-5">
        {/* Team Name */}
        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Team Name
          </label>

          <input
            type="text"
            value={teamName}
            onChange={(event) =>
              onChange("teamName", event.target.value)
            }
            placeholder="Enter your team name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* College Type */}
        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            College Type
          </label>

          <select
            value={category}
            onChange={(event) =>
              onChange("category", event.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="KLU">KLU</option>
            <option value="OTHER">Other College</option>
          </select>
        </div>
      </div>
    </section>
  );
}
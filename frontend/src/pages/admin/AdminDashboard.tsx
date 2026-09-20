import { useEffect, useMemo, useState } from "react";
import {
  Download,
  FileSpreadsheet,
  LogOut,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getAdminRegistrations,
  logoutAdmin,
  downloadAdminExport,
} from "../../services/admin.service";

interface Member {
  id?: string;
  fullName: string;
  registrationNumber: string;
  collegeName?: string | null;
  email: string;
  mobile: string;
  gender?: string | null;
  academicYear?: string | null;
  department: string;
  role: string;
  accommodationType?: string | null;
  hostelName?: string | null;
  roomNumber?: string | null;
  wardenName?: string | null;
  wardenContact?: string | null;
}

interface Registration {
  id: string;
  teamName: string;
  institution?: string | null;
  category: string;
  status: string;
  createdAt?: string;
  members: Member[];
}

type ActiveTab = "TEAMS" | "PARTICIPANTS";


function formatAcademicYear(year?: string | null): string {
  if (!year) return "-";

  const yearMap: Record<string, string> = {
    FIRST_YEAR: "1",
    SECOND_YEAR: "2",
    THIRD_YEAR: "3",
    FOURTH_YEAR: "4",
  };

  return yearMap[year] || year;
}

function formatGender(gender?: string | null): string {
  if (!gender) return "-";

  return gender.charAt(0) + gender.slice(1).toLowerCase();
}

function formatAccommodation(type?: string | null): string {
  if (type === "HOSTELLER") return "HOSTLER";
  if (type === "DAY_SCHOLAR") return "DAYSCHOLAR";
  return "-";
}

function AdminDashboard() {
  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("TEAMS");
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [accommodationFilter, setAccommodationFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminRegistrations();
      const data = response.data;

      if (Array.isArray(data)) {
        setRegistrations(data);
      } else if (
        data &&
        typeof data === "object" &&
        "registrations" in data
      ) {
        setRegistrations(
          (data as { registrations: Registration[] }).registrations,
        );
      } else {
        setRegistrations([]);
      }
    } catch (requestError: any) {
      if (requestError?.response?.status === 401) {
        navigate("/gfghackadmin");
        return;
      }

      setError(
        requestError?.response?.data?.message ||
          "Unable to load registrations.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } finally {
      navigate("/gfghackadmin");
    }
  };

  const filteredRegistrations = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return registrations.filter((registration) => {
        return (
        !search ||
        registration.teamName.toLowerCase().includes(search) ||
        registration.id.toLowerCase().includes(search) ||
        registration.members.some(
          (member) =>
            member.fullName.toLowerCase().includes(search) ||
            member.registrationNumber.toLowerCase().includes(search),
        )
        );
    });
    }, [registrations, searchTerm]);

    const participants = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const allParticipants = registrations.flatMap((registration) =>
      registration.members.map((member) => ({
        ...member,
        teamName: registration.teamName,
        teamId: registration.id,
        category: registration.category,
      })),
    );

    return allParticipants.filter((participant) => {
      const participantGender = String(participant.gender || "").toUpperCase();
      const participantAccommodation = String(
        participant.accommodationType || "",
      ).toUpperCase();

      const matchesSearch =
        !search ||
        participant.teamName.toLowerCase().includes(search) ||
        participant.teamId.toLowerCase().includes(search) ||
        participant.fullName.toLowerCase().includes(search) ||
        participant.registrationNumber.toLowerCase().includes(search) ||
        participant.email.toLowerCase().includes(search) ||
        (participant.collegeName || "").toLowerCase().includes(search);

      const matchesGender =
        genderFilter === "ALL" || participantGender === genderFilter;

      const matchesAccommodation =
        accommodationFilter === "ALL" ||
        participantAccommodation === accommodationFilter;

      return matchesSearch && matchesGender && matchesAccommodation;
    });
  }, [registrations, searchTerm, genderFilter, accommodationFilter]);

    const downloadExport = async (
        fileName:
            | "registrations.csv"
            | "registrations.xlsx"
            | "teams.csv"
            | "teams.xlsx",
    ) => {
        try {
            setError("");

            const blob = await downloadAdminExport(fileName);

            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = fileName;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(downloadUrl);
        } catch (requestError: any) {
            if (requestError?.response?.status === 401) {
            navigate("/gfghackadmin");
            return;
            }

            setError(
            requestError?.response?.data?.message ||
                "Unable to export registrations.",
            );
        }
    };
  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-10">
      <header className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-3 bg-yellow-500" />

            <div>
              <h1 className="font-mono text-3xl font-black tracking-wider">
                MISSION CONTROL
              </h1>

              <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-yellow-500">
                ADMIN DASHBOARD • {registrations.length} TEAMS REGISTERED
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl border border-zinc-800 bg-black p-1">
              <button
                onClick={() => setActiveTab("TEAMS")}
                className={`rounded-lg px-5 py-3 text-sm font-bold transition ${
                  activeTab === "TEAMS"
                    ? "bg-yellow-500 text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                TEAMS
              </button>

              <button
                onClick={() => setActiveTab("PARTICIPANTS")}
                className={`rounded-lg px-5 py-3 text-sm font-bold transition ${
                  activeTab === "PARTICIPANTS"
                    ? "bg-yellow-500 text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                PARTICIPANTS
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-bold text-zinc-200 hover:bg-zinc-800"
            >
              <LogOut className="h-4 w-4" />
              LOGOUT
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={
                activeTab === "TEAMS"
                  ? "Search teams or registration ID..."
                  : "Search name or registration number..."
              }
              className="w-full rounded-xl border border-zinc-800 bg-black py-3 pl-12 pr-4 text-white outline-none placeholder:text-zinc-500 focus:border-yellow-500"
            />
          </div>

          {activeTab === "PARTICIPANTS" && (
            <>
              <select
                value={genderFilter}
                onChange={(event) => setGenderFilter(event.target.value)}
                className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-zinc-300 outline-none focus:border-yellow-500"
              >
                <option value="ALL">All Genders</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>

              <select
                value={accommodationFilter}
                onChange={(event) =>
                  setAccommodationFilter(event.target.value)
                }
                className="rounded-xl border border-zinc-800 bg-black px-4 py-3 text-zinc-300 outline-none focus:border-yellow-500"
              >
                <option value="ALL">All Accommodation</option>
                <option value="HOSTELLER">Hosteller</option>
                <option value="DAY_SCHOLAR">Dayscholar</option>
              </select>
            </>
          )}

          <button
            onClick={loadRegistrations}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-zinc-300 hover:bg-zinc-800"
            title="Refresh"
          >
            <RefreshCw className="h-5 w-5" />
          </button>

          <button
            onClick={() =>
                downloadExport(
                    activeTab === "TEAMS" ? "teams.xlsx" : "registrations.xlsx"
                )
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white hover:bg-emerald-500"
          >
            <FileSpreadsheet className="h-5 w-5" />
            EXPORT XLSX
          </button>

          <button
            onClick={() =>
                downloadExport(
                    activeTab === "TEAMS" ? "teams.csv" : "registrations.csv"
                )
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 font-bold text-white hover:bg-sky-500"
          >
            <Download className="h-5 w-5" />
            EXPORT CSV
          </button>
        </div>
      </header>

      {error && (
        <div className="mb-6 rounded-xl border border-red-800 bg-red-950 p-4 text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center text-zinc-400">
          Loading registrations...
        </div>
      ) : activeTab === "TEAMS" ? (
        <section className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 px-6 py-5">
            <h2 className="font-mono text-xl font-bold tracking-wide">
              TEAM REGISTRATIONS
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Showing {filteredRegistrations.length} teams
            </p>
          </div>

          <table className="min-w-[1000px] w-full text-left">
            <thead className="border-b border-zinc-800 bg-black text-xs uppercase text-zinc-400">
              <tr>
                <th className="px-6 py-5">#</th>
                <th className="px-6 py-5">Team Name</th>
                <th className="px-6 py-5">Contact Intel</th>
                <th className="px-6 py-5">Unit Size</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredRegistrations.map((registration, index) => {
                const leader =
                  registration.members.find(
                    (member) => member.role === "LEADER",
                  ) || registration.members[0];

                return (
                  <tr
                    key={registration.id}
                    className="border-b border-zinc-900 hover:bg-zinc-900"
                  >
                    <td className="px-6 py-6 text-zinc-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-6">
                      <p className="font-mono text-lg font-bold">
                        {registration.teamName}
                      </p>
                      <p className="mt-2 text-xs text-yellow-500">
                        ID: {registration.id}
                      </p>
                    </td>

                    <td className="px-6 py-6">
                      <p className="font-semibold text-zinc-200">
                        {leader?.fullName || "-"}
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">
                        {leader?.email || "-"}
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">
                        {leader?.mobile || "-"}
                      </p>
                    </td>

                    <td className="px-6 py-6">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 font-bold">
                        {registration.members.length}
                      </span>
                    </td>

                    <td className="px-6 py-6 text-zinc-300">
                      {registration.category}
                    </td>

                    <td className="px-6 py-6">
                      <span className="rounded-full bg-emerald-950 px-3 py-2 text-xs font-bold text-emerald-400">
                        CONFIRMED
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="border-b border-zinc-800 px-6 py-5">
            <h2 className="font-mono text-xl font-bold tracking-wide">
              PARTICIPANT DATABASE
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Showing {participants.length} participants
            </p>
          </div>

          <table className="min-w-[1700px] w-full text-left">
            <thead className="border-b border-zinc-800 bg-black text-xs uppercase text-zinc-400">
              <tr>
                <th className="px-5 py-5">#</th>
                <th className="px-5 py-5">Team Name</th>
                <th className="px-5 py-5">Name</th>
                <th className="px-5 py-5">Reg No</th>
                <th className="px-5 py-5">Gender</th>
                <th className="px-5 py-5">Year / Branch</th>
                <th className="px-5 py-5">Phone</th>
                <th className="px-5 py-5">Email</th>
                <th className="px-5 py-5">College</th>
                <th className="px-5 py-5">Accommodation</th>
                <th className="px-5 py-5">Hostel Details</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((participant, index) => {
                const isHosteller =
                  participant.accommodationType === "HOSTELLER";

                return (
                  <tr
                    key={`${participant.teamName}-${participant.registrationNumber}-${index}`}
                    className="border-b border-zinc-900 hover:bg-zinc-900"
                  >
                    <td className="px-5 py-6 text-zinc-500">
                      {index + 1}
                    </td>

                    <td className="px-5 py-6 font-semibold text-zinc-200">
                      {participant.teamName}
                    </td>

                    <td className="px-5 py-6 font-semibold text-zinc-100">
                      {participant.fullName}
                    </td>

                    <td className="px-5 py-6 text-zinc-400">
                      {participant.registrationNumber}
                    </td>

                    <td className="px-5 py-6 text-zinc-300">
                      {formatGender(participant.gender)}
                    </td>

                    <td className="px-5 py-6 whitespace-nowrap text-zinc-300">
                      {formatAcademicYear(participant.academicYear)} /{" "}
                      {participant.department || "-"}
                    </td>

                    <td className="px-5 py-6 text-zinc-400">
                      {participant.mobile}
                    </td>

                    <td className="px-5 py-6 text-zinc-400">
                      {participant.email}
                    </td>

                    <td className="px-5 py-6 text-zinc-400">
                      {participant.collegeName || "-"}
                    </td>

                    <td className="px-5 py-6">
                      <span
                        className={`rounded-md px-3 py-2 text-xs font-bold ${
                          participant.accommodationType === "HOSTELLER"
                            ? "bg-indigo-950 text-indigo-300"
                            : "bg-zinc-800 text-zinc-300"
                        }`}
                      >
                        {formatAccommodation(
                          participant.accommodationType,
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-6 text-sm text-zinc-400">
                      {isHosteller ? (
                        <div className="space-y-1 whitespace-nowrap">
                          <p>
                            <span className="text-zinc-600">
                              HOSTEL:
                            </span>{" "}
                            {participant.hostelName || "-"}
                          </p>
                          <p>
                            <span className="text-zinc-600">
                              ROOM:
                            </span>{" "}
                            {participant.roomNumber || "-"}
                          </p>
                          <p>
                            <span className="text-zinc-600">
                              WARDEN:
                            </span>{" "}
                            {participant.wardenName || "-"}
                          </p>
                          <p className="text-xs">
                            {participant.wardenContact || "-"}
                          </p>
                        </div>
                      ) : (
                        <span className="text-zinc-600">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}

      {!loading &&
        ((activeTab === "TEAMS" && filteredRegistrations.length === 0) ||
            (activeTab === "PARTICIPANTS" && participants.length === 0)) && (
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center text-zinc-500">
            No matching records found.
          </div>
        )}

      <footer className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-600">
        <ShieldCheck className="h-4 w-4" />
        <span>SECURED ADMIN ENVIRONMENT</span>
        <Users className="ml-3 h-4 w-4" />
        <span>{participants.length} PARTICIPANTS</span>
      </footer>
    </main>
  );
}

export default AdminDashboard;
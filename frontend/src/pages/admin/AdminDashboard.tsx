import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Download,
  FileSpreadsheet,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
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

  const fetchRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminRegistrations();
      const data = response.data;

      if (Array.isArray(data)) {
        setRegistrations(data);
      } else if (data && typeof data === "object" && "registrations" in data) {
        setRegistrations(
          (data as { registrations: Registration[] }).registrations,
        );
      } else {
        setRegistrations([]);
      }
    } catch (requestError: unknown) {
      if (axios.isAxiosError(requestError)) {
        if (requestError.response?.status === 401) {
          navigate("/gfghackadmin");
          return;
        }

        setError(
          (requestError.response?.data as { message?: string })?.message ||
            "Unable to load registrations.",
        );
      } else {
        setError("Unable to load registrations.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      try {
        setError("");
        const response = await getAdminRegistrations();
        if (!isMounted) return;

        const data = response.data;
        if (Array.isArray(data)) {
          setRegistrations(data);
        } else if (data && typeof data === "object" && "registrations" in data) {
          setRegistrations(
            (data as { registrations: Registration[] }).registrations,
          );
        } else {
          setRegistrations([]);
        }
      } catch (requestError: unknown) {
        if (!isMounted) return;

        if (axios.isAxiosError(requestError)) {
          if (requestError.response?.status === 401) {
            navigate("/gfghackadmin");
            return;
          }

          setError(
            (requestError.response?.data as { message?: string })?.message ||
              "Unable to load registrations.",
          );
        } else {
          setError("Unable to load registrations.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void initializeData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

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
    } catch (requestError: unknown) {
      if (axios.isAxiosError(requestError)) {
        if (requestError.response?.status === 401) {
          navigate("/gfghackadmin");
          return;
        }

        setError(
          (requestError.response?.data as { message?: string })?.message ||
            "Unable to export registrations.",
        );
      } else {
        setError("Unable to export registrations.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-black px-3 py-5 text-white md:px-8 md:py-7">
      {/* Top Header Control Center */}
      <header className="mb-6 rounded-2xl border border-zinc-800/80 bg-[#0c0c0e] p-4 shadow-[0_0_40px_rgba(0,0,0,0.8)] md:p-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Logo & Counter */}
          <div className="flex items-center gap-3.5">
            <div className="h-9 w-2.5 rounded-sm bg-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.6)]" />

            <div>
              <h1 className="font-mono text-2xl font-black tracking-wider text-white md:text-3xl">
                MISSION CONTROL
              </h1>

              <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-yellow-500/90 md:text-xs">
                ADMIN DASHBOARD • {registrations.length} TEAMS REGISTERED
              </p>
            </div>
          </div>

          {/* Controls: Tabs, Filters, Search, Exports, Logout */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Switcher Tabs */}
            <div className="flex rounded-xl border border-zinc-800 bg-black/70 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("TEAMS")}
                className={`rounded-lg px-4 py-2 text-xs font-black tracking-wider transition-all duration-200 md:text-sm ${
                  activeTab === "TEAMS"
                    ? "bg-yellow-500 text-black shadow-[0_0_14px_rgba(234,179,8,0.45)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                TEAMS
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("PARTICIPANTS")}
                className={`rounded-lg px-4 py-2 text-xs font-black tracking-wider transition-all duration-200 md:text-sm ${
                  activeTab === "PARTICIPANTS"
                    ? "bg-yellow-500 text-black shadow-[0_0_14px_rgba(234,179,8,0.45)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                PARTICIPANTS
              </button>
            </div>

            {/* Filter Dropdowns for Participants */}
            {activeTab === "PARTICIPANTS" && (
              <>
                <select
                  value={genderFilter}
                  onChange={(event) => setGenderFilter(event.target.value)}
                  aria-label="Filter by gender"
                  className="rounded-xl border border-zinc-800 bg-black/90 px-3 py-2 text-xs font-medium text-zinc-300 outline-none transition focus:border-yellow-500 md:text-sm"
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
                  aria-label="Filter by accommodation"
                  className="rounded-xl border border-zinc-800 bg-black/90 px-3 py-2 text-xs font-medium text-zinc-300 outline-none transition focus:border-yellow-500 md:text-sm"
                >
                  <option value="ALL">All Accommodation</option>
                  <option value="HOSTELLER">Hostler</option>
                  <option value="DAY_SCHOLAR">Dayscholar</option>
                </select>
              </>
            )}

            {/* Search Input */}
            <div className="relative min-w-[200px] flex-1 md:min-w-[240px] xl:w-64">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={
                  activeTab === "TEAMS"
                    ? "Search Teams / ID..."
                    : "Search Name / RegNo..."
                }
                className="w-full rounded-xl border border-zinc-800 bg-black/90 py-2 pl-9 pr-3 text-xs text-white outline-none placeholder:text-zinc-500 transition focus:border-yellow-500 md:text-sm"
              />
            </div>

            {/* Refresh Button */}
            <button
              type="button"
              onClick={fetchRegistrations}
              className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-2.5 text-zinc-400 transition hover:border-zinc-700 hover:text-white active:scale-95"
              title="Refresh registrations"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin text-yellow-500" : ""}`}
              />
            </button>

            {/* Export XLS */}
            <button
              type="button"
              onClick={() =>
                downloadExport(
                  activeTab === "TEAMS" ? "teams.xlsx" : "registrations.xlsx",
                )
              }
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-[0_0_12px_rgba(5,150,105,0.3)] transition hover:bg-emerald-500 active:scale-95 md:text-sm"
            >
              <FileSpreadsheet className="h-4 w-4" />
              EXPORT XLS
            </button>

            {/* Export CSV */}
            <button
              type="button"
              onClick={() =>
                downloadExport(
                  activeTab === "TEAMS" ? "teams.csv" : "registrations.csv",
                )
              }
              className="flex items-center gap-1.5 rounded-xl bg-sky-600 px-3.5 py-2 text-xs font-bold text-white shadow-[0_0_12px_rgba(2,132,199,0.3)] transition hover:bg-sky-500 active:scale-95 md:text-sm"
            >
              <Download className="h-4 w-4" />
              EXPORT CSV
            </button>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs font-bold text-zinc-400 transition hover:border-red-900/60 hover:bg-red-950/30 hover:text-red-300 md:text-sm"
              title="Logout from admin session"
            >
              <LogOut className="h-4 w-4" />
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-900/60 bg-red-950/50 p-4 text-sm font-medium text-red-300">
          {error}
        </div>
      )}

      {/* Content Section */}
      {loading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-zinc-800/80 bg-[#0c0c0e] p-12 text-zinc-400">
          <RefreshCw className="mb-3 h-8 w-8 animate-spin text-yellow-500" />
          <p className="font-mono text-sm tracking-wider">
            SYNCHRONIZING WITH MISSION CONTROL...
          </p>
        </div>
      ) : activeTab === "TEAMS" ? (
        /* TEAMS TABLE */
        <section className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0c0c0e] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left text-xs md:text-sm">
              <thead className="border-b border-zinc-800 bg-black text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="w-12 px-5 py-4 text-center">#</th>
                  <th className="px-5 py-4">TEAM NAME</th>
                  <th className="px-5 py-4">CONTACT INTEL</th>
                  <th className="px-5 py-4 text-center">UNIT SIZE</th>
                  <th className="px-5 py-4">CATEGORY</th>
                  <th className="px-5 py-4">STATUS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-900/80 font-sans">
                {filteredRegistrations.map((registration, index) => {
                  const leader =
                    registration.members.find(
                      (member) => member.role === "LEADER",
                    ) || registration.members[0];

                  return (
                    <tr
                      key={registration.id}
                      className="transition-colors hover:bg-zinc-900/40"
                    >
                      {/* Index */}
                      <td className="px-5 py-5 text-center font-mono text-zinc-500">
                        {index + 1}
                      </td>

                      {/* Team Name & ID */}
                      <td className="px-5 py-5">
                        <p className="font-mono text-base font-bold tracking-wide text-white">
                          {registration.teamName}
                        </p>
                        <p className="mt-1 font-mono text-[11px] font-medium text-yellow-500/90">
                          ID: {registration.id}
                        </p>
                      </td>

                      {/* Contact Intel */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2 font-medium text-zinc-100">
                          <User className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                          <span>{leader?.fullName || "-"}</span>
                          {leader?.registrationNumber && (
                            <span className="font-mono text-xs text-zinc-400">
                              ({leader.registrationNumber})
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                          <a
                            href={`mailto:${leader?.email}`}
                            className="transition hover:text-yellow-400 hover:underline"
                          >
                            {leader?.email || "-"}
                          </a>
                        </div>

                        <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400">
                          <Phone className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                          <a
                            href={`tel:${leader?.mobile}`}
                            className="font-mono transition hover:text-yellow-400 hover:underline"
                          >
                            {leader?.mobile || "-"}
                          </a>
                        </div>
                      </td>

                      {/* Unit Size */}
                      <td className="px-5 py-5 text-center">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/60 bg-zinc-800/90 font-mono text-xs font-bold text-zinc-100">
                          {registration.members.length}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-5">
                        <span className="inline-block rounded border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-xs font-semibold text-zinc-300">
                          {registration.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-800/60 bg-emerald-950/80 px-3 py-1 font-mono text-[11px] font-bold tracking-wider text-emerald-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          CONFIRMED
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        /* PARTICIPANTS TABLE */
        <section className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0c0c0e] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1500px] border-collapse text-left text-xs md:text-sm">
              <thead className="border-b border-zinc-800 bg-black text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="w-12 px-4 py-4 text-center">#</th>
                  <th className="px-4 py-4">TEAM NAME</th>
                  <th className="px-4 py-4">NAME</th>
                  <th className="px-4 py-4">REG NO</th>
                  <th className="px-4 py-4">GENDER</th>
                  <th className="px-4 py-4">YEAR/BRANCH</th>
                  <th className="px-4 py-4">PHONE</th>
                  <th className="px-4 py-4">EMAIL</th>
                  <th className="px-4 py-4">COLLEGE</th>
                  <th className="px-4 py-4">ACCOMMODATION</th>
                  <th className="px-4 py-4">HOSTEL DETAILS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-900/80 font-sans">
                {participants.map((participant, index) => {
                  const isHosteller =
                    participant.accommodationType === "HOSTELLER";

                  return (
                    <tr
                      key={`${participant.teamId}-${participant.registrationNumber}-${index}`}
                      className="transition-colors hover:bg-zinc-900/40"
                    >
                      {/* Index */}
                      <td className="px-4 py-5 text-center font-mono text-zinc-500">
                        {index + 1}
                      </td>

                      {/* Team Name */}
                      <td className="px-4 py-5 font-mono text-xs font-bold uppercase tracking-wide text-white">
                        {participant.teamName}
                      </td>

                      {/* Participant Full Name */}
                      <td className="px-4 py-5 font-semibold text-zinc-100">
                        {participant.fullName}
                      </td>

                      {/* Registration Number */}
                      <td className="px-4 py-5 font-mono text-zinc-400">
                        {participant.registrationNumber}
                      </td>

                      {/* Gender */}
                      <td className="px-4 py-5 text-zinc-200">
                        {formatGender(participant.gender)}
                      </td>

                      {/* Year / Branch */}
                      <td className="whitespace-nowrap px-4 py-5 text-zinc-200">
                        {formatAcademicYear(participant.academicYear)} /{" "}
                        <span className="capitalize">
                          {participant.department || "-"}
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-5 font-mono text-zinc-400">
                        {participant.mobile}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-5 text-zinc-400">
                        {participant.email}
                      </td>

                      {/* College */}
                      <td className="px-4 py-5 text-zinc-400">
                        {participant.collegeName || "-"}
                      </td>

                      {/* Accommodation Badge */}
                      <td className="px-4 py-5">
                        {participant.accommodationType === "HOSTELLER" ? (
                          <span className="inline-block rounded border border-[#272b52] bg-[#14162e] px-2.5 py-1 font-mono text-[11px] font-bold uppercase text-[#93c5fd]">
                            {formatAccommodation(
                              participant.accommodationType,
                            )}
                          </span>
                        ) : participant.accommodationType === "DAY_SCHOLAR" ? (
                          <span className="inline-block rounded border border-zinc-800 bg-[#1e2026] px-2.5 py-1 font-mono text-[11px] font-bold uppercase text-zinc-400">
                            {formatAccommodation(
                              participant.accommodationType,
                            )}
                          </span>
                        ) : (
                          <span className="font-mono text-zinc-600">-</span>
                        )}
                      </td>

                      {/* Hostel Details */}
                      <td className="whitespace-nowrap px-4 py-5 text-xs text-zinc-300">
                        {isHosteller ? (
                          <div className="space-y-0.5 font-mono">
                            <p>
                              <span className="font-semibold text-zinc-500">
                                HOSTEL:
                              </span>{" "}
                              {participant.hostelName || "-"}
                              {participant.roomNumber
                                ? ` (${participant.roomNumber})`
                                : ""}
                            </p>
                            <p>
                              <span className="font-semibold text-zinc-500">
                                WARDEN:
                              </span>{" "}
                              {participant.wardenName || "-"}
                            </p>
                            <p className="text-[11px] text-zinc-400">
                              {participant.wardenContact || "-"}
                            </p>
                          </div>
                        ) : (
                          <span className="font-mono text-zinc-600">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!loading &&
        ((activeTab === "TEAMS" && filteredRegistrations.length === 0) ||
          (activeTab === "PARTICIPANTS" && participants.length === 0)) && (
          <div className="mt-6 rounded-2xl border border-zinc-800/80 bg-[#0c0c0e] p-12 text-center text-zinc-500">
            <p className="font-mono text-sm">NO MATCHING RECORDS LOCATED.</p>
          </div>
        )}

      {/* Footer */}
      <footer className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-yellow-500/80" />
          <span>SECURED ADMIN ENVIRONMENT</span>
        </div>
        <span className="text-zinc-700">•</span>
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-zinc-400" />
          <span>{participants.length} PARTICIPANTS</span>
        </div>
      </footer>
    </main>
  );
}

export default AdminDashboard;
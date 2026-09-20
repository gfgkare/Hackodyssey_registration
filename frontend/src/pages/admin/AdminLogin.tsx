import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, ShieldCheck, User } from "lucide-react";
import { loginAdmin } from "../../services/admin.service";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!username.trim() || !password) {
      setError("Please enter your username and password.");
      return;
    }

    try {
      setLoading(true);

      await loginAdmin({
        username: username.trim(),
        password,
      });

      navigate("/gfghackadmin/dashboard");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";

      setError(
        Array.isArray(message) ? message.join(", ") : String(message),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <ShieldCheck className="h-8 w-8 text-blue-700" />
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              Admin Portal
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Hack Odyssey Management System
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Username
              </label>

              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter admin username"
                  autoComplete="username"
                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Authorized personnel only
          </p>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
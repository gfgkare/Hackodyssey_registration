import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
  User,
} from "lucide-react";

import { loginAdmin } from "../../services/admin.service";
import GlassCard from "../../components/ui/GlassCard";
import Button from "../../components/ui/Button";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
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
    } catch (error: unknown) {
      const responseMessage =
        typeof error === "object" &&
        error !== null &&
        "response" in error
          ? (
              error as {
                response?: {
                  data?: {
                    message?: string | string[];
                  };
                };
              }
            ).response?.data?.message
          : undefined;

      const message =
        responseMessage ||
        "Login failed. Please check your credentials.";

      setError(
        Array.isArray(message) ? message.join(", ") : String(message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="hack-page-shell flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to homepage
        </button>

        <GlassCard className="p-6 sm:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 shadow-lg shadow-blue-950/30">
              <ShieldCheck className="h-10 w-10 text-blue-400" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              Restricted Access
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-white">
              Admin Portal
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Hack Odyssey Management System
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-200"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Username
              </label>

              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  placeholder="Enter admin username"
                  autoComplete="username"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-11 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full py-4 text-base"
            >
              Sign in to Admin Portal
            </Button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-5 text-center">
            <p className="text-xs leading-5 text-slate-500">
              Authorized personnel only. All access attempts may be
              logged for security purposes.
            </p>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}

export default AdminLogin;
import { useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
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
      setError("Please enter your admin credentials.");
      return;
    }

    try {
      setLoading(true);

      await loginAdmin({
        username: username.trim(),
        password,
      });

      navigate("/gfghackadmin/dashboard");
    } catch (loginError: unknown) {
      let message = "Access denied. Please verify your credentials.";

      if (axios.isAxiosError(loginError) && loginError.response?.data) {
        const data = loginError.response.data as {
          message?: string | string[];
        };
        if (data.message) {
          message = Array.isArray(data.message)
            ? data.message.join(", ")
            : String(data.message);
        }
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white selection:bg-yellow-500 selection:text-black">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Terminal Login Card */}
        <div className="rounded-2xl border border-zinc-800/80 bg-[#0c0c0e]/90 p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-500/30 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.15)]">
              <ShieldCheck className="h-7 w-7 text-yellow-500" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-1.5 rounded-sm bg-yellow-500" />
              <h1 className="font-mono text-2xl font-black tracking-wider text-white">
                MISSION CONTROL
              </h1>
            </div>

            <p className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-yellow-500/80">
              SECURE ADMIN AUTHENTICATION
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-900/60 bg-red-950/40 px-4 py-3 text-center font-mono text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-zinc-400"
              >
                Access Identifier
              </label>

              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="admin username"
                  autoComplete="username"
                  className="w-full rounded-xl border border-zinc-800 bg-black/80 py-3 pl-10 pr-4 font-mono text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/40"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-mono text-xs font-bold uppercase tracking-wider text-zinc-400"
              >
                Security Key
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-zinc-800 bg-black/80 py-3 pl-10 pr-4 font-mono text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/40"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-500 py-3 font-mono text-sm font-black tracking-wider text-black shadow-[0_0_20px_rgba(234,179,8,0.25)] transition hover:bg-yellow-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "AUTHENTICATING..." : "AUTHENTICATE"}
            </button>
          </form>

          {/* Footer Security Notice */}
          <div className="mt-8 flex items-center justify-center gap-1.5 border-t border-zinc-800/80 pt-5 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            <LockKeyhole className="h-3 w-3 text-zinc-600" />
            <span>Authorized Personnel Only</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdminLogin;
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { verifyAdminSession } from "../../services/admin.service";

interface AdminProtectedRouteProps {
  children: ReactNode;
}

function AdminProtectedRoute({
  children,
}: AdminProtectedRouteProps) {
  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await verifyAdminSession();
        setAuthenticated(true);
      } catch {
        setAuthenticated(false);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white px-8 py-6 text-center shadow">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700" />

          <p className="text-slate-600">
            Verifying admin session...
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return <Navigate to="/gfghackadmin" replace />;
  }

  return <>{children}</>;
}

export default AdminProtectedRoute;
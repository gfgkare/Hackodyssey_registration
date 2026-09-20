import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/registration/RegistrationForm";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import LandingPage from "./pages/LandingPage";

function RegistrationPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-blue-700">
            Hack Odyssey
          </h1>

          <p className="mt-3 text-xl font-medium text-slate-300">
            Hackathon Registration Portal
          </p>

          <p className="mt-2 text-slate-500">
            Register your team with 4 or 5 members.
          </p>
        </header>

        <RegistrationForm />
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/register" element={<RegistrationPage />} />

        <Route path="/gfghackadmin" element={<AdminLogin />} />

        <Route
          path="/gfghackadmin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
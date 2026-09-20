import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/registration/RegistrationForm";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function RegistrationPage() {
  return (
    <div className="hack-page-shell min-h-screen">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Hack Odyssey 4.0
          </p>

          <h1 className="hack-gradient-text text-4xl font-black tracking-tight sm:text-5xl">
            Hackathon Registration
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
            Assemble your team, provide accurate details, and secure your
            participation in Hack Odyssey.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              4 or 5 members
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Team registration
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Secure submission
            </span>
          </div>
        </header>

        <RegistrationForm />
      </main>

      <Footer />
    </div>
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
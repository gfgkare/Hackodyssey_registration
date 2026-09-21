import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Admin pages (unchanged)
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";

// Dedicated register page
import RegisterPage from "./pages/RegisterPage";

// Landing page sections
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import OpenToAll from "./components/landing/OpenToAll";
import AboutEvent from "./components/landing/AboutEvent";
import CollaboratingClubs from "./components/landing/CollaboratingClubs";
import EventHighlights from "./components/landing/EventHighlights";
import EventDetails from "./components/landing/EventDetails";
import FAQ from "./components/landing/FAQ";
import Contact from "./components/landing/Contact";
import Footer from "./components/landing/Footer";
import BackToTop from "./components/landing/BackToTop";

// Mobile sticky register CTA
function MobileRegisterCTA() {
  const navigate = useNavigate();
  return (
    <>
      
      <style>{`
        @media (max-width: 768px) {
          .mobile-cta-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  // Override the Register Now scroll to navigate to the register page
  function handleRegisterClick() {
    navigate("/register");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#050d24", color: "#ffffff" }}>
      <Navbar onRegisterClick={handleRegisterClick} />
      <main>
        <Hero onRegisterClick={handleRegisterClick} />
        <OpenToAll />
        <AboutEvent />
        <CollaboratingClubs />
        <EventHighlights />
        <EventDetails />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <MobileRegisterCTA />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Dedicated registration page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin routes (unchanged) */}
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
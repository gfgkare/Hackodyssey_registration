import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import HeroSection from "../components/landing/HeroSection";
import LogisticsSection from "../components/landing/LogisticsSection";
import SDGSection from "../components/landing/SDGSection";
import SponsorsSection from "../components/landing/SponsorsSection";
import CoordinatorsSection from "../components/landing/CoordinatorsSection";

export default function LandingPage() {
  return (
    <div className="hack-page-shell min-h-screen">
      <Navbar />

      <main>
        <HeroSection />

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(96,165,250,0.4), transparent)",
            }}
          />
          <LogisticsSection />
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(167,139,250,0.35), transparent)",
            }}
          />
          <SDGSection />
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(251,146,60,0.3), transparent)",
            }}
          />
          <SponsorsSection />
        </div>

        <div className="relative" id="coordinators">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent)",
            }}
          />
          <CoordinatorsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
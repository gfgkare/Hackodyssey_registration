import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-black text-white shadow-lg shadow-blue-600/20">
            HO
          </div>

          <div>
            <p className="text-lg font-bold text-white">Hack Odyssey</p>
            <p className="text-xs text-slate-400">GFG Campus Body KARE</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a
            href="#about"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            About
          </a>

          <a
            href="#events"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Events
          </a>

          <a
            href="#coordinators"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Coordinators
          </a>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Register Now
            <ArrowRight size={16} />
          </Link>
        </nav>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((previous) => !previous)}
          className="rounded-lg p-2 text-slate-200 transition hover:bg-white/10 md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <a
              href="#about"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              About
            </a>

            <a
              href="#events"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Events
            </a>

            <a
              href="#coordinators"
              onClick={closeMenu}
              className="rounded-lg px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Coordinators
            </a>

            <Link
              to="/register"
              onClick={closeMenu}
              className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-blue-500"
            >
              Register Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
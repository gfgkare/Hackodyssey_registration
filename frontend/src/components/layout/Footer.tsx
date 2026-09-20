import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:px-6 md:flex-row lg:px-8">
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-white">Hack Odyssey</p>

          <p className="mt-1 text-sm text-slate-400">
            Organized by GFG Campus Body KARE
          </p>

          <p className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} Hack Odyssey. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/gfgkare"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-blue-400/40 hover:text-white"
          >
            GitHub
          </a>

          <a
            href="https://www.instagram.com/gfgkare/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-blue-400/40 hover:text-white"
          >
            Instagram
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:border-blue-400/40 hover:text-white"
          >
            LinkedIn
          </a>

          <ExternalLink size={16} className="text-slate-500" />
        </div>
      </div>
    </footer>
  );
}
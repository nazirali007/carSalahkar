import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Car Salahkar",
  description: "Browse car brands and models launched in India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${outfit.variable}`}>
      <body className="min-h-full bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col">
        
        {/* Floating Premium Navigation Bar */}
        <div className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <header className="pointer-events-auto flex items-center justify-between rounded-full border border-white/60 bg-white/70 px-3 py-2.5 shadow-xl shadow-slate-200/50 backdrop-blur-xl w-full max-w-5xl transition-all hover:bg-white/80">
            <nav className="flex w-full items-center justify-between gap-4 px-2">
              <Link
                href="/"
                className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 shadow-md transition-transform group-hover:scale-105 group-hover:shadow-blue-500/25">
                  <span className="text-sm font-black text-white">CS</span>
                  <div className="absolute inset-0 rounded-full border border-white/20"></div>
                </div>
                <span className="flex flex-col">
                  <span className="text-base font-extrabold tracking-tight text-slate-900 leading-tight">
                    Car Salahkar
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    India Guide
                  </span>
                </span>
              </Link>

              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/brands"
                  className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  Brands
                </Link>
                <Link
                  href="/"
                  className="hidden rounded-full bg-slate-900 px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-blue-600 hover:shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 sm:inline-flex"
                >
                  Search Cars
                </Link>
              </div>
            </nav>
          </header>
        </div>

        {/* Main Content Area (padding-top accounts for fixed floating header) */}
        <div className="flex-1 pt-24 md:pt-28">
          {children}
        </div>

        {/* Minimal Premium Footer */}
        <footer className="mt-auto border-t border-slate-200/60 bg-white/50 backdrop-blur-sm py-8 text-center relative z-10">
          <p className="text-sm font-medium text-slate-500">
            © {new Date().getFullYear()} Car Salahkar. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}

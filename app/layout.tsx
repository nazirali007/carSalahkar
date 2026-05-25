import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-zinc-50 text-zinc-950">
        <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/95 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-300"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-zinc-950 text-sm font-black text-white">
                CS
              </span>
              <span>
                <span className="block text-sm font-black leading-4 tracking-tight sm:text-base">
                  Car Salahkar
                </span>
                <span className="block text-xs font-semibold text-zinc-500">
                  India car guide
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/brands"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-bold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-300 sm:px-4"
              >
                Brands
              </Link>
              <Link
                href="/"
                className="hidden rounded-lg bg-zinc-950 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-zinc-300 sm:inline-flex"
              >
                Search
              </Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

import { BrandSearch } from "@/components/BrandSearch";
import { getAllMakes } from "@/lib/nhtsa";

export default async function Home() {
  const makes = await getAllMakes();

  return (
    <main className="min-h-screen bg-[#f8fafc] relative overflow-hidden flex flex-col">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 -right-40 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000 pointer-events-none transform -translate-x-1/2"></div>

      <div className="relative z-10 px-4 pb-16 pt-4 sm:px-6 md:pb-24 lg:px-8 flex-1 flex flex-col items-center">
        <div className="mx-auto max-w-5xl w-full">
          {/* Custom Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-blue-100 shadow-sm backdrop-blur-md mb-6 transition-all hover:bg-white/80">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-800">
                Car Salahkar
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
              Discover the Perfect <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                India Market Car
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive database of top car companies and models launched in India. Search by brand or discover specific car models to find your next ride.
            </p>
          </div>

          {/* Search container with a lifted glassmorphism look */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-4 sm:p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-white/80 transition-all hover:shadow-slate-300/60 w-full">
            <BrandSearch makes={makes} />
          </div>
        </div>
      </div>
    </main>
  );
}

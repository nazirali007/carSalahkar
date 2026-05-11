import type { VehicleModel } from "@/lib/nhtsa";

type CarModelCardProps = {
  model: VehicleModel;
};

export function CarModelCard({ model }: CarModelCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="grid aspect-[16/10] place-items-center bg-[linear-gradient(135deg,#f8fafc,#dbeafe_48%,#fef3c7)] p-6">
        <div className="relative h-24 w-full max-w-64">
          <div className="absolute bottom-4 left-6 right-6 h-8 rounded-t-[40px] bg-zinc-900" />
          <div className="absolute bottom-9 left-20 right-20 h-9 rounded-t-full bg-zinc-700" />
          <div className="absolute bottom-0 left-10 h-10 w-10 rounded-full border-8 border-zinc-800 bg-white" />
          <div className="absolute bottom-0 right-10 h-10 w-10 rounded-full border-8 border-zinc-800 bg-white" />
          <div className="absolute bottom-7 left-12 h-3 w-8 rounded-full bg-amber-300" />
          <div className="absolute bottom-7 right-12 h-3 w-8 rounded-full bg-red-400" />
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <h2 className="text-xl font-semibold text-zinc-950">
            {model.Model_Name}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">{model.Make_Name}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold text-zinc-600">
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            Model code: {model.Model_ID}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">
            Make code: {model.Make_ID}
          </span>
        </div>
      </div>
    </article>
  );
}

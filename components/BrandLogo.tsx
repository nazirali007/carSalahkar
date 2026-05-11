import { getMakeAccent, getMakeInitials } from "@/lib/nhtsa";

type BrandLogoProps = {
  makeId: number;
  makeName: string;
  size?: "sm" | "lg";
};

export function BrandLogo({ makeId, makeName, size = "lg" }: BrandLogoProps) {
  const sizeClasses =
    size === "lg"
      ? "h-20 w-20 text-2xl"
      : "h-12 w-12 text-base";
  const accent = getMakeAccent(makeId);
  const initials = getMakeInitials(makeName);

  return (
    <div
      aria-label={`${makeName} logo`}
      className={`${sizeClasses} grid shrink-0 place-items-center rounded-full border border-black/10 bg-white font-bold shadow-sm`}
      style={{ color: accent }}
    >
      <span>{initials}</span>
    </div>
  );
}

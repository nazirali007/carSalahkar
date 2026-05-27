import Image from "next/image";
import { getMakeAccent, getMakeInitials } from "@/lib/nhtsa";

type BrandLogoProps = {
  makeId: number;
  makeName: string;
  logoUrl?: string;
  size?: "sm" | "lg";
};

export function BrandLogo({
  logoUrl,
  makeId,
  makeName,
  size = "lg",
}: BrandLogoProps) {
  const sizeClasses =
    size === "lg"
      ? "h-20 w-20 text-2xl"
      : "h-12 w-12 text-base";
  const accent = getMakeAccent(makeId);
  const initials = getMakeInitials(makeName);
  const logoPadding = size === "lg" ? "p-3" : "p-2";

  return (
    <div
      aria-label={`${makeName} logo`}
      className={`${sizeClasses} relative grid shrink-0 place-items-center overflow-hidden rounded-full border border-black/10 bg-white font-bold shadow-sm`}
      style={{ color: accent }}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt={`${makeName} logo`}
          fill
          sizes={size === "lg" ? "80px" : "48px"}
          className={`object-contain ${logoPadding} rounded-full`}
          unoptimized
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

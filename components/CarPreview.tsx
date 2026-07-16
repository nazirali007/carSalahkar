"use client";

type CarPreviewProps = {
  makeName: string;
  modelName: string;
  angle?: "23" | "09" | "05" | "01";
  className?: string;
  alt?: string;
};

const PREVIEW_COLORS = [
  ["#0f766e", "#ccfbf1", "#042f2e"],
  ["#2563eb", "#dbeafe", "#172554"],
  ["#b91c1c", "#fee2e2", "#450a0a"],
  ["#7c3aed", "#ede9fe", "#2e1065"],
  ["#ca8a04", "#fef3c7", "#422006"],
  ["#334155", "#e2e8f0", "#0f172a"],
  ["#047857", "#d1fae5", "#052e16"],
  ["#c2410c", "#ffedd5", "#431407"],
];

function getPreviewPalette(makeName: string) {
  const hash = makeName
    .split("")
    .reduce((total, letter) => total + letter.charCodeAt(0), 0);

  return PREVIEW_COLORS[hash % PREVIEW_COLORS.length];
}

function getAngleLabel(angle: string) {
  if (angle === "09") return "Side profile";
  if (angle === "05") return "Rear three-quarter";
  if (angle === "01") return "Studio front";

  return "Front three-quarter";
}

function getCarBody(angle: string, ink: string) {
  if (angle === "09") {
    return `<path d="M148 396 C186 338 280 306 424 306 H648 C748 306 817 342 858 397 L892 407 C910 413 922 430 922 450 V474 H78 V448 C78 426 92 409 113 403 Z" fill="url(#body)"/><path d="M338 313 C372 262 420 240 506 240 H618 C675 240 722 266 766 315 Z" fill="#fff" opacity="0.9"/><path d="M505 258 H618 C661 258 695 274 724 306 H474 C481 286 491 270 505 258 Z" fill="${ink}" opacity="0.2"/><path d="M155 408 H865" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="0.28"/><circle cx="275" cy="474" r="59" fill="${ink}"/><circle cx="275" cy="474" r="30" fill="#fff" opacity="0.9"/><circle cx="724" cy="474" r="59" fill="${ink}"/><circle cx="724" cy="474" r="30" fill="#fff" opacity="0.9"/><path d="M850 419 H904" stroke="#fef08a" stroke-width="14" stroke-linecap="round"/><path d="M96 419 H150" stroke="#fecaca" stroke-width="14" stroke-linecap="round"/>`;
  }

  if (angle === "05") {
    return `<path d="M150 404 C186 338 282 296 424 292 H584 C698 291 775 331 836 396 L874 410 C894 418 907 436 907 458 V482 H93 V455 C93 434 107 415 128 408 Z" fill="url(#body)"/><path d="M290 309 C332 255 383 233 462 233 H594 C650 233 704 260 760 313 Z" fill="#fff" opacity="0.88"/><path d="M608 254 C656 262 694 281 728 307 H484 C499 276 536 255 608 254 Z" fill="${ink}" opacity="0.24"/><path d="M146 418 H836" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="0.24"/><circle cx="314" cy="481" r="58" fill="${ink}"/><circle cx="314" cy="481" r="29" fill="#fff" opacity="0.9"/><circle cx="719" cy="481" r="58" fill="${ink}"/><circle cx="719" cy="481" r="29" fill="#fff" opacity="0.9"/><path d="M825 421 H884" stroke="#fecaca" stroke-width="16" stroke-linecap="round"/><path d="M128 421 H184" stroke="#fef08a" stroke-width="11" stroke-linecap="round"/><path d="M768 386 L846 398" stroke="${ink}" stroke-width="10" stroke-linecap="round" opacity="0.28"/>`;
  }

  if (angle === "01") {
    return `<path d="M224 374 C254 313 340 282 500 282 C660 282 746 313 776 374 L830 400 C854 411 868 433 868 459 V491 H132 V459 C132 433 146 411 170 400 Z" fill="url(#body)"/><path d="M344 296 C378 250 425 232 500 232 C575 232 622 250 656 296 Z" fill="#fff" opacity="0.9"/><path d="M382 252 H618 C638 262 652 276 662 296 H338 C348 276 362 262 382 252 Z" fill="${ink}" opacity="0.22"/><path d="M270 400 H730" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.25"/><circle cx="248" cy="488" r="54" fill="${ink}"/><circle cx="248" cy="488" r="27" fill="#fff" opacity="0.9"/><circle cx="752" cy="488" r="54" fill="${ink}"/><circle cx="752" cy="488" r="27" fill="#fff" opacity="0.9"/><path d="M212 418 H304" stroke="#fef08a" stroke-width="15" stroke-linecap="round"/><path d="M696 418 H788" stroke="#fef08a" stroke-width="15" stroke-linecap="round"/><path d="M386 432 H614" stroke="${ink}" stroke-width="16" stroke-linecap="round" opacity="0.32"/>`;
  }

  return `<path d="M160 386 C205 322 293 287 424 287 H592 C693 287 760 323 807 382 L850 394 C867 399 878 415 878 433 V471 H122 V425 C122 407 136 391 154 387 Z" fill="url(#body)"/><path d="M318 296 C347 251 390 230 455 230 H570 C626 230 670 253 711 298 Z" fill="#fff" opacity="0.9"/><path d="M448 247 H566 C612 247 646 263 675 292 H418 C425 274 434 260 448 247 Z" fill="${ink}" opacity="0.22"/><path d="M190 393 H811" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.28"/><circle cx="304" cy="466" r="58" fill="${ink}"/><circle cx="304" cy="466" r="29" fill="#fff" opacity="0.9"/><circle cx="704" cy="466" r="58" fill="${ink}"/><circle cx="704" cy="466" r="29" fill="#fff" opacity="0.9"/><path d="M792 404 H850" stroke="#fef08a" stroke-width="14" stroke-linecap="round"/><path d="M151 404 H208" stroke="#fecaca" stroke-width="14" stroke-linecap="round"/>`;
}

function buildInnerSvg(makeName: string, modelName: string, angle: string) {
  const [accent, tint, ink] = getPreviewPalette(makeName);
  const angleLabel = getAngleLabel(angle);
  const carMarkup = getCarBody(angle, ink);

  return `<defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${tint}"/><stop offset="1" stop-color="#ffffff"/></linearGradient><linearGradient id="body" x1="0" x2="1"><stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${ink}"/></linearGradient><filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.2"/></filter></defs><rect width="1000" height="620" fill="url(#bg)"/><circle cx="820" cy="132" r="150" fill="${accent}" opacity="0.1"/><circle cx="180" cy="510" r="180" fill="${ink}" opacity="0.06"/><path d="M130 500 H870" stroke="${ink}" stroke-width="10" stroke-linecap="round" opacity="0.12"/><g filter="url(#shadow)">${carMarkup}</g><rect x="70" y="64" width="218" height="42" rx="21" fill="#ffffff" opacity="0.86"/><text x="92" y="92" fill="${ink}" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="900">2026 ${angleLabel}</text><text x="72" y="150" fill="${ink}" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="800">${makeName}</text><text x="72" y="191" fill="${ink}" opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700">${modelName}</text>`;
}

export function CarPreview({ makeName, modelName, angle = "23", className, alt }: CarPreviewProps) {
  const innerSvg = buildInnerSvg(makeName, modelName, angle);

  return (
    <svg
      className={className}
      role="img"
      aria-label={alt ?? `${makeName} ${modelName} 2026 ${getAngleLabel(angle)}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: "100%", height: "100%", display: "block", overflow: "hidden" }}
      dangerouslySetInnerHTML={{ __html: innerSvg }}
    />
  );
}

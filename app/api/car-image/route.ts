import { NextResponse } from "next/server";

type WikipediaSummary = {
  thumbnail?: {
    source?: string;
  };
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
};

type CommonsImageInfo = {
  thumburl?: string;
  url?: string;
  descriptionurl?: string;
};

type CommonsPage = {
  title?: string;
  imageinfo?: CommonsImageInfo[];
};

type CommonsSearchResponse = {
  query?: {
    pages?: Record<string, CommonsPage>;
  };
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function cleanQueryPart(value: string | null) {
  return (value ?? "").trim().replace(/\s+/g, " ");
}

function unique(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function getMakeAliases(make: string) {
  return unique([
    make,
    make.replace(/\s+Motors$/i, ""),
    make.replace(/^Maruti Suzuki$/i, "Suzuki"),
    make.replace(/^MG Motor$/i, "MG"),
    make.replace(/^Mercedes-Benz$/i, "Mercedes"),
  ]);
}

function getModelAliases(model: string) {
  return unique([
    model,
    model.replace(/\s+EV$/i, ""),
    model.replace(/\s+Electric$/i, ""),
    model.replace(/\s+R-Line$/i, ""),
    model.replace(/\s+LWB$/i, ""),
    model.replace(/\s+Long$/i, ""),
    model.replace(/^Mercedes-Maybach\s+/i, "Maybach "),
    model.replace(/^Mercedes-AMG\s+/i, "AMG "),
    model.replace(/\s+/g, ""),
  ]);
}

function getAngleAliases(angle: string) {
  const normalized = angle.toLowerCase();

  if (normalized.includes("side")) {
    return ["side view", "profile", "side"];
  }

  if (normalized.includes("rear")) {
    return ["rear", "rear view", "back"];
  }

  if (normalized.includes("studio")) {
    return ["front", "official"];
  }

  return ["front", "three quarter"];
}

function isAllowedImageTitle(title: string, model: string) {
  const normalized = title.toLowerCase();
  const blockedWords = [
    "badge",
    "emblem",
    "logo",
    "watermark",
    "wordmark",
  ];
  const modelMatches = getModelAliases(model).some((alias) => {
    const normalizedAlias = alias.toLowerCase();

    return normalizedAlias.length > 1 && normalized.includes(normalizedAlias);
  });

  return modelMatches && !blockedWords.some((word) => normalized.includes(word));
}

function getSearches(make: string, model: string, angle: string) {
  const baseSearches = unique([
    ...getMakeAliases(make).flatMap((makeAlias) =>
      getModelAliases(model).flatMap((modelAlias) => [
        `${makeAlias} ${modelAlias} 2026`,
        `${makeAlias} ${modelAlias} 2025`,
        `${makeAlias} ${modelAlias} current model`,
        `${makeAlias} ${modelAlias} facelift`,
        `${makeAlias} ${modelAlias} car`,
      ]),
    ),
    `${model} car 2026`,
    `${model} car 2025`,
  ]);
  const angleAliases = getAngleAliases(angle);

  return unique([
    ...angleAliases.flatMap((angleAlias) =>
      baseSearches.map((search) => `${search} ${angleAlias}`),
    ),
    ...baseSearches,
  ]);
}

async function getWikipediaImage(make: string, model: string) {
  const titles = unique([
    ...getMakeAliases(make).flatMap((makeAlias) =>
      getModelAliases(model).map((modelAlias) => `${makeAlias} ${modelAlias}`),
    ),
    model,
    `${model} car`,
  ]);

  for (const title of titles) {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      {
        headers: {
          "User-Agent": "CarSalahkar/1.0 (local development)",
        },
        next: { revalidate: 60 * 60 * 24 * 7 },
      },
    );

    if (!response.ok) {
      continue;
    }

    const data = (await response.json()) as WikipediaSummary;
    const imageUrl = data.thumbnail?.source;

    if (imageUrl) {
      return {
        imageUrl,
        sourceName: "Wikipedia",
        sourceUrl: data.content_urls?.desktop?.page ?? "https://www.wikipedia.org/",
      };
    }
  }

  return null;
}

async function getCommonsImage(make: string, model: string, angle: string) {
  for (const search of getSearches(make, model, angle)) {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrnamespace: "6",
      gsrlimit: "12",
      gsrsearch: search,
      prop: "imageinfo",
      iiprop: "url",
      iiurlwidth: "1400",
      origin: "*",
    });

    const response = await fetch(
      `https://commons.wikimedia.org/w/api.php?${params.toString()}`,
      {
        headers: {
          "User-Agent": "CarSalahkar/1.0 (local development)",
        },
        next: { revalidate: 60 * 60 * 24 * 7 },
      },
    );

    if (!response.ok) {
      continue;
    }

    const data = (await response.json()) as CommonsSearchResponse;
    const pages = Object.values(data.query?.pages ?? {});
    const imagePage = pages.find((page) => {
      const title = page.title ?? "";

      return page.imageinfo?.[0] && isAllowedImageTitle(title, model);
    });
    const imageInfo = imagePage?.imageinfo?.[0];
    const imageUrl = imageInfo?.thumburl ?? imageInfo?.url;

    if (imageUrl) {
      return {
        imageUrl,
        sourceName: "Wikimedia Commons",
        sourceUrl: imageInfo?.descriptionurl ?? "https://commons.wikimedia.org/",
      };
    }
  }

  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = cleanQueryPart(searchParams.get("make"));
  const model = cleanQueryPart(searchParams.get("model"));
  const angle = cleanQueryPart(searchParams.get("angle"));

  if (!make || !model) {
    return jsonError("Both make and model are required.");
  }

  try {
    const image =
      (await getWikipediaImage(make, model)) ??
      (await getCommonsImage(make, model, angle));

    if (!image) {
      return jsonError("No unwatermarked public image found for this model.", 404);
    }

    return NextResponse.json(image);
  } catch {
    return jsonError("Unable to load car image right now.", 502);
  }
}

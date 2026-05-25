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
  ]);
}

function getModelAliases(model: string) {
  return unique([
    model,
    model.replace(/\s+EV$/i, ""),
    model.replace(/\s+Electric$/i, ""),
    model.replace(/\s+R-Line$/i, ""),
    model.replace(/\s+/g, ""),
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

async function getCommonsImage(make: string, model: string) {
  const searches = unique([
    ...getMakeAliases(make).flatMap((makeAlias) =>
      getModelAliases(model).flatMap((modelAlias) => [
        `${makeAlias} ${modelAlias}`,
        `${makeAlias} ${modelAlias} car`,
        `${makeAlias} ${modelAlias} automobile`,
      ]),
    ),
    `${model} car`,
  ]);

  for (const search of searches) {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      generator: "search",
      gsrnamespace: "6",
      gsrlimit: "10",
      gsrsearch: search,
      prop: "imageinfo",
      iiprop: "url",
      iiurlwidth: "1200",
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
      const title = page.title?.toLowerCase() ?? "";

      return (
        page.imageinfo?.[0] &&
        !title.includes("logo") &&
        !title.includes("badge") &&
        !title.includes("emblem")
      );
    });
    const imageInfo = imagePage?.imageinfo?.[0];

    if (!imageInfo) {
      continue;
    }

    const imageUrl = imageInfo.thumburl ?? imageInfo.url;

    if (!imageUrl) {
      continue;
    }

    return {
      imageUrl,
      sourceName: "Wikimedia Commons",
      sourceUrl: imageInfo.descriptionurl ?? "https://commons.wikimedia.org/",
    };
  }

  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = cleanQueryPart(searchParams.get("make"));
  const model = cleanQueryPart(searchParams.get("model"));

  if (!make || !model) {
    return jsonError("Both make and model are required.");
  }

  try {
    const image = await getWikipediaImage(make, model) ?? await getCommonsImage(make, model);

    if (!image) {
      return jsonError("No public image found for this model.", 404);
    }

    return NextResponse.json(image);
  } catch {
    return jsonError("Unable to load car image right now.", 502);
  }
}

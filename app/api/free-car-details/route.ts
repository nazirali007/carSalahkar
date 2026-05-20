import { NextResponse } from "next/server";
import { getFreeVehicleDetails } from "@/lib/freeVehicleApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = searchParams.get("make")?.trim();
  const model = searchParams.get("model")?.trim();

  if (!make || !model) {
    return NextResponse.json(
      { error: "Both make and model query parameters are required." },
      { status: 400 },
    );
  }

  try {
    const details = await getFreeVehicleDetails(make, model);

    return NextResponse.json(details);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to fetch free vehicle API data.",
      },
      { status: 502 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { plans } from "../../../../lib/plan";
import { EnrichedSession, auth } from "@/auth";

// api route
// /api/get-plan-details

export async function GET(req: NextRequest) {
  const session = (await auth()) as EnrichedSession;

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "unauthorized!",
      }),
      { status: 401 }
    );
  }
  return new NextResponse(
    JSON.stringify({
      message: "Plans fetched successfully!",
      data: plans,
    }),
    {
      status: 200,
    }
  );
}

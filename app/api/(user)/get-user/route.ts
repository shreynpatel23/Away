"use server";

import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";
import { EnrichedSession, auth } from "@/auth";

// Function to handle POST requests
export async function POST(req: NextRequest) {
  try {
    const session = (await auth()) as EnrichedSession;

    if (!session) {
      return new NextResponse(
        JSON.stringify({
          message: "unauthorized!",
        }),
        { status: 401 }
      );
    }
    await ConnectDB(); // Connect to the database

    const { email } = await req.json(); // Extract email from request body

    // Validate email presence
    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: "E-mail is required!" }),
        { status: 400 }
      );
    }

    // Find user with given email from database
    const user = await User.findOne({ email });

    // If user not found
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "User not found with given e-mail." }),
        { status: 404 }
      );
    }

    // Return user with all the details
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error while fetching user from database:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

"use server";

import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";

// Function to handle POST requests
export async function POST(req: NextRequest) {
  try {
    await ConnectDB(); // Connect to the database

    // Extract data from request body
    const { email, first_name, last_name } = await req.json();

    // Validate email and name
    if (!email) {
      return new NextResponse(
        JSON.stringify({ error: "E-mail is required!" }),
        { status: 400 }
      );
    }

    if (!first_name || !last_name) {
      return new NextResponse(JSON.stringify({ error: "Name is required!" }), {
        status: 400,
      });
    }

    // Check if the user already exists in the database
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return new NextResponse(JSON.stringify("User already exists"), {
        status: 200,
      });
    }

    // If user is new, create a new user object
    const newUser = new User({
      email,
      first_name,
      last_name,
      isPaidUser: false, // By default making isPaidUser false
      planType: "free",
    });

    // Save the new user to the database
    await newUser.save();

    // Return a 201 response with the newly created user object
    return new NextResponse(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error while adding user to database:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

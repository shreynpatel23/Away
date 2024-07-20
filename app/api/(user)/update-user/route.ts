// app/api/user/update-user.ts

import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";

// Function to handle POST requests
export async function POST(req: NextRequest) {
  try {
    await ConnectDB(); // Connect to the database

    // Extract data from request body
    const { email, new_email, first_name, last_name } = await req.json();

    // Validate email and new_email
    if (!email) {
      return new NextResponse(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    if (!new_email) {
      return new NextResponse(JSON.stringify({ error: "New email is required" }), { status: 400 });
    }

    // Validate first_name and last_name
    if (!first_name) {
      return new NextResponse(JSON.stringify({ error: "First name is required" }), { status: 400 });
    }

    if (!last_name) {
      return new NextResponse(JSON.stringify({ error: "Last name is required" }), { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse(JSON.stringify({ error: "User with given email not found" }), { status: 404 });
    }

     // Check if the new email is different from the old email
     if (email !== new_email) {

        // Check if the new email is already in use by another user
        const isEmailInUse = await User.findOne({ email: new_email });

        if (isEmailInUse) {
          return new NextResponse(JSON.stringify({ error: "New email is already in use" }), { status: 409 });
        }

    }

    // Update the user and return the updated user values
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { email: new_email, first_name, last_name },
      { new: true, runValidators: true }
    );

    return new NextResponse(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error while updating user:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}



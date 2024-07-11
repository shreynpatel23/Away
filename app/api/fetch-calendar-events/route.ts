import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { auth, EnrichedSession } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = (await auth()) as EnrichedSession;

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "unauthorized!",
      }),
      { status: 401 }
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  const oauth2Client = new OAuth2Client({
    clientId,
    clientSecret,
  });

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  // Use the provider token to authenticate with the Google Calendar API
  const calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  // Use the Google Calendar API to access the calendar
  try {
    const calendarRes = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = calendarRes.data.items;

    return new NextResponse(
      JSON.stringify({
        message: "Events fetched successfully!",
        data: events,
      }),
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse("Error in fetching events " + err, { status: 500 });
  }
}

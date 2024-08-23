import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { auth, EnrichedSession } from "@/auth";
import { NextResponse } from "next/server";

function getRandomTime() {
  const startHour = 9;
  const endHour = 17;
  const hour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
  const minute = Math.floor(Math.random() * 60);
  return { hour, minute };
}

function getRandomDuration(maxDuration: number) {
  return Math.floor(Math.random() * Math.min(maxDuration, 120)) + 30; // Duration between 30 to 120 minutes, or less if maxDuration is smaller
}

function getRandomDateWithinRange(startDate: any, endDate: any) {
  let randomDate;
  do {
    randomDate = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
  } while (randomDate.getDay() === 0 || randomDate.getDay() === 6); // Skip weekends

  return randomDate;
}

function calculateTotalDaytimeMinutes(startDateStr: any, endDateStr: any) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const workHoursPerDay = 8; // 9am - 5pm
  let totalMinutes = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      // Skip weekends
      totalMinutes += workHoursPerDay * 60;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return totalMinutes;
}

function generateRandomEvents(
  targetMinutes: any,
  startDateStr: any,
  endDateStr: any
) {
  const events = [];
  let totalMinutes = 0;

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  while (totalMinutes < targetMinutes) {
    const eventDate = getRandomDateWithinRange(startDate, endDate);
    const { hour, minute } = getRandomTime();
    eventDate.setHours(hour, minute, 0, 0);

    const duration = getRandomDuration(targetMinutes - totalMinutes);
    const eventEndDate = new Date(eventDate.getTime() + duration * 60000);

    // Ensure the event fits within the workday (9am - 5pm)
    if (
      eventDate.getHours() >= 9 &&
      eventEndDate.getHours() <= 17 &&
      eventDate < eventEndDate
    ) {
      events.push({
        summary: `Random Event`,
        start: {
          dateTime: eventDate.toISOString(),
          timeZone: "America/Toronto",
        },
        end: {
          dateTime: eventEndDate.toISOString(),
          timeZone: "America/Toronto",
        },
      });

      totalMinutes += duration;
    } else {
      // If event doesn't fit, continue to avoid an infinite loop
      continue;
    }
  }

  return events;
}

export async function POST(request: Request) {
  const { fillPercentage, startDateStr, endDateStr } = await request.json();
  // Use the Google Calendar API to access the calendar
  try {
    // get random generated events
    const totalDaytimeMinutes = calculateTotalDaytimeMinutes(
      startDateStr,
      endDateStr
    );
    const targetMinutes = totalDaytimeMinutes * (fillPercentage / 100); // Fill percentage of total daytime hours
    const events = generateRandomEvents(
      targetMinutes,
      startDateStr,
      endDateStr
    );

    return new NextResponse(
      JSON.stringify({
        message: "Events computed successfully!",
        data: events,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse("Error in populating event " + err, {
      status: 500,
    });
  }
}

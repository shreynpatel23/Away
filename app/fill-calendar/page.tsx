"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Banner from "../components/Banner";
import MyCalendar from "../components/Calendar";
import FillCalendarCard from "../components/FillCalendarCard";
import Link from "next/link";

export default function FillCalendar() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const fetchComputedFill = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fill-calendar");
      if (response.status === 401) {
        return router.replace("/");
      }
      const { data } = await response.json();
      const events = data?.map((eventData: any, index: number) => ({
        id: index + 1,
        title: eventData?.summary,
        start: new Date(eventData?.start?.dateTime),
        end: new Date(eventData?.end?.dateTime),
      }));
      setEvents(events);
      setLoading(false);
    } catch (err) {
      console.error("Error in fetching events:", err);
      setEvents([]);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchComputedFill();
  }, [fetchComputedFill]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-hover">
        <p className="text-lg leading-lg text-heading">
          Fetching your fill percentage events...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-4 px-8">
      <Header />
      <div className="w-[90%] mx-auto">
        <div className="inline-block">
          <Link href={`/view-calendar`}>
            <div className="flex items-center gap-2">
              <img
                src="/arrow-left.svg"
                alt="Arrow left icon"
                className="w-[20px]"
              />
              <p className="text-sm leading-sm text-heading">View Calendar</p>
            </div>
          </Link>
        </div>
        <Banner />
        <div className="my-12 flex items-start gap-4">
          <div className="w-[40%]">
            <FillCalendarCard
              onConfirm={() => {
                console.log("call the schedule event api here!");
              }}
              onReFill={() => fetchComputedFill()}
            />
          </div>
          <div className="w-[60%]">
            <div className="bg-white p-4 rounded-[16px]">
              <MyCalendar events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

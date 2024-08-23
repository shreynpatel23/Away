"use client";
import React, { useEffect, useState } from "react";
import MyCalendar from "../components/Calendar";
import Header from "../components/Header";
import Banner from "../components/Banner";
import { useRouter } from "next/navigation";
import UserDetails from "../components/UserDetails";
import { useUserContext } from "@/app/context/userContext";
import Utils from "@/utils/utils";
import axios from "axios";

export default function ViewCalendar() {
  const { user } = useUserContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchAllEvents() {
      setLoading(true);
      try {
        const response = await axios.get("/api/fetch-calendar-events");
        const { data } = await response.data;
        const events = data?.map((eventData: any, index: number) => ({
          id: index + 1,
          title: eventData?.summary,
          start: new Date(eventData?.start?.dateTime),
          end: new Date(eventData?.end?.dateTime),
        }));
        setEvents(events);
        setLoading(false);
      } catch (err: any) {
        console.error("Error in fetching events:", err);
        if (err?.response?.status === 401) {
          return router.replace("/login");
        }
        setEvents([]);
        setLoading(false);
      }
    }

    fetchAllEvents();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-hover">
        <p className="text-lg leading-lg text-heading">
          Fetching your Calendar events...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[100vh] overflow-y-auto bg-gradient-to-br from-gradientColor1 to-gradientColor2 py-6 px-12">
      <Header />
      {!user?.isPaidUser && (
        <div className="w-[90%] mx-auto">
          <Banner />
        </div>
      )}
      <div className="my-12">
        <h1 className="text-2xl leading-2xl text-heading">
          {Utils.capitalizeFirstLetter(user?.first_name || "")}'s Calendar
        </h1>
        <div className="my-8 flex items-start gap-4">
          <div className="w-[40%]">
            <UserDetails
              onFill={() => {
                user?.isPaidUser
                  ? router.push("/fill-calendar-paid")
                  : router.push("/fill-calendar");
              }}
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

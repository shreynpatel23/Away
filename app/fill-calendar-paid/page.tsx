"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Banner from "../components/Banner";
import MyCalendar from "../components/Calendar";
import { useUserContext } from "@/app/context/userContext";
import FillCalendarForm from "../components/FillCalendarForm";
import axios from "axios";
import moment from "moment";

export default function FillCalendar() {
  const router = useRouter();
  const { user } = useUserContext();
  const [state, setState] = useState({
    fillPercentage: 20,
    startDate: moment(new Date()).format("yyyy-MM-DD"),
    endDate: moment(new Date()).add(14, "days").format("yyyy-MM-DD"),
  });
  const [loading, setLoading] = useState(false);
  const [fillCalendarLoading, setFillCalendarLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const { fillPercentage, startDate, endDate } = state;

  const handlePopulateEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/generate-paid-events", {
        fillPercentage,
        startDateStr: startDate,
        endDateStr: endDate,
      });
      const { data } = response.data;
      setEvents(data);
      const updatedEvents = data?.map((eventData: any, index: number) => ({
        id: index + 1,
        title: eventData?.summary,
        start: new Date(eventData?.start?.dateTime),
        end: new Date(eventData?.end?.dateTime),
      }));
      setFilteredEvents(updatedEvents);
      setLoading(false);
      //   if (response.status === 201) {
      //     router.push("/view-calendar");
      //   }
    } catch (err: any) {
      console.error("Error in populating events:", err);
      if (err?.response?.status === 401) {
        return router.replace("/login");
      }
      setEvents([]);
      setLoading(false);
    }
  };

  const handleFillCalendar = async () => {
    setFillCalendarLoading(true);
    try {
      const response = await axios.post("/api/fill-calendar", {
        events,
      });
      if (response.status === 401) {
        return router.replace("/login");
      }
      setFillCalendarLoading(false);
      if (response.status === 201) {
        router.push("/view-calendar");
      }
    } catch (err) {
      console.error("Error in creating events:", err);
      setFillCalendarLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-hover">
        <p className="text-lg leading-lg text-heading">
          Fetching your fill percentage events...
        </p>
      </div>
    );
  }

  if (fillCalendarLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-hover">
        <p className="text-lg leading-lg text-heading">
          Filling your calendar. Please hang on a moment...
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
        <h1 className="text-2xl leading-2xl text-heading">Fill Calendar</h1>
        <div className="my-8 flex items-start gap-4">
          <div className="w-[40%]">
            <FillCalendarForm
              onCancel={() => router.push("/view-calendar")}
              onPopulate={() => {
                handlePopulateEvents();
              }}
              areEventsPopulated={filteredEvents.length > 0}
              onReFill={() => setFilteredEvents([])}
              onConfirm={() => handleFillCalendar()}
              state={state}
              setState={(value: any) => {
                console.log(value);
                setState((state) => ({
                  ...state,
                  ...value,
                }));
              }}
            />
          </div>
          <div className="w-[60%]">
            <div className="bg-white p-4 rounded-[16px]">
              <MyCalendar events={filteredEvents} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

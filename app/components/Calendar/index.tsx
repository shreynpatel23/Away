"use client";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { ICalendarProps } from "./interface";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

export default function MyCalendar(props: ICalendarProps) {
  const { events } = props;
  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <Calendar
        views={[Views.MONTH, Views.WEEK]}
        view={view} // Include the view prop
        date={date} // Include the date prop
        onView={(view: any) => setView(view)}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        popup
        onNavigate={(date) => {
          setDate(new Date(date));
        }}
      />
    </div>
  );
}

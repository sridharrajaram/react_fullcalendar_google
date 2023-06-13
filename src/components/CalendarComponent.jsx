import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//for Date and Time Format library used instead of MomentJs
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // needs additional webpack config!
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

function CalendarComponent() {

  const events = [
    {
      title: 'Event 1 Summary',
      start: '2023-06-15T10:00:00',
      end: '2023-06-15T12:00:00'
    },
    {
      title: 'Event 2 Summary',
      start: '2023-06-16T14:00:00',
      end: '2023-06-16T16:00:00'
    },
    {
      title: 'Event 3 Summary',
      start: '2023-06-14T09:00:00',
      end: '2023-06-14T11:00:00'
    },
  ];

  

  return (
    <div>
      <FullCalendar
        timeZone="local"
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          bootstrap5Plugin,
        ]}
        themeSystem="bootstrap5"
        initialView="dayGridMonth"
        height={"80vh"}
        headerToolbar={{
          start: "prev,next today new",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        selectable={true}
        customButtons={{
          new: {
            text: "Sync with Google",
            click: () => alert('Google Sync Done'),
          },
        }}
        events={events}
        eventColor="Green"
        nowIndicator
        dateClick={(e) => alert(dayjs(e.dateStr).format("YYYY-MM-DD"))}
        eventClick={(e) =>
          console.log({
            id: e.event.id,
            title: e.event.title,
            startTime: dayjs(e.event.start).format("YYYY-MM-DD HH:mm"),
            endTime: dayjs(e.event.end).format("YYYY-MM-DD HH:mm"),
          })
        }
        select={(e) =>
          alert(
            "Selected From " +
              dayjs(e.startStr).format("YYYY-MM-DD HH:mm") +
              " To " +
              dayjs(e.endStr).format("YYYY-MM-DD HH:mm")
          )
        }
      />
    </div>
  );
}

export default CalendarComponent

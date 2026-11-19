import React from "react";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Converts timestring to hours.
// TODO: Change to use date/time library when the input data is available.
function timeToHours(duration) {
  const [time, modifier] = duration.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return hours + minutes / 60;
}

function TimetablePage({ courses }) {
  const hours = Array.from({ length: 14 }, (_, i) => `${i + 8}:00 - ${i + 9}:00`);
  const savedCourses = courses.filter((course) => course.isFavourite);

  return (
    <div className="w-full mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-semibold mb-6">Timetable</h1>

      <div className="relative grid grid-cols-8 w-full border-t border-l border-black">

        {/* Empty top-left cell */}
        <div className="col-span-1 h-10 border-b border-r border-black"></div>

        {/* Header for days of the week */}
        <div className="col-span-7 h-10 grid grid-cols-7">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="border-b border-r border-black flex justify-center items-center">
              {day}
            </div>
          ))}
        </div>

        {/* Rows for each hour of the day */}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="col-span-1 h-20 border-b border-r border-black flex justify-center items-center">
              {hour}
            </div>
            <div className="col-span-7 grid grid-cols-7 h-20">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="border-b border-r border-black"></div>
              ))}
            </div>
          </React.Fragment>
        ))}

        {/* 
        Overlay for added courses. Currently uses favourite courses as a placeholder.
        TODO: change to added courses when that feature is implemented.
        */}
        <div className="absolute inset-0 top-10 left-0 col-span-8 pointer-events-none grid grid-cols-8">
          <div className="col-span-1"></div>
          <div className="col-span-7 relative h-full">
            {savedCourses.map((course) => {
              // TODO: Change to use date/time library when the input data is available.
              const [startTimeStr, endTimeStr] = course.time.split(" - ");
              const startHour = timeToHours(startTimeStr);
              const endHour = timeToHours(endTimeStr);

              // top offset and height in pixels (consider changing to relative units?)
              const top = (startHour - 8) * (100/14);
              const height = (endHour - startHour) * (100/14);

              // for each day in course, render an individual block
              return course.schedule.map((day) => {
                const dayIndex = DAYS_OF_WEEK.indexOf(day);
                if (dayIndex === -1) return null;

                // left offset and width in percentage
                const left = (dayIndex / 7) * 100;
                const width = (1 / 7) * 100;

                return (
                  <div
                    key={`${course.id}-${day}`}
                    className="absolute pointer-events-auto bg-blue-100 border border-blue-400 p-2 overflow-hidden flex flex-col justify-between rounded shadow-sm"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                      top: `${top}%`,
                      height: `${height}%`,
                    }}
                  >
                    <div>
                      <div className="text-xs font-bold text-blue-900 truncate">{course.code}</div>
                      <div className="text-[11px] font-medium text-blue-800 line-clamp-2 leading-tight">
                        {course.name}
                      </div>
                    </div>
                    <div className="text-[10px] text-blue-700 flex justify-between items-center mt-1">
                      <span className="truncate mr-1">{course.room}</span>
                      <span className="shrink-0 font-medium">{course.time.split(" ")[0]}</span>
                    </div>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimetablePage;
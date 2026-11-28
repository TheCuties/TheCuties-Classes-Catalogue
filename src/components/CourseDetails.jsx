import { formatTimeRange } from "../utils/formatTime.js";

const SECTION_GROUPS = [
  { type: "Lecture", title: "Lecture sections" },
  { type: "Tutorial", title: "Tutorial sections" },
  { type: "Laboratory", title: "Laboratory sections" },
];

function SectionCard({ section }) {
  return (
    <li className="rounded-lg border border-base-300 p-3 text-sm space-y-1">
      <p className="font-semibold">
        Section {section.sectionNumber}
        <span className="font-normal opacity-70"> · CRN {section.crn}</span>
      </p>
      <p><span className="opacity-70">Instructor:</span> {section.instructor}</p>
      <p><span className="opacity-70">Days:</span> {section.schedule.join(", ")}</p>
      <p><span className="opacity-70">Time:</span> {formatTimeRange(section.startTime, section.endTime)}</p>
      <p><span className="opacity-70">Room:</span> {section.room}</p>
    </li>
  );
}

// Course info card + section boxes.
// Used on the course detail page and in the timetable popups.
function CourseDetails({ course, onToggleFavourite, onToggleAddedToTimetable }) {

  const sections = course.sections || [];

  // Since every section of a course is on the same campus just take it from the first one
  const campus = sections[0]?.campus || "";

  const sectionGroups = SECTION_GROUPS
    .map((group) => ({
      ...group,
      sections: sections.filter((section) => section.type === group.type),
    }))
    .filter((group) => group.sections.length > 0);

  // Store each detail as a label and value.
  // This list is looped through below so each row
  // does not need to be written out by hand.
  // Instructor, Schedule and Room are in the section cards now, because they are different for each section
  const details = [
    { label: "Term", value: course.semester },
    { label: "Department", value: course.department },
    { label: "Year level", value: `Year ${course.year}` },
    { label: "Credits", value: course.credits },
  ];

  return (
    <div className="space-y-6">

      <article className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body gap-4">

          {/* Favourite star */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onToggleFavourite(course.id)}
              aria-pressed={course.isFavourite}
              aria-label={course.isFavourite ? "Remove from favourites" : "Add to favourites"}
              className="btn btn-ghost btn-circle text-2xl text-amber-400"
            >
              {course.isFavourite ? "★" : "☆"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* COURSE CODE, DEPARTMENT, NAME, DESCRIPTION, CAMPUS */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-primary">{course.code}</span>
                <span className="badge badge-outline">{course.department}</span>
              </div>

              <h1 className="text-3xl font-bold">{course.name}</h1>

              <p>{course.description}</p>

              <p>
                <span className="opacity-70">Campus:</span>{" "}
                <span className="font-medium">{campus}</span>
              </p>
            </div>

            {/* COURSE DETAILS BOX */}
            <div className="rounded-lg border border-base-300 p-4">
              <h2 className="text-xl font-semibold mb-3">Course details</h2>

              {/* One column on phones, two columns on larger screens */}
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {details.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm opacity-70">{item.label}</dt>
                    <dd className="font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="card-actions justify-end items-center mt-2">

            {/* Add button. When clicked, it sends this course's ID to the onToggleAddedToTimetable function. */}
            <button
              type="button"
              onClick={() => onToggleAddedToTimetable(course.id)}
              aria-pressed={course.isAdded}
              className={
                course.isAdded
                  ? "btn btn-primary"
                  : "btn btn-outline btn-primary"
              }
            >
              {course.isAdded ? "Remove Course" : "Add Course"}
            </button>

          </div>
        </div>
      </article>

      {/* SECTION BOXES: one box per section type that this course has */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sectionGroups.map((group) => (
          <section key={group.type} className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
              <h2 className="text-lg font-semibold">{group.title}</h2>
              <ul className="space-y-3">
                {group.sections.map((section) => (
                  <SectionCard key={section.crn} section={section} />
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* If the API gives no sections at all, say so instead of showing nothing */}
      {sectionGroups.length === 0 && (
        <p className="opacity-70">No sections are listed for this course.</p>
      )}
    </div>
  );
}

export default CourseDetails;
// useParams reads the course code from the URL.
import { Link, useParams } from "react-router-dom";

// Import the function that finds a course using the code in the URL
import { findCourseBySlug } from "../utils/courseSlug.js";
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

function CourseDetailPage({ courses, onToggleFavourite }) {

  // Read the course code from the URL.
  const { courseCode } = useParams();
  const course = findCourseBySlug(courses, courseCode);

  // No course matches the code -> show an error message
  if (!course) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">

        <div role="alert" className="alert alert-error">
          <span>No course found with the code "{courseCode}".</span>
        </div>

        <Link to="/" className="btn btn-outline">
          Back to all courses
        </Link>

      </div>
    );
  }
  
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

    // Main container for the Course Detail page
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Breadcrumbs: shows where the user is in the site and lets them click back to the Courses page. Like going through a file hierarchy)*/}
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link to="/">Courses</Link></li>
          <li>{course.code}</li>
        </ul>
      </div>

      <article className="card bg-base-100 shadow-md">
        <div className="card-body gap-4">

          {/* COURSE CODE AND DEPARTMENT */}
          <div className="flex flex-wrap gap-2">
            <span className="badge badge-primary">
              {course.code}
            </span>
            <span className="badge badge-outline">
              {course.department}
            </span>
          </div>

          {/* COURSE NAME AND DESCRIPTION */}
          <h1 className="card-title text-3xl">
            {course.name}
          </h1>

          <p>
            {course.description}
          </p>

          <p>
            <span className="opacity-70">Campus:</span>{" "}
            <span className="font-medium">{campus}</span>
          </p>

          {/* COURSE DETAILS */}
          <h2 className="text-xl font-semibold mt-2">
            Course details
          </h2>

          {/* One column on phones, two columns on larger screens */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {details.map((item) => (
              <div key={item.label}>
                <dt className="text-sm opacity-70">{item.label}</dt>
                <dd className="font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>

          {/* BUTTONS */}
          <div className="card-actions justify-between items-center mt-4">

            <Link to="/" className="btn btn-ghost">
              Back to all courses
            </Link>

            {/* Save button.When clicked, it sends this course's ID to the onToggleFavourite function. */}
            <button
              type="button"
              onClick={() => onToggleFavourite(course.id)}
              aria-pressed={course.isFavourite}
              className={
                course.isFavourite
                  ? "btn btn-primary"
                  : "btn btn-outline btn-primary"
              }
            >
              {course.isFavourite ? "Saved" : "Save this course"}
            </button>

          </div>

        </div>
      </article>

      {/* SECTION BOXES: one box per section type that this course has */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionGroups.map((group) => (
          <section key={group.type} className="card bg-base-100 shadow-md">
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

    </div>
  );
}

export default CourseDetailPage;
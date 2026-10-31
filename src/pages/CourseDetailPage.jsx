// useParams reads the course code from the URL.
import { Link, useParams } from "react-router-dom";

// Import the function that finds a course using the code in the URL
import { findCourseBySlug } from "../utils/courseSlug.js";

// Receive the courses and favourite function from App.jsx
function CourseDetailPage({ courses, onToggleFavourite }) {

  // Read the course code from the URL.
  // Example: /courses/csci-1010u gives "csci-1010u"
  const { courseCode } = useParams();

  // Find the course that matches the code in the URL
  const course = findCourseBySlug(courses, courseCode);

  // If no course matches the code, show an error message
  // instead of a blank page
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

  // Store each detail as a label and value.
  // This list is looped through below so each row
  // does not need to be written out by hand.
  const details = [
    { label: "Instructor", value: course.instructor },
    { label: "Department", value: course.department },
    { label: "Term", value: course.semester },
    { label: "Schedule", value: `${course.schedule.join(" & ")}, ${course.time}` },
    { label: "Room", value: course.room },
    { label: "Credits", value: course.credits },
    { label: "Year level", value: `Year ${course.year}` },
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

    </div>
  );
}

export default CourseDetailPage;
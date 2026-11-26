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

// Loads this course's reviews from localStorage.
// ReviewPage saves them under the key "reviews-course-<id>".
function loadReviews(courseId) {
  try {
    const saved = localStorage.getItem(`reviews-course-${courseId}`);
    return saved ? JSON.parse(saved) : [];
  } catch {
    // If localStorage is blocked or the data is broken, show no reviews
    return [];
  }
}

// Averages the star ratings in a list of reviews.
// Returns 0 if the list is empty.
function averageStars(reviews) {
  if (reviews.length === 0) {
    return 0;
  }
  const total = reviews.reduce((sum, review) => sum + review.stars, 0);
  return total / reviews.length;
}

// Shows a rating as stars rounded to the nearest whole star.
// Example: 3.6 -> "★★★★☆"
function starText(rating) {
  const filled = Math.round(rating);
  return "★".repeat(filled) + "☆".repeat(5 - filled);
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

  // Reviews for the side panel
  const reviews = loadReviews(course.id);
  const courseAverage = averageStars(reviews);

  // Rating for each section.
  // Reviews only have a "section" field once the review form saves one
  // (the section's sectionNumber, e.g. "001" or "002T").
  // Until then, every section shows "No ratings yet".
  const sectionRatings = sections.map((section) => {
    const sectionReviews = reviews.filter(
      (review) => review.section === section.sectionNumber
    );
    return {
      section,
      count: sectionReviews.length,
      average: averageStars(sectionReviews),
    };
  });

  return (

    // Main container: page content on the left, reviews on the right (stacked on phones)
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* LEFT SIDE: course info + sections */}
      <div className="lg:col-span-3 space-y-6">

        <article className="card bg-base-100 shadow-md">
          <div className="card-body gap-4">

            {/* TOP ROW: breadcrumbs on the left, favourite star on the right */}
            <div className="flex items-center justify-between">

              {/* Breadcrumbs: shows where the user is and links back to the Courses page */}
              <div className="breadcrumbs text-sm">
                <ul>
                  <li><Link to="/">Courses</Link></li>
                  <li>{course.code}</li>
                </ul>
              </div>

              {/* Favourite star. Does the same thing as the Save button below */}
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
            <div className="card-actions justify-between items-center mt-2">

              <Link to="/" className="btn btn-ghost">
                Back to all courses
              </Link>

              {/* Save button. When clicked, it sends this course's ID to the onToggleFavourite function. */}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        {/* If the API gives no sections at all, say so instead of showing nothing */}
        {sectionGroups.length === 0 && (
          <p className="opacity-70">No sections are listed for this course.</p>
        )}
      </div>

      {/* RIGHT SIDE: reviews panel */}
      <aside className="card bg-base-100 shadow-md lg:col-span-1">
        <div className="card-body gap-4">
          <h2 className="text-xl font-semibold">Reviews</h2>

          {/* Overall course rating */}
          <div className="text-center">
            <p className="text-4xl font-bold">
              {reviews.length > 0 ? courseAverage.toFixed(1) : "–"}
            </p>
            <p className="text-2xl text-amber-400" aria-hidden="true">
              {starText(courseAverage)}
            </p>
            <p className="text-sm opacity-70">
              Based on {reviews.length} review{reviews.length === 1 ? "" : "s"}
            </p>
          </div>

          {/* Rating for each section */}
          <h3 className="font-semibold">By section</h3>
          <ul className="space-y-2 text-sm">
            {sectionRatings.map(({ section, count, average }) => (
              <li key={section.crn} className="flex justify-between gap-2">
                <span>{section.type} {section.sectionNumber}</span>
                {count > 0 ? (
                  <span>
                    <span className="text-amber-400" aria-hidden="true">{starText(average)}</span>{" "}
                    {average.toFixed(1)} ({count})
                  </span>
                ) : (
                  <span className="opacity-60">No ratings yet</span>
                )}
              </li>
            ))}
          </ul>

          {/* Link to the full reviews page */}
          <Link to={`/reviews/${course.id}`} className="btn btn-outline btn-sm mt-auto">
            View all reviews
          </Link>
        </div>
      </aside>

    </div>
  );
}

export default CourseDetailPage;
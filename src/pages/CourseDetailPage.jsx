// useParams reads the course code from the URL.
import { Link, useParams } from "react-router-dom";

// Import the function that finds a course using the code in the URL
import { findCourseBySlug } from "../utils/courseSlug.js";

// Course info + sections (shared with the timetable popups)
import CourseDetails from "../components/CourseDetails.jsx";

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

function CourseDetailPage({ courses, onToggleFavourite, onToggleAddedToTimetable }) {

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

        {/* Breadcrumbs on the left, back link on the right */}
        <div className="flex items-center justify-between">
          <div className="breadcrumbs text-sm">
            <ul>
              <li><Link to="/">Courses</Link></li>
              <li>{course.code}</li>
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost btn-sm">
            Back to all courses
          </Link>
        </div>

        <CourseDetails
          course={course}
          onToggleFavourite={onToggleFavourite}
          onToggleAddedToTimetable={onToggleAddedToTimetable}
        />
      </div>

      {/* RIGHT SIDE: reviews panel */}
      <aside className="card bg-base-100 border border-base-300 shadow-sm lg:col-span-1">
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
// Link lets the title open the course detail page without reloading
import { Link } from "react-router-dom";

// Converts "CSCI 1010U" into "csci-1010u" for the URL
import { toCourseSlug } from "../utils/courseSlug.js";

// This component displays information about one course.
// It receives the course object and favourite function from its parent.

import ReviewPage from "../pages/ReviewPage";

function CourseCard({ course, onToggleFavourite }) {

  // The course object contains all the information for one course.
  // onToggleFavourite allows the user to add or remove a course
  // from their saved courses.

  return (

    // Main card container.
    // "card" creates a card layout using DaisyUI.
    // "bg-base-100" sets the background colour.
    // "border" adds an outline around the card.
    <div className="card bg-base-100 border border-base-300">

      {/* card-body adds padding and organizes the card's contents */}
      <div className="card-body">

        {/* COURSE CODE AND FAVOURITE BUTTON */}

        {/* flex places the course code and favourite button
            on opposite sides of the card */}
        <div className="flex justify-between items-start">

          {/* Display the course code from the course object */}
          <span className="badge badge-primary badge-outline">
            {course.code}
          </span>

          {/* Favourite button.
              When clicked, it sends this course's ID to the
              onToggleFavourite function. */}
          <button
            onClick={() => onToggleFavourite(course.id)}
            aria-label={
              course.isFavourite
                ? "Remove from favourites"
                : "Add to favourites"
            }
            className="btn btn-ghost btn-sm text-xl"
          >
            {/* Show a filled star if the course is a favourite.
                Otherwise, show an empty star. */}
            {course.isFavourite ? "★" : "☆"}
          </button>

        </div>

        {/* COURSE NAME AND DEPARTMENT */}

        <h2 className="card-title text-lg mt-2">
          <Link
            to={`/courses/${toCourseSlug(course.code)}`}
            className="link link-hover"
          >
            {course.name}
          </Link>
        </h2>

        {/* Display which department or major offers the course */}
        <p className="text-sm text-base-content/60">
          {course.department}
        </p>

        {/* COURSE DESCRIPTION */}

        {/* Display a short description explaining what
            students will learn in the course */}
        <p className="text-sm mt-2">
          {course.description}
        </p>

        {/* divider creates a horizontal line separating sections */}
        <div className="divider my-1"></div>

        {/* GENERAL COURSE INFORMATION */}

        {/* grid divides the information into two columns.
            This keeps the course details organized. */}
        <div className="grid grid-cols-2 gap-3 text-sm">

          {/* Display the instructor's name */}
          <div>
            <p className="font-semibold">Instructor</p>
            <p>{course.instructor}</p>
          </div>

          {/* Display the number of course credits */}
          <div>
            <p className="font-semibold">Credits</p>
            <p>{course.credits}</p>
          </div>

          {/* Display which year the course belongs to */}
          <div>
            <p className="font-semibold">Year</p>
            <p>Year {course.year}</p>
          </div>

          {/* Display the semester in which the course is offered */}
          <div>
            <p className="font-semibold">Semester</p>
            <p>{course.semester}</p>
          </div>

        </div>

        {/* Separate general course information from schedule details */}
        <div className="divider my-1"></div>

        {/* SCHEDULE INFORMATION */}

        {/* Display the days, time, and classroom for the course */}
        <div className="text-sm space-y-2">

          {/* Display the days the course takes place.
              join(", ") converts the schedule array into a
              readable string, such as "Monday, Wednesday". */}
          <div>
            <p className="font-semibold">Schedule</p>
            <p>{course.schedule.join(", ")}</p>
          </div>

          {/* Display the starting and ending time */}
          <div>
            <p className="font-semibold">Time</p>
            <p>{course.time}</p>
          </div>

          {/* Display the classroom location */}
          <div>
            <p className="font-semibold">Room</p>
            <p>{course.room}</p>
          </div>

            {/* Display the View Reviews Button */}
          <Link to={`/reviews/${course.id}`}>
            <button className="btn btn-primary btn-sm hover:scale-105 transition-transform">
              View Reviews
            </button>
          </Link>

          <div>

          </div>

        </div>

      </div>
    </div>
  );
}

// Export the component so other files can import and reuse it.
export default CourseCard;

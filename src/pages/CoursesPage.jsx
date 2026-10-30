
// Import the reusable CourseCard component
import CourseCard from "../components/CourseCard";

// Receive the courses and favourite function from App.jsx
function CoursesPage({ courses, onToggleFavourite }) {

  return (

    // Main container for the Courses page
    <div>

      {/* Page heading */}
      <h1 className="text-2xl font-semibold mb-6">
        Courses
      </h1>

      {/* Display all courses in a grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Loop through the courses array.
            Each course will create its own CourseCard. */}
        {courses.map((course) => (

          <CourseCard

            // Give each card a unique ID
            key={course.id}

            // Pass the course information to CourseCard
            course={course}

            // Pass the favourite function to CourseCard
            onToggleFavourite={onToggleFavourite}

          />

        ))}

      </div>

    </div>
  );
}

// Export the page so App.jsx can use it
export default CoursesPage;

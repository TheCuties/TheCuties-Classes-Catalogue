
import CourseCard from "../components/CourseCard";

// Receive the courses and favourite function from App.jsx
function SavedPage({ courses, onToggleFavourite }) {

  // Keep only courses that the user has favourited
  const savedCourses = courses.filter(
    (course) => course.isFavourite
  );

  return (
    <div>
      {/* Page heading */}
      <h1 className="text-2xl font-semibold mb-6">
        Saved Courses
      </h1>

      {/* Check if there are any saved courses */}
      {savedCourses.length === 0 ? (
        <p className="text-base-content/60">
          You haven't saved any courses yet.
        </p>
      ) : (
        // Display saved courses in a grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onToggleFavourite={onToggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedPage;

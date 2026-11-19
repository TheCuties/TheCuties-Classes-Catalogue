
import CourseCard from "../components/CourseCard";

// Receive the courses and favourite function from App.jsx
function SavedPage({ courses, onToggleFavourite }) {

  // Keep only courses that the user has favourited
  const savedCourses = courses.filter(
    (course) => course.isFavourite
  );

  // Goes through all courses and if it is saved then it toggles it based on the course id
  function clearAllFavourites() {
    courses.forEach(course => {
      // if favourite toggles to false
      if (course.isFavourite) {
        onToggleFavourite(course.id)
      }
    });
  }

  return (
    <div>
      {/* Header Card */}
      { /*AI-assisted - see AI-USAGE.md #2*/ }
      <div className="bg-white border border-base-300 rounded-xl shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              Saved Courses
            </h1>

            <p className="text-base-content/70 mt-2">
              {savedCourses.length} course{savedCourses.length == 1 ? '' : 's'} saved
            </p>
          </div>

          {/*Only shows the clearAllFavourites button when there are saved courses*/}
          {savedCourses.length > 0 && (
            <button
              className="btn btn-error"
              onClick={clearAllFavourites}
            >
              Remove All Favourites
            </button>
          )}
        </div>
      </div>

      {/* If there are no saved courses */}
      {savedCourses.length === 0 ? (
        <div className="bg-white border border-base-300 rounded-xl shadow-sm p-12 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            No Saved Courses Yet
          </h2>
          <p className="text-base-content/70">
            Save courses to view them here.
          </p>
        </div>
      ) :

        (
          /* Else it shows the saved courses grid */
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
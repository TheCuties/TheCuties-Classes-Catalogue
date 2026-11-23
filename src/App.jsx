
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// Import the navigation bar
import Navbar from './components/Navbar.jsx';

// Import the four pages
import CoursesPage from './pages/CoursesPage.jsx';
import SavedPage from './pages/SavedPage.jsx';
import TimetablePage from './pages/TimetablePage.jsx';
import ReviewPage from "./pages/ReviewPage.jsx";
import CourseDetailPage from './pages/CourseDetailPage.jsx';

export default function App() {

  // Store all courses in React state
  const [courses, setCourses] = useState([]);
  const [loadStatus, setLoadStatus] = useState('loading');

  // useEffect runs this when the component loads
  useEffect(() => {
    setLoadStatus('loading');
    const controller = new AbortController();

    fetch("https://us-central1-classcatalogue.cloudfunctions.net/api/courses",
      { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP Response: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // Gets the favourite course ids from localStorage
        // If there are no favourite courses its an empty array
        const saved = JSON.parse(localStorage.getItem("favourites")) || [];

        // Mapping API data into the structure used throughout the app
        const mappedCourses = data.map((course) => ({
          ...course,
          campus: course.sections?.[0]?.campus || "",
          instructor: course.sections?.[0]?.instructor || "",
          schedule: course.sections?.[0]?.schedule || [],
          time: `${course.sections?.[0]?.startTime || ""} - ${course.sections?.[0]?.endTime || ""}`,
          isFavourite: saved.includes(course.id),
          room: course.sections?.[0]?.room || "",
          crn: course.sections?.[0]?.crn || "",
          type: course.sections?.[0]?.type || "",
          sectionNumber: course.sections?.[0]?.sectionNumber || "",
        }));
        // Updates courses and status
        setCourses(mappedCourses);
        setLoadStatus('ok');
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }
        console.error(error);
        setLoadStatus('error');
      });
    return () => controller.abort();
  }, []);


  // Function to add or remove a course from favourites
  const toggleFavourite = (id) => {
    setCourses((previousCourses) => {
      const updated = previousCourses.map((course) =>
        // Find the course that was clicked
        course.id === id
          // Change its favourite status
          ? { ...course, isFavourite: !course.isFavourite }
          // Leave all other courses unchanged
          : course
      );

      // Save favourite IDs to localStorage
      const favouriteIds = updated.filter(c => c.isFavourite).map(c => c.id);
      localStorage.setItem("favourites", JSON.stringify(favouriteIds));

      return updated;
    });
  };

  // Displaying loading/error messages
  if (loadStatus === 'loading') return <p>Loading courses...</p>;
  if (loadStatus === 'error') return <p>Could not load courses.</p>

  return (
    <>
      {/* Display the navigation bar */}
      <Navbar />

      {/* Main content area */}
      <main className="p-6">

        {/* React Router determines which page to display */}
        <Routes>

          {/* Main Courses page */}
          <Route
            path="/"
            element={
              <CoursesPage
                courses={courses}
                onToggleFavourite={toggleFavourite}
              />
            }
          />

          {/* Course detail page*/}
          <Route
            path="/courses/:courseCode"
            element={
              <CourseDetailPage
                courses={courses}
                onToggleFavourite={toggleFavourite}
              />
            }
          />

          {/* Saved courses page */}
          <Route
            path="/saved"
            element={
              <SavedPage
                courses={courses}
                onToggleFavourite={toggleFavourite}
              />
            }

          />

          {/* Timetable page */}
          <Route
            path="/timetable"
            element={
              <TimetablePage courses={courses} />
            }
          />

          {/* Reviews page */}
          <Route
            path="/reviews/:id"
            element={
              <ReviewPage courses={courses} />
            }
          />

        </Routes>

      </main>
    </>
  );
}

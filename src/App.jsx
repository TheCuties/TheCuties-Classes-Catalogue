
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import SavedPage from './pages/SavedPage.jsx';
import TimetablePage from './pages/TimetablePage.jsx';
import ReviewPage from "./pages/ReviewPage.jsx";
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import { formatTimeRange } from './utils/formatTime.js';

export default function App() {

  // Storing the list of courses that comes from the API
  const [courses, setCourses] = useState([]);

  // Tracking whether we are still waiting for the API response
  const [loadStatus, setLoadStatus] = useState('loading');

  // useEffect runs this when the component loads
  useEffect(() => {
    setLoadStatus('loading');

    const controller = new AbortController();

    // Calling our Cloud Function API
    fetch(
      "https://us-central1-classcatalogue.cloudfunctions.net/api/courses",
      { signal: controller.signal }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Response: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {

        // Getting any previously saved favourite course IDs from localStorage
        // If there are no favourite courses, it's an empty array
        const saved = JSON.parse(localStorage.getItem("favourites")) || [];

        // Mapping API data into the structure used throughout the app
        const mappedCourses = data.map((course) => ({
          ...course,
          campus: course.sections?.[0]?.campus || "",
          instructor: course.sections?.[0]?.instructor || "",
          schedule: course.sections?.[0]?.schedule || [],
          time: formatTimeRange(course.sections?.[0]?.startTime, course.sections?.[0]?.endTime),
          isFavourite: saved.includes(course.id),
          room: course.sections?.[0]?.room || "",
          crn: course.sections?.[0]?.crn || "",
          type: course.sections?.[0]?.type || "",
          sectionNumber: course.sections?.[0]?.sectionNumber || "",
        }));

        // This puts the data into state
        setCourses(mappedCourses);

        // Once we are done loading
        setLoadStatus('ok');
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }

        console.error("Failed to load courses:", error);
        setLoadStatus('error');
      });

    // Cancel the request if the component unmounts
    return () => controller.abort();

  }, []); // An empty array = only runs once in useEffect

  // Adding toggleFavourite to toggle a course in/out of favourites
  // and save to localStorage
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

      // Only keeping the IDs of favourite courses
      const favouriteIds = updated
        .filter((course) => course.isFavourite)
        .map((course) => course.id);

      // Save favourite IDs to localStorage
      localStorage.setItem("favourites", JSON.stringify(favouriteIds));

      return updated;
    });
  };

  // Showing a loading message while the API is being fetched
  // p-6 means 24px
  if (loadStatus === 'loading') {
    return <p className="p-6">Loading Courses...</p>;
  }

  // Showing an error message if the API request fails
  if (loadStatus === 'error') {
    return <p className="p-6">Could not load courses.</p>;
  }

  return (
    <>
      <Navbar />

      <main className="p-6">
        <Routes>
          <Route
            path="/"
            element={
              <CoursesPage
                courses={courses}
                onToggleFavourite={toggleFavourite}
              />
            }
          />

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

          <Route
            path="/timetable"
            element={<TimetablePage courses={courses} />}
          />

          {/* Reviews page */}
          <Route
            path="/reviews/:id"
            element={<ReviewPage courses={courses} />}
          />
        </Routes>
      </main>
    </>
  );
}


import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// Import the navigation bar
import Navbar from './components/Navbar.jsx';

// Import the three pages
import CoursesPage from './pages/CoursesPage.jsx';
import SavedPage from './pages/SavedPage.jsx';
import TimetablePage from './pages/TimetablePage.jsx';

// Import the original course data
import initialCourses from './data/courses.js';

export default function App() {

  // Store all courses in React state
  const [courses, setCourses] = useState(initialCourses);

  // Function to add or remove a course from favourites
  const toggleFavourite = (id) => {

    setCourses((previousCourses) =>
      previousCourses.map((course) =>

        // Find the course that was clicked
        course.id === id

          // Change its favourite status
          ? { ...course, isFavourite: !course.isFavourite }

          // Leave all other courses unchanged
          : course
      )
    );
  };

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

        </Routes>

      </main>
    </>
  );
}

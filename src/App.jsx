
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

// Import the original course data
import initialCourses from './data/courses.js';

export default function App() {

  // Store all courses in React state
  const [courses, setCourses] = useState(initialCourses);

  // useEffect runs this when the component loads
  useEffect(() => {
  // Gets the favourite course ids from localStorage
  // If there are no favourite courses its an empty array
  const saved = JSON.parse(localStorage.getItem("favourites")) || [];
  
  // Goes through the course list and checks if the course id is in the saved list
  setCourses(prevCourses => prevCourses.map(course => saved.includes(course.id)
  // If the course id is in the saved list then return the course object with the isFavourite changed to true
  // Or else return the course object with the isFavourite changed to false
        ? { ...course, isFavourite: true }
        : { ...course, isFavourite: false }
    )
  );
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

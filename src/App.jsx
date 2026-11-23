
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import CoursesPage from './pages/CoursesPage.jsx';
import SavedPage from './pages/SavedPage.jsx';
import TimetablePage from './pages/TimetablePage.jsx';
import ReviewPage from "./pages/ReviewPage.jsx";
import CourseDetailPage from './pages/CourseDetailPage.jsx';

export default function App() {

  // Storing the list of courses that comes from the API
  const [courses, setCourses] = useState([]);

  //Tracking whether we are still waiting for the API response
  const [loading, setLoading] = useState(true);

  // useEffect runs this when the component loads
  useEffect(() => {

    // Calling our Cloud Function API
    fetch("https://us-central1-classcatalogue.cloudfunctions.net/api/courses")
    .then((res) => res.json())   // This is turning the response into JSON
    .then((data) => {
      // Getting any previously saved favourite course IDS from localStorage
      const saved = JSON.parse(localStorage.getItem("favourites")) || [];

      // Adding an isFavourite flag to every course
      const withFavourites = data.map((course) => ({...course,
        isFavourite: saved.includes(course.id), 
      }));
      
      // This puts the data into state
      setCourses(withFavourites); 

      // Once we are done loading
      setLoading(false);
    })
    .catch((err) => {
      console.error("Failed to load courses:", err);
      setLoading(false);
    });
  }, []);  //An empty array = only runs once in useEffect

  // Adding toggleFavourite to toggle a course in/out of favourites 
  //and save to localStorage
  const toggleFavourite = (id) => {
    setCourses((previousCourses) => {
      const updated = previousCourses.map((course) => course.id === id
    ? {...course, isFavourite: !course.isFavourite} : course
    );

    // Only keeping the IDs of favourite courses
    const favouriteIds = updated
      .filter((c) => c.isFavourite)
      .map((c) => c.id);

    localStorage.setItem("favourites", JSON.stringify(favouriteIds));

    return updated;
    });
  };

  // Showing an loading message while the API is being fetched
  //p-6 means 24px
  if(loading){
    return <p className="p-6">Loading Courses...</p>;
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
            path="/courses/:slug"
            element={
              <CourseDetailPage
                courses={courses}
                onToggleFavourite={toggleFavourite}
              />
            }
          />
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
          <Route
            path="/reviews/:id"
            element={<ReviewPage courses={courses} />}
          />
        </Routes>
      </main>
    </>
  );
}
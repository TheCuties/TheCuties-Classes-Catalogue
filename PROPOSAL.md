# CSCI 3230U — Milestone 1: Project Proposal 
# `Course Catalogue` 
### Prepared by: Vincenzo, Jessica, Anisha, Jann, Mina 



## 1. Project Overview

The Course Catalogue is a web page that allows Ontario Tech students to browse courses. It provides a modern and visually appealing way to explore courses. Students can search for courses, filter and sort, as well as view detailed descriptions such as prerequisites and offered times. The app also allows students to save favourite courses, read and submit reviews, and build a semester plan with everything organized in one place. Course Catalogue improves accessibility and usability, helping students plan and explore their options before enrolment.



## 2. Team Roles and Responsibilities

| Member | Title |  Responsibilities
|---|---|---|
| Vincenzo Langone 100985079 | Project Manager | Directs the project and organizes meetings. Ensures milestone deadlines are met and manages the project board
| Jann Denzell Romero 100909505 | Documentation Lead | Writes and maintains documentation 
| Jessica Arruda 100923345 | Front-end Lead | Designs and implements UI and builds responsive layouts and styles
| Anisha Penikalapati 100971909 | Back-end Lead | Ensures the backend supports the frontend
| Mina Yang 100654767 | Quality Assurance Lead | Tests features, checks accessibility, and verifies the quality of the app



## 3. Scaled Feature Plan

- **Course List page** → Loads courses from the database and displays them as cards
- **Search** → Search courses by course name or course code
- **Filter courses** → Filter courses by faculty, year, or program
- **Sort courses** → Sort courses alphabetically or by course code
- **Detail Page** → Shows more details for each course, such as prerequisites and availability
- **Favourite Courses** → Stores favourite courses in local storage
- **Rating/Review Form** → Submit a course review or rating 
- **Multiple Routes** → Different routes include pages for course list, course details, and favourites

| Member | Vertical Slice | Responsibilities
|---|---|
| Vincenzo Langone 100985079 | Course discovery | Search - by course name or course code
Filtering - by many metrics including but not limited to faculty, year, elective status, etc.
Sorting - either alphabetically, by course level, or by class availability
Database/API - setting up a Firebase database using Firebase Cloud Functions as API endpoints 
| Jann Denzell Romero 100909505 | Course information | Course detail page: prerequisites, availability, and linking labs and tutors, building location |
| Jessica Arruda 100923345 | Front-End | Visual styling - responsive layouts, making the web page more welcoming, logo, colourful 
Maps - including estimation, locations of campus, visual maps, list of transportation 

| Anisha Penikalapati 100971909 | User Customizator | Course Reviews - Rating/review submission and displaying reviews
Course Recommendations - Recommending courses based on courses they have taken
Favourite Courses - Working with the backend logic to save favourite courses in a database 

| Mina Yang 100654767 | Course Planner | Timetable - table displaying the full schedule. With colour coded blocks for the same courses.
Add/Remove Courses - responsible for putting the course blocks into the timetable and removing them later.
Handle Time Conflicts - checks for time conflicts and raises flags for the user to fix.
Handle Missing Links - Ensures that all required sections for courses are part of the table. If missing, raise a flag for the user to fix. (Might not be necessary depending on how we implement adding).




## 4. Data Source

For our data source, we will be using our own course database, served by a simple REST API, through which our app will fetch its data, with a React frontend consuming it as a client. 
### Example data

```json
{
  "course code": "CSCI3089",
  "course name": "Networks",
  "instructor": "William Brown",
  "semester": "Fall",
  "description": "This course explores the key concepts of networks within the field of science.",
  "room number": "D374",
  "meeting days": "Mon/Wed",
  "meeting time": "12:00 PM - 01:30 PM",
  "prerequisite courses": "CSCI1138",
  "enrollment_limit": 50,
  "faculty": "Science",
  "credits": 3,
  "year": 2026
}

```
### Initial Planned Endpoints
- ```GET /courses```: Retrieves a list of all courses.
- ```GET /courses/{course_code}```: Fetches the complete, detailed payload for a single class.
- ```GET /courses/sublist?l={[course_codes_arr]}```: Fetches a specified list of courses (eg. those set as "favourites" in local storage)
- ```GET /courses/search?c={course_code}```: Retrieves a list of all courses that match the query parameter in the course code.
- ```GET /courses/search?n={course_name}```: Retrieves a list of all courses that match the query parameter in the name.
- ```GET /courses/search?q={query}```: Retrieves a list of all courses that match the query parameter in the course code or in the name.

## 5. Comparators
- **Ontario Tech Look Up Courses to Add:**
	- Ontario Tech’s Look Up Courses to Add Browser allows students to view courses, filter options, and plan their schedules. However, it is mainly designed for registration purposes rather than for learning about and exploring different courses. With courses, descriptions, favourites, and reviews arranged, our app is more visually appealing and student-friendly. It is more accessible and makes planning and course exploration simpler.

- **Toronto Metropolitan University (TMU) Browse Course Catalogue:**
	- TMU’s course browsing system has a cleaner and more modern interface compared to Ontario Tech’s browsing system. The UI is more visually appealing as it follows TMU’s school colours and feels more welcoming than the grey theme used at Ontario Tech. TMU’s course browsing also has the ability to switch between different sections of a course without removing it from the schedule completely, whereas at Ontario Tech, students have to remove and re-add sections. 
	- Although TMU has a polished UI, it is still mainly designed for registration. Students can view different courses and sections, but they can’t favourite courses, compare them, or read and write reviews for courses. Our app is designed to help students explore courses with features such as favourites, detailed descriptions, and reviews, with a more accessible and responsive layout.

- **Concordia University:**
	- Concordia’s course browsing system displays a detailed schedule of courses, including timings, prerequisites, and campus locations. The schedule and the whole interface are colour-coded so it is easy to visualize. However, students aren’t able to favourite courses and compare them. They also can’t read reviews from other students before deciding on a course. 
	- Our app focuses on helping students explore courses by providing visual course cards with detailed descriptions, reviews, and the ability to favourite courses. Our app will help students explore, compare, and plan courses in a more accessible and responsive way. 

## 6. Wireframes
![](https://raw.githubusercontent.com/TheCuties/TheCuties-Classes-Catalogue/refs/heads/main/sketches/catalogue.png)
![](https://raw.githubusercontent.com/TheCuties/TheCuties-Classes-Catalogue/refs/heads/main/sketches/detail.png)
![](https://raw.githubusercontent.com/TheCuties/TheCuties-Classes-Catalogue/refs/heads/main/sketches/saved.png)

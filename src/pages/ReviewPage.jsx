import { useParams } from "react-router-dom" 
import { useState } from 'react';

function ReviewPage({courses}) {

	// Get the course id form the url
	let { id } = useParams();
	id = Number(id);
	let courseReview;

	// Find the matching course based on the id
	for(let course of courses) {
		if(course.id == id){
			courseReview = course;
		}
	}

	// Load reviews from localStorage if there are any
	const [reviews, setReviews] = useState(() => {
		const saved = localStorage.getItem(`reviews-course-${id}`);
		return saved ? JSON.parse(saved) : [];
	});

    // State for the new review text input
	const [newReview, setNewReview] = useState("");
	// State for the rating stars with default of 5
	const [newStars, setNewStars] = useState(5);

	// Add a review to the list and store to localStorage
	function addReview() {
		// Don't add the review if the input is empty
		if (newReview.trim() === ""){
			return;
		} 

		// Creates a new review object
		const newReviewObj = {
			text: newReview,
			date: new Date().toLocaleDateString(),
			stars: newStars, 
			name: "Anonymous"
		};

		 // Add the new review to the existing list
		const updatedReviews = [...reviews, newReviewObj];
    	setReviews(updatedReviews);

		// Save updated reviews to localStorage
		localStorage.setItem(`reviews-course-${id}`, JSON.stringify(updatedReviews));
		// Reset the input box
  		setNewReview("");
	}

	return (
  	<div className="max-w-5xl mx-auto p-6">

    {/* Page Title */}
    <h1 className="text-3xl font-bold mb-6">{courseReview.name}</h1>
    <p className="text-base-content/70 mb-10">{courseReview.code}</p>

    {/* TWO COLUMN LAYOUT */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* LEFT COLUMN FOR COURSE DETAILS AND WRITE A REVIEW*/}
      <div className="space-y-10">

        {/* Course Details */}
        <div className="bg-white border border-base-300 p-6 rounded-xl shadow-sm w-full">
          <p className="text-base-content/80 mb-2">
            <span className="font-semibold">Instructor:</span> {courseReview.instructor}
          </p>
          <p className="text-base-content/70 mt-4">{courseReview.description}</p>
        </div>
        
		{/* Write a Review */}
		{/* Header */}
        <div className="bg-white border border-base-300 p-6 rounded-xl shadow-sm w-full">
          <h2 className="text-lg font-semibold mb-3">Write a Review</h2>
		{/* Text Area to write review*/}
          <textarea
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Write a review..."
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
		     {/* Drop down to select star rating*/}
			<select
				className="select select-bordered w-full mb-4"
				value={newStars}
				onChange={(e) => setNewStars(Number(e.target.value))}
				>
				<option value={5}>★★★★★</option>
				<option value={4}>★★★★</option>
				<option value={3}>★★★</option>
				<option value={2}>★★</option>
				<option value={1}>★</option>
			</select>

		{/* Add a review Button*/}
          <button
            className="btn btn-primary btn-sm w-full hover:scale-105 transition-transform"
            onClick={addReview}
          >
            Add Review
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN TO VIEW REVIEWS */}
	  {/* Header*/}
      <div className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-4">What Students Say</h2>
		
		{/* If there are no reviews, it says no reviews yet, else it dispalys reviews*/}
        {reviews.length === 0 ? (
          <p className="text-base-content/60">No reviews yet.</p>) : (  
          <div className="space-y-6">
            {reviews.map((review, index) => (
            <div
				key={index}
				className="bg-white border border-base-300 p-6 rounded-xl shadow-sm"
				>
				{/*Write the student name and the stars they give for the course*/}
				<div className="flex items-center justify-between mb-2">
					<span className="font-semibold text-base-content">{review.name}</span>
					<span className="text-yellow-500">
					{"★".repeat(review.stars)}
					</span>
				</div>
				{/*Write the date*/}
				<p className="text-base-content/70 text-sm mb-2">{review.date}</p>

				{/*Add the student review to the rating card*/}
				<p className="text-base-content font-medium mb-1">Student Review</p>
				<p className="text-base-content">{review.text}</p>
				</div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
}


// Export the page so App.jsx can use it
export default ReviewPage;
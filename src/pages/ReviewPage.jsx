import { useParams } from "react-router-dom" 
import { useState } from 'react';

function ReviewPage({courses}) {
	let reviewsList;
	let currentInput;
	const [reviews, setReviews] = useState([]);
	const [newReview, setNewReview] = useState("");
	let { id } = useParams();
	id = Number(id);
	let courseReview;
	for(let course of courses) {
		if(course.id == id){
			courseReview = course;
		}
	}

	function addReview() {
		// Don't add the review if the input is empty
		if (newReview.trim() === ""){
			return;
		} 
		// Else add the new review and reset the input box
		setReviews([...reviews, newReview]);
  		setNewReview("");
	}
	return (
		<div>
			{/* Page heading */}
			<h1 className="text-2xl font-semibold mb-6">
				Reviews for {courseReview.name}
			</h1>
			<textarea
				className="textarea textarea-bordered w-full mb-4"
				placeholder="Write your review..."
				value={newReview}
				onChange={(e) => setNewReview(e.target.value)}
			/>
		</div>
	)
}


// Export the page so App.jsx can use it
export default ReviewPage;
import { useParams } from "react-router-dom"  // lets you read the URL
import { useState } from 'react';  // lets you store and update data inside the component

function ReviewPage({ courses }) {

	// Get the course id form the url
	let { id } = useParams();
	id = Number(id);
	let courseReview;

	// Find the matching course based on the id
	for (let course of courses) {
		if (course.id === id) {
			courseReview = course;
		}
	}

	if (!courseReview) {
		return <h1>Course not found.</h1>;
	}

	// Load reviews from localStorage if there are any based on the id
	const [reviews, setReviews] = useState(() => {
		const saved = localStorage.getItem(`reviews-course-${id}`);
		return saved ? JSON.parse(saved) : [];
	});

	// State for the new review text input (stores text the user types)
	const [newReview, setNewReview] = useState("");
	// State for the rating stars with default of 0 filled stars (stores the rating from the selected stars)
	const [newStars, setNewStars] = useState(0);

	// Calculating the average rating
	const reviewCount = reviews.length;
	let averageRating = 0;
	if (reviewCount > 0) {
		averageRating = reviews.reduce((acc, ratings) => acc += ratings.stars, 0) / reviewCount;
	}

	// counting how many people gave 1,2,3,4, and 5 stars
	const starCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
	reviews.forEach(review => {
		starCounts[review.stars] += 1;
	});

	// Calculating percentages of star counts to create bars
	// AI-assisted - see AI-USAGE.md #1
	let fiveStarPercent = 0;
	let fourStarPercent = 0;
	let threeStarPercent = 0;
	let twoStarPercent = 0;
	let oneStarPercent = 0;

	if (reviewCount > 0) {
		oneStarPercent = (starCounts[1] / reviewCount) * 100;
		twoStarPercent = (starCounts[2] / reviewCount) * 100;
		threeStarPercent = (starCounts[3] / reviewCount) * 100;
		fourStarPercent = (starCounts[4] / reviewCount) * 100;
		fiveStarPercent = (starCounts[5] / reviewCount) * 100;
	}

	// full stars
	const fullStars = Math.floor(averageRating);
	// half stars are used for anything above or equal to 0.5 as a remainder
	let halfStars = false;
		if(averageRating - fullStars >= 0.5){
		halfStars = true;
	}
	// empty stars is anything remaining 
	const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);


	// tags to select from
	const tags = [
		"Useful Content",
		"Good Projects",
		"Recommend",
		"Practical Skills",
		"Interesting Topics",
		"Heavy Workload"
	];

	// State for the tags (stores the selected tags)
	const [selectedTags, setSelectedTags] = useState([]);

	// Function to add or remove a tag
	const toggleTag = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	}

	// State for the warning message if text area of stars are empty
	const [errorMessage, setErrorMessage] = useState("");

	// Add a review to the list and store to localStorage
	function addReview() {
		// Don't add the review if the input is empty or if stars aren't selected and set error message
		if (newReview.trim() === "" && newStars === 0) {
			setErrorMessage("Please write a review and select a rating");
			return;
		}
		if (newReview.trim() === "") {
			setErrorMessage("Please write a review");
			return;
		}
		if (newStars === 0) {
			setErrorMessage("Please select a rating");
			return;
		}

		// Creates a new review object
		const newReviewObj = {
			id: Date.now(),
			text: newReview,
			date: new Date().toLocaleDateString(),
			stars: newStars,
			tags: selectedTags,
			name: "Anonymous"
		};

		// Add the new review to the existing list
		const updatedReviews = [...reviews, newReviewObj];
		setReviews(updatedReviews);

		// Save updated reviews to localStorage
		localStorage.setItem(`reviews-course-${id}`, JSON.stringify(updatedReviews));
		// Reset the input box, error message, selected stars, and tags
		setNewReview("");
		setErrorMessage("");
		setSelectedTags([]);
		setNewStars(0);
	}

	return (
		
		<div className="max-w-6xl mx-auto p-8">

			{/* Header Card */}
			{ /*AI-assisted - see AI-USAGE.md #2*/ }
			<div className="bg-white border border-base-300 rounded-xl shadow-sm p-8 mb-8">
				<h1 className="text-3xl font-bold mb-6">
					{courseReview.code} - {courseReview.name}
				</h1>

				<p className="text-lg text-base-content/70">
					{courseReview.description}
				</p>
			</div>

			<div className="space-y-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

					{/* Course Details */}
					<div className="bg-white border border-base-300 p-6 rounded-xl shadow-sm w-full">
						<h2 className="text-2xl font-semibold mb-8">
							Course Details
						</h2>
						<p className="text-base-content/80 mb-6">
							<span className="font-semibold">Instructor:</span> {courseReview.instructor}
						</p>
						<p className="text-base-content/80 mb-6">
							<span className="font-semibold">Campus:</span> {courseReview.campus }
						</p>
						<p className="text-base-content/80 mb-6">
							<span className="font-semibold">Schedule:</span> {courseReview.schedule[0]}, {courseReview.schedule[1]}
						</p>
						<p className="text-base-content/80 mb-6">
							<span className="font-semibold">Time:</span> {courseReview.time}
						</p>
					</div>

					{/* Course Rating */}
					<div className="bg-white border border-base-300 p-6 rounded-xl shadow-sm w-full">
						<h2 className="text-2xl font-semibold mb-3">
							Course Rating
						</h2>
						{/* Course Average Rating */}
						<p className="text-5xl font-bold text-center mb-2">{averageRating.toFixed(1)}</p>
						<p className="text-center text-yellow-500 text-3xl my-2">
							{"★".repeat(fullStars)}{"⯪".repeat(halfStars)}{"☆".repeat(emptyStars)}
						
						</p>
						<p className="text-center text-sm text-base-content/70">
							Based on {reviewCount} review{reviewCount == 1 ? '' : 's'}
						</p>
						{/* Showing the distribution bars */}
						<div className="mt-6 space-y-2">
							<div className="flex items-center flex-col gap-2 ">
								<div className="flex items-center gap-3">
									5★
									<progress className="progress progress-primary w-56" value={fiveStarPercent} max="100" /> {starCounts[5]}
								</div>
								<div className="flex items-center gap-3">
									4★
									<progress className="progress progress-primary w-56" value={fourStarPercent} max="100" /> {starCounts[4]}
								</div>
								<div className="flex items-center gap-3">
									3★
									<progress className="progress progress-primary w-56" value={threeStarPercent} max="100" /> {starCounts[3]}
								</div>
								<div className="flex items-center gap-3">
									2★
									<progress className="progress progress-primary w-56" value={twoStarPercent} max="100" /> {starCounts[2]}
								</div>
								<div className="flex items-center gap-3">
									1★
									<progress className="progress progress-primary w-56" value={oneStarPercent} max="100" /> {starCounts[1]}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Write a Review */}
				{/* Header */}
				<div className="bg-white border border-base-300 p-8 rounded-xl shadow-sm w-full">
					<h2 className="text-2xl font-semibold mb-3">Write a Review</h2>
					<h3 className="font-semibold mb-3">
						Rate This Course
					</h3>
					{/* Clicking star buttons for rating */}
					<div className="flex justify-center gap-2 my-4">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								aria-label= {`${star} out of 5 stars`}
								key={star}
								onClick={() => setNewStars(star)}
								className="btn btn-ghost btn-xsm text-4xl text-amber-400">
								{star <= newStars ? "★" : "☆"}
							</button>
						))}
					</div>
					{/* Shows tags to select */}
					<h3 className="font-semibold mt-6 mb-3">
						Select Tags
					</h3>
					<div className="flex flex-wrap gap-3">
						{tags.map((tag) => (
							<button
								aria-label={tag}
								key={tag}
								className={
									selectedTags.includes(tag)
										? "badge badge-primary badge-lg"
										: "badge badge-outline badge-lg"
								}
								onClick={() => {
									toggleTag(tag);
								}}>
								{tag}
							</button>
						))}
					</div>

					{/* Text Area to write review*/}

					<h3 className="font-semibold mt-6 mb-3">
						Write Your Review
					</h3>
					<textarea
						className="textarea textarea-bordered w-full mb-4"
						placeholder="Write a review..."
						value={newReview}
						// updates text on change
						onChange={(e) => setNewReview(e.target.value)}
					/>

					{/* Shows error message if text area is empty or stars are not selected when submitting review*/}
					{errorMessage !== "" ? (
						<div role="alert" className="alert alert-warning mb-4">
							<span>{errorMessage}</span>
						</div>
					) : null}

					{/* Add a review Button*/}
					<button
						className="btn btn-primary btn-md w-full hover:scale-105 transition-transform"
						onClick={addReview}
					>
						Add Review
					</button>
				</div>
			</div>

			{/* VIEW REVIEWS */}
			{/* Header*/}
			<div className="md:col-span-2">
				<h2 className="text-2xl font-semibold mt-8 mb-6">What Students Say</h2>

				{/* If there are no reviews, it says no reviews yet, else it dispalys reviews*/}
				{reviews.length === 0 ? (
					<p className="text-base-content/60">No reviews yet.</p>) : (
					<div className="space-y-6">
						{reviews.map((review) => (
							<div
								// unique key for each review
								key={review.id}
								className="bg-white border border-base-300 p-8 rounded-xl shadow-sm w-full"
							>
								{/*Add the student name and the stars they give for the course to the rating card*/}
								<div className="flex items-center justify-between mb-2">
									<span className="font-semibold text-base-content">{review.name}</span>
									<span className="text-3xl text-yellow-500">
										{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
									</span>
								</div>
								{/*Add the date to the rating card*/}
								<p className="text-base-content/70 text-sm mb-2">{review.date}</p>

								{/*Add the student review to the rating card*/}

								<div className="flex flex-wrap gap-2 my-3">
									<p className="text-base-content text-lg mt-2 break-all">{review.text}</p>
								</div>

								{/*Add the chosen tags to the rating card*/}
								<div className="flex flex-wrap gap-2 my-3">
									{review.tags.map((tag, index) => (
										<p key={`${review.id}-${tag}`} className="badge badge-primary">{tag}</p>

									))}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);

}

// Export the page so App.jsx can use it
export default ReviewPage;

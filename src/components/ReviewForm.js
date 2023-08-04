import React, { useState } from "react";
import StarRating from "./StarRating";
import "./ReviewForm.css";

const ReviewForm = ({ onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      rating,
      comment,
    };
    onReviewSubmit(newReview);
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="review-sub-heading">Rating:</label>
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
      </div>
      <div>
        <label>Comment:</label>
        <textarea value={comment} onChange={handleCommentChange} />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;

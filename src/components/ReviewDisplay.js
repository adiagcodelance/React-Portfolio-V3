import React from "react";

const ReviewDisplay = ({ reviews }) => {
  return (
    <div>
      <h2>Reviews:</h2>
      {reviews.map((review, index) => (
        <div key={index}>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ReviewDisplay;

import { useState } from "react";
import data from "../public/reviews.json";
import moment from "moment";
import "./Review.css"; 
import "./App.css"; 

function Review() {
  const [reviews, setReviews] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const [sortedReviews, setSortedReviews] = useState(reviews);

  const firstIndex = 0;
  const lastIndex = currentPage * reviewsPerPage;
  const currentReviews = reviews.slice(firstIndex, lastIndex);

  const showMoreReviews = () => {
    setCurrentPage(currentPage + 1);
  };

  const sortByDatePublishedNewest = () => {
    const sorted = [...reviews].sort((a, b) => {
      const dateA = moment(a.SUBMISSION_DATE);
      const dateB = moment(b.SUBMISSION_DATE);
      return dateB - dateA;
    });
    setReviews(sorted);
  };

  const sortByHighestRating = () => {
    const sorted = [...reviews].sort((a, b) => b.RATING - a.RATING);
    setReviews(sorted);
  };

  const sortByLowestRating = () => {
    const sorted = [...reviews].sort((a, b) => a.RATING - b.RATING);
    setReviews(sorted);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    if (value === "dateNewest") {
      sortByDatePublishedNewest();
    } else if (value === "highestRating") {
      sortByHighestRating();
    } else if (value === "lowestRating") {
      sortByLowestRating();
    }
  };

  return (
    <div id="root">
      <h1> THE GOOD GUYS </h1>
      <h2> Customer Reviews </h2>
      <select onChange={handleSortChange}>
        <option value="dateNewest">Sort by Date (Newest)</option>
        <option value="highestRating">Sort by Rating (Highest)</option>
        <option value="lowestRating">Sort by Rating (Lowest)</option>
      </select>
      <div className="reviews-container">
        {currentReviews.map((review) => {
          return (
            <div key={review.REVIEW_ID} className="review">
              {review.CUSTOMER_NAME !="" && <p>Review by {review.CUSTOMER_NAME}</p>}
              {review.REVIEW_TITLE !="" && <h3>{review.REVIEW_TITLE} </h3>}
              {review.RATING !=null && <p>{review.RATING} Star</p>}
              {review.REVIEW_TEXT !== "" && <p>"{review.REVIEW_TEXT}"</p>}
            </div>
          );
        })}
      </div>
      {reviews.length > lastIndex && (
        <button onClick={showMoreReviews}>Show More</button>
      )}
    </div>
  );
}

export default Review;

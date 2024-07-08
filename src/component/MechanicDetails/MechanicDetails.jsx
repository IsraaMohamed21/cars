import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Style.css"; // Import external CSS file for styling

export default function MechanicDetails() {
  const { mechanicid } = useParams(); // Extract mechanicid from URL params
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [mechRating, setMechRating] = useState({ averageRating: 0, totalRatings: 0 });
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [mechanicImage, setMechanicImage] = useState(null);

  // Define handleSubmitRate within the component
  async function handleSubmitRate() {
    try {
      const response = await axios.post(`http://localhost:5000/api/submitMechanicRate`, {
        rate: selectedStars,
        review: reviewText,
        mechanicid: mechanicid, // Pass mechanicid from URL to API call
      });
      setSubmissionMessage("Rating submitted successfully!"); // Set submission message

      setTimeout(() => {
        setSubmissionMessage(""); // Clear submission message after 5 seconds
      }, 5000);
    } catch (err) {
      console.error("Error submitting rate and review:", err);
      setSubmissionMessage("Error submitting rating"); // Set error message
    }
  }

  useEffect(() => {
    async function fetchMechanic() {
      try {
        const response = await axios.get(`http://localhost:5000/api/searchMechanic/${mechanicid}`);
        const mechanicData = response.data.mechanic[0];
        setMechanic(mechanicData);
        setLoading(false);

        if (mechanicData.image) {
          try {
            const imageModule = await import(`./${mechanicData.image}`);
            setMechanicImage(imageModule.default);
          } catch (error) {
            console.error("Error loading image:", error);
          }
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    async function fetchReviews() {
      try {
        const response = await axios.get(`http://localhost:5000/api/getRate/${mechanicid}`);
        setReviews(response.data.reviews || []);  
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }

    async function fetchMechanicRating() {
      try {
        const response = await axios.get(`http://localhost:5000/api/searchMechanicRate/${mechanicid}`);
        setMechRating(response.data); // Expecting an object with averageRating and totalRatings
      } catch (err) {
        console.error("Error fetching mechanic rating:", err);
      }
    }

    fetchMechanic();
    fetchReviews();
    fetchMechanicRating();

    return () => {
      // Cleanup logic here (if any)
    };
  }, [mechanicid]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!mechanic) return <p className="error">No mechanic found</p>;

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
  };

  return (
    <>
      <div className="mechanic-container222">
        <div className="mechanic-details222">
          <h1>{mechanic.name}</h1>
          <p>City: {mechanic.city}</p>
          <p>Area: {mechanic.area}</p>
          <p>Phone: {mechanic.phone}</p>
          <p>Average Rating: {mechRating.averageRating} ({mechRating.totalRatings} reviews)</p>
          <p>Rate here</p>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= selectedStars ? "star selected" : "star"}
                onClick={() => handleStarClick(star)}
              >
                ★
              </span>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitRate();
            }}
          >
            <br />
            <input
              type="text"
              className="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              name="review"
              id="review"
              placeholder="Write your review"
              required
            />
            <br />
            <button type="submit" className="out-btn next submitrate">Submit</button>
          </form>
          {submissionMessage && (
            <p className="submission-message success">{submissionMessage}</p>
          )}
        </div>
        {mechanicImage && (
          <img className="img1222" src={mechanicImage} alt="Mechanic" />
        )}
      </div>
      <div className="reviews-container">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-container">
              <div className="review-text">{review.review}</div>
              <div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </>
  );
}

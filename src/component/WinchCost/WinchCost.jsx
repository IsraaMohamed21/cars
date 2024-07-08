import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WinchCost() {
  const [selectedWinch, setSelectedWinch] = useState(null);
  const [winchCosts, setWinchCosts] = useState({ regular: null, european: null, cost: null, cost2: null });
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token"); // Get the token from the URL query parameter
  console.log(token);

  // Fetch winch costs from the API
  useEffect(() => {
    // Include the token in the request
    axios.post("http://localhost:5000/api/getCost", { token: token })
      .then((res) => {
        setWinchCosts({ ...res.data, cost: res.data.cost, cost2: res.data.cost2 });
      })
      .catch((err) => {
        console.error("Error fetching winch costs:", err);
      });
  }, [token]); // Add token as a dependency

  const handleWinchSelection = (winchType) => {
    setSelectedWinch(winchType);
  };

  const handleSubmit = () => {
    if (selectedWinch && (selectedWinch === 'regular' || selectedWinch === 'european')) {
      const winchType = selectedWinch;
      let cost = null;
      if (winchType === 'regular') {
        cost = winchCosts.cost;
      } else if (winchType === 'european') {
        cost = winchCosts.cost2;
      }

      if (cost !== null) {
        axios
          .post(`http://localhost:5000/api/submitCost`, { cost, winchType, token })
          .then((res) => {
            if (res) {
              navigate("/");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.error('Cost is null.');
      }
    } else {
      console.error('Invalid winch type:', selectedWinch);
    }
  };

  return (
    <>
      <Link style={{ color: "black", paddingLeft: "1400px" }} to="/winch">
        <i className="fa-sharp fa-solid fa-arrow-right"></i>
      </Link>
      <div className="container">
        <div className="Cost p-5">
          <h4>Choose Winch Type</h4>
          <h6>
            Choosing the type of winch depends on the type of car that needs to be transported.
          </h6>
          <div
            className={`winch-type ${selectedWinch === "regular" ? "selected" : ""}`}
            onClick={() => handleWinchSelection("regular")}
          >
            <h5>A regular winch.</h5>
            {/* Display cost and cost2 for regular winch */}
            <h5> {winchCosts.cost !== null ? `EGP${winchCosts.cost}` : "Loading..."}</h5>
          </div>
          <div
            className={`winch-type ${selectedWinch === "european" ? "selected" : ""}`}
            onClick={() => handleWinchSelection("european")}
          >
            <h5>An European winch.</h5>
            {/* Display cost and cost2 for European winch */}
            <h5>{winchCosts.cost2 !== null ? `EGP${winchCosts.cost2}` : "Loading..."}</h5>
          </div>
          <Link
            to=""
            style={{ textDecoration: "none", color: "white" }}
            onClick={handleSubmit}
          >
            <button type="button" className="out-btn next">
              Verify Request
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

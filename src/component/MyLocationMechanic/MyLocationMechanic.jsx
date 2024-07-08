import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import BasicMap from "../../leaflet/BasicMap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyLocationMechanic() {
  const [position, setPosition] = useState({ latitude: "", longitude: "" });
  const [phone, setPhone] = useState(""); // State for phone number
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    request.setValues({
      ...request.values,
      position: `${position.latitude}, ${position.longitude}`,
      phone: phone,
    });
  }, [position, phone]);

  let request = useFormik({
    initialValues: {
      position: `${position.latitude}, ${position.longitude}`,
      phone: "", // Initialize phone as empty string
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await axios.post("http://localhost:5000/api/submitUserLocation", {
          position: values.position,
          phone: phone, // Include phone number from the phone state
        });
        console.log("Location submitted successfully!");
        setSubmitted(true);
      } catch (error) {
        console.error("Error submitting location:", error);
      }
    },
  });

  if (submitted) {
    navigate(`/maintenance/${phone}`);
  }

  return (
    <div className="container row">
      <div className="col-md-6 map">
        <BasicMap position={position}></BasicMap>
      </div>
      <div className="col-md-6 request-form">
        <h4
          style={{
            color: "#003F66",
            paddingBottom: "40px",
          }}
        >
          Your Fast Lane to Reliable Car Repairs!
        </h4>
        <form className="mylocation" onSubmit={request.handleSubmit}>
          <input
            type="text"
            id="position"
            name="position"
            required
            placeholder="Current Location"
            value={request.values.position}
            readOnly // Make it read-only since it's set programmatically
          />
          <br />
          <input
            type="text"
            id="phone" // Use a unique id for the phone input
            name="phone"
            required
            placeholder="Phone Number"
            value={phone} // Bind value to phone state
            onChange={(e) => setPhone(e.target.value)} // Update phone state on change
          />
          <br />
          <br />
          <button type="submit" className="out-btn next">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyLocationMechanic;

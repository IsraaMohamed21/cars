import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import BasicMap from "../../leaflet/BasicMap";
import { useNavigate } from "react-router-dom";

function MyLocation() {
  const [position, setPosition] = useState({ latitude: "", longitude: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const [options, setOptions] = useState([
     { name: "H&M car services", coordinates: "29.96266,31.30726,4.5,1220001613" },
    { name: "Ahmed Ramadan maintenance center", coordinates: "29.96266,31.30726,4.5,1220001613" },
    { name: "Masters Car Service", coordinates: "29.99395,31.30806" },
     { name: "Al Tawakkil Center for Car Maintenance", coordinates: "30.05145,31.36542" },
     { name: "Etman car services", coordinates: "31.20693,29.99817" },
    { name: "Car fix", coordinates: "31.17078,29.92205" },
     { name: "ElAlamia Egyption", coordinates: "31.25395,29.92132" },
     { name: "AAMC Center", coordinates: "31.42336,29.9832" },
     { name: "petro Auto center", coordinates: "31.13244,29.89067" },
    { name: "Eurobian Egyption center", coordinates: "31.15798,29.89032" },
     { name: "Rpm Egy center", coordinates: "31.13267,29.97807" },
    { name: "Emad fawzy center", coordinates: "31.12323,29.91297" },
    { name: "Tamco Center", coordinates: "31.31234,29.89564" },
    { name: "Auto jameel center", coordinates: "31.12241,29.90669" },
    { name: "Eslam ford center", coordinates: "31.13244,29.96456" },
      { name: "Ahmed Hosni Center", coordinates: "31.15347,29.90567" },
     { name: "Aman Center", coordinates: "31.43353,29.89057" },
     { name: "Car Care Center", coordinates: "31.10172,29.91373" },
     { name: "Hassan Sons", coordinates: "26.54343,31.72122" },
     { name: "Serial Center", coordinates: "26.53232,31.70654" },
    { name: "Unit company", coordinates: "26.51088,31.74243" },
    { name: "Auto Sohag", coordinates: "26.50977,31.70544" },
    { name: "Elsultan center", coordinates: "26.50544,31.70754" },
    { name: "Rpm center", coordinates: "26.53433,31.70766" }
  ]);
  const [selectedOption, setSelectedOption] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setFilteredOptions(options.filter(option => option.name === selectedOption));
  }, [selectedOption, options]);

  const handleFirstListChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      location: "",
      destinationLocation: "", // Corrected field name
      phone: "",
      position: "",
    },
    onSubmit: async (values) => {
      console.log("Formik values:", values); // Add this line to log the values
      try {
        const response = await axios.post("http://localhost:5000/api/submitRequests", {
          position: values.position,
          destinationLocation: values.destinationLocation,
          phone: values.phone,
        }, {
          withCredentials: true // Include credentials in the request
        });
    
        const { token } = response.data; // Assuming your API returns a JSON object with a 'token' field
        console.log("Token:", token); // Log the token
    
        console.log("Location submitted successfully!");
        setSubmitted(true);
        navigate(`/winchcost?token=${token}`);

      } catch (error) {
        console.error("Error submitting location:", error);
      }
    },
  });
  
  useEffect(() => {
    if (position.latitude && position.longitude) {
      formik.setFieldValue('position', `${position.latitude}, ${position.longitude}`);
    }
  }, [position]);

  useEffect(() => {
    if (filteredOptions.length > 0) {
      formik.setFieldValue('destinationLocation', filteredOptions[0].coordinates);
    } else {
      formik.setFieldValue('destinationLocation', '');
    }
  }, [filteredOptions]);

  const dropdownStyle = {
    margin: "10px",
    padding: "5px",
    fontSize: "16px",
    borderRadius: "5px",
    width: "150px",
    textAlign: "center",
  };

  const hiddenDropdownStyle = {
    display: "none",
  };

  return (
    <div className="container row">
      <div className="col-md-6 map">
        <BasicMap position={position}></BasicMap>
      </div>
      <div className="col-md-6 request-form">
        <h4 style={{ color: "#003F66", paddingBottom: "40px" }}>
          Get Moving with Ease: Request a Winch Now!
        </h4>
        <form className="mylocation" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            id="position"
            name="position"
            required
            placeholder="Current Location"
            value={formik.values.position}
            readOnly // Read-only since it's auto-populated
          />
          <br />
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="Your Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <div>
            <label htmlFor="firstDropdown">Choose your Neighborhood:</label>
            <select
              name="destination"
              id="firstDropdown"
              style={dropdownStyle}
              onChange={handleFirstListChange}
            >
              <option value="">-- Select --</option>
              {options.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <select
              name="destinationLocation"
              id="secondDropdown"
              style={hiddenDropdownStyle}
              disabled={!selectedOption} // Disable if no option selected
              value={formik.values.destinationLocation}
              onChange={(e) => formik.setFieldValue('destinationLocation', e.target.value)}
            >
              <option value="">-- Select --</option>
              {filteredOptions.map((option, index) => (
                <option key={index} value={option.coordinates}>
                  {option.coordinates}
                </option>
              ))}
            </select>
          </div>
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

export default MyLocation;

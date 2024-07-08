import React, { useEffect, useState } from "react";

export default function DropdownList({ onChange }) {
  const [options, setOptions] = useState([
    { name: "Al-Sham Center for Modern Car Maintenance", coordinates: "30.04438,31.36359,4.8,1114851520" },
    { name: "Cairo Mokattam Car Maintenance Center", coordinates: "30.00339,31.31794,4.7,0225085588" },
    { name: "Al Mansour car maintenance center", coordinates: "30.03775,31.19586,4.5,1069700237" },
    { name: "H&M car services", coordinates: "29.96266,31.30726,4.5,1220001613" },
    { name: "Ahmed Ramadan maintenance center", coordinates: "29.96266,31.30726,4.5,1220001613" },
  ]);

  const [selectedOption, setSelectedOption] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setFilteredOptions(options.filter(option => option.name === selectedOption));
  }, [selectedOption, options]);

  const handleFirstListChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const dropdownStyle = {
    margin: "10px",
    padding: "5px",
    fontSize: "16px",
    borderRadius: "5px",
    width: "150px",
    textAlign: "center",
  };

  return (
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
      <label htmlFor="secondDropdown">Coordinates:</label>
      <select
        name="destinationLocation"
        id="secondDropdown"
        style={dropdownStyle}
        disabled={!selectedOption} // Disable if no option selected
        value={filteredOptions.length > 0 ? filteredOptions[0].coordinates : ""}
        onChange={onChange}
      >
        <option value="">-- Select --</option>
        {filteredOptions.map((option, index) => (
          <option key={index} value={option.coordinates}>
            {option.coordinates}
          </option>
        ))}
      </select>
    </div>
  );
}

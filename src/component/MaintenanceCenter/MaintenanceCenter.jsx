import React, { useState, useEffect } from "react";
import "../MaintenanceCenters/Index.css";
import { Link } from "react-router-dom";

export default function MaintenanceCenter({ item, distance }) {
  const [mechanicImage, setMechanicImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`./${item.image}`);
        setMechanicImage(imageModule.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    loadImage();
  }, [item.image]);

  return (
    <>
      <div className="col-md-5 col-sm-12 my-5 p-5 my-bg center">
        <Link style={{ color: "#003F66" }} to={"/mechanic-details/" + item.mechanicid}>
          <div className="mec">
            {mechanicImage && (
              <img
                src={mechanicImage} // Use the dynamically imported image
                style={{ width: 150, height: 150, objectFit: "cover" }}
                alt=""
              />
            )}
          </div>
          <div className="mec name">
            <h4>{item.name}</h4>
            <h6 className="location">
              <i className="fa-solid fa-location-dot"></i>
              <span>{item.city}</span>
            </h6>
            <h6 className="location">
              <i className="fa-solid fa-star"></i>
              <span>{item.rating}</span>
            </h6>
            <h6 className="location">
              <i className="fa-solid fa-face-smile-beam"></i>
              <span>{item.sentiment}</span>
            </h6>
            <h6>
              <i className="fa-solid fa-phone"></i>
              <span>{item.phone}</span>
            </h6>
            <h6>
              <i className="fa-solid fa-road"></i>
              <span>{distance} km</span> {/* Display distance */}
            </h6>
          </div>
          <div className="clearfix"></div>
        </Link>
      </div>
    </>
  );
}

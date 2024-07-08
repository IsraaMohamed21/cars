import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Index.css";
import MaintenanceCenter from "../MaintenanceCenter/MaintenanceCenter";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function MaintenanceCenters() {
  const [mechanics, setMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  async function getMechanicFromApi(phoneNumber) {
    try {
      let response = await axios.get("http://localhost:5000/api/searchMechanics");
      let data = response.data;

      if (data && Array.isArray(data.mechanic)) {
        let sortedMechanics = data.mechanic.sort((a, b) => {
          if (a.sentiment === "positive" && b.sentiment !== "positive") {
            return -1;
          } else if (a.sentiment !== "positive" && b.sentiment === "positive") {
            return 1;
          }
          return 0;
        });

        setMechanics(sortedMechanics);
        postToGetDistance(sortedMechanics, phoneNumber);
      } else {
        console.error("API response does not contain a valid mechanic array:", data);
      }
    } catch (error) {
      console.error("Error fetching mechanic data:", error);
    }
    setLoading(false);
  }

  async function postToGetDistance(mechanics, phoneNumber) {
    try {
      for (let mechanic of mechanics) {
        let response = await axios.get("http://localhost:5000/api/getDistance", {
          params: {
            phoneNumber: phoneNumber
          }
        });
        let distance = response.data.distances.find((item) => item.mechanicid === mechanic.mechanicid);
        mechanic.distance = distance ? distance.distance : "N/A";
      }
      setMechanics([...mechanics]); // Update state with distances
    } catch (error) {
      console.error("Error posting to getDistance API:", error);
    }
  }

  useEffect(() => {
    const url = window.location.href;
    const phoneNumber = url.substring(url.lastIndexOf('/') + 1);
    getMechanicFromApi(phoneNumber);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Link
        style={{
          color: "black",
          paddingLeft: "1420px",
        }}
        to="/mechanic"
      >
        <i className="fa-sharp fa-solid fa-arrow-right"></i>
      </Link>
      <div className="container-fluid">
        <div className="row">
          {mechanics.map((mechanic) => (
            <MaintenanceCenter item={mechanic} key={mechanic.mechanicid} distance={mechanic.distance} />
          ))}
        </div>
      </div>
    </>
  );
}

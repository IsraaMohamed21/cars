import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import RegisterNav from "../RegisterNav/RegisterNav";
import { useNavigate } from "react-router-dom";
import "./Adminlogin.css"; // Assuming you'll create this CSS file for styling

export default function Adminlogin() {
  let navigate = useNavigate();

  let login = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      axios.post("http://localhost:5000/api/adminlogin", values)
      .then(({ data }) => {
        console.log(data); // Added logging
        if (data.message === "success") {
          navigate("/dashboard");
        }
      });
    
    },
  });

  return (
    <>
      <RegisterNav />
      <div className="admin-login-container">
         <form onSubmit={login.handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={login.handleChange}
              value={login.values.email}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={login.handleChange}
              value={login.values.password}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="links">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </>
  );
}

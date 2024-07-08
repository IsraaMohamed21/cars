import React from "react";
import { NavLink } from "react-router-dom";
export default function RegisterNav() {
  return (
    <div className="Register-Nav">
      <ul>
        <li>
         
          <div className="link-hover "style={{marginLeft:"-70.8PX"}}>
          <NavLink
            className="link-login"
            style={{
              fontWeight: "500",
            }}
            to="/login"
          >
            SIGN IN
            <div className="underline" ></div>
          </NavLink>
          </div>
        </li>

        <li>
          <div className="link-hover">
          <NavLink
            className="link-login"
            style={{
              fontWeight: "500",
            }}
            to="/adminlogin"
          >
            ADMIN SIGN IN
          </NavLink>
          </div>
        </li>


        <li>
          <div className="link-hover">
          <NavLink
            className="link-login"
            style={{
              fontWeight: "500",
            }}
            to="/signup"
          >
            SIGN UP
            <div className="underline"></div>
          </NavLink>
          </div>
        </li>
        
      </ul>
    </div>
  );
}

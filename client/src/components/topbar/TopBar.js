import React from "react";
import { Link } from "react-router-dom";
import "./topBar.css";

export const TopBar = () => {
  return (
    <div className="top">
      <div className="topLeft">
        <Link className="link topLeftTitle" to="/">
          Lead Finder App
        </Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contacts">
              Contacts
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import "./topBar.css";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

export const TopBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      //check and see if exp value (in milliseconds) is less than 1000. If so, log out.
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout(navigate);
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [navigate, user, logout]);

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
            <Link className="link" to="/signup">
              Signup
            </Link>
          </li>
          <li className="topListItem">
            <div className="link" onClick={() => logout(navigate)}>
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

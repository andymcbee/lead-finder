import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import "./topBar.css";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

export const TopBar = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("jwt")));
  const dispatch = useDispatch();
  const { logout, getUser } = bindActionCreators(actionCreators, dispatch);
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.user?.authData);

  const navigate = useNavigate();

  console.log(JSON.parse(localStorage.getItem("jwt")));

  useEffect(() => {
    console.log("TOP BAR FIRED.");
    console.log("Token::::");
    console.log(token);

    /*   if (token && !user) {
      console.log("IF TOKEN FIRED");
      getUser();
    } */

    if (token?.token) {
      const currentToken = token?.token;
      console.log(currentToken);

      const decodedToken = decode(currentToken);
      console.log(decodedToken);

      //check and see if exp value (in milliseconds) is less than 1000. If so, log out.
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        console.log("TOKEN EXPIRED FIRED");
        logout(navigate);
        localStorage.clear();
        //user = false;
      }

      if (!user && token?.token) {
        console.log("IF TOKEN FIRED");
        console.log(token);
        getUser();
      }
    }
  }, [navigate, token, user]);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <div className="top">
      <div className="topLeft">
        <Link className="link topLeftTitle" to="/">
          Lead Finder App
        </Link>
      </div>
      {user && (
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
      )}
      <div className="topRight">
        <ul className="topList">
          {user ? (
            <li className="topListItem">
              <div className="link" onClick={() => handleLogout()}>
                Logout
              </div>
            </li>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

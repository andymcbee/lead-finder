import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./views/homePage/HomePage";
import { AllContactsPage } from "./views/allContactsPage/AllContactsPage";
import { EditContactPage } from "./views/editContactPage/EditContactPage";
import { SingleContactPage } from "./views/singleContactPage/SingleContactPage";
import { TopBar } from "./components/topbar/TopBar";
import UserSignup from "./views/userSignupPage/UserSignupPage";
import UserSignin from "./views/userSigninPage/UserSigninPage";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user?.authData?.result);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <UserSignup />} />

        <Route
          path="/contacts"
          element={user ? <AllContactsPage /> : <UserSignup />}
        />

        <Route
          path="/contact/:contactId"
          element={user ? <SingleContactPage /> : <UserSignup />}
        />

        <Route
          path="/edit-contact/:contactId"
          element={user ? <EditContactPage /> : <UserSignup />}
        />

        <Route path="/signup" element={user ? <HomePage /> : <UserSignup />} />

        <Route path="/login" element={user ? <HomePage /> : <UserSignin />} />
      </Routes>
    </Router>
  );
}

export default App;

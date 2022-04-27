import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./views/homePage/HomePage";
import { AllContactsPage } from "./views/allContactsPage/AllContactsPage";
import { EditContactPage } from "./views/editContactPage/EditContactPage";
import { SingleContactPage } from "./views/singleContactPage/SingleContactPage";
import { TopBar } from "./components/topbar/TopBar";
import UserSignup from "./views/userSignupPage/UserSignupPage";
import UserSignin from "./views/userSigninPage/UserSigninPage";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log(user);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/contacts" element={<AllContactsPage />} />

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

//        <Route path="/signup" element={<UserSignup />} />

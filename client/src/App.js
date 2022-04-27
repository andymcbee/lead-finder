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
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<AllContactsPage />} />

        <Route path="/contact/:contactId" element={<SingleContactPage />} />
        <Route path="/edit-contact/:contactId" element={<EditContactPage />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserSignin />} />
      </Routes>
    </Router>
  );
}

export default App;

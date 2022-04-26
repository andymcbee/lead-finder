import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./views/homePage/HomePage";
import { AllContactsPage } from "./views/allContactsPage/AllContactsPage";
import { EditContactPage } from "./views/editContactPage/EditContactPage";
import { SingleContactPage } from "./views/singleContactPage/SingleContactPage";
import { TopBar } from "./components/topbar/TopBar";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";
function App() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const test = useSelector((state) => state.test);
  const account = useSelector((state) => state.account);

  const { depositMoney } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    depositMoney();
    console.log(account);
  }, []);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<AllContactsPage />} />

        <Route path="/contact/:contactId" element={<SingleContactPage />} />
        <Route path="/edit-contact/:contactId" element={<EditContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import "./formNewContact.css";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

export default function SignUp() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const test = useSelector((state) => state.test);
  const account = useSelector((state) => state.account);

  const { depositMoney, createContact } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    companyName: "",
    domain: "",
  });
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();

    // depositMoney(5);
    //    console.log(formData);
    createContact(formData);
  };

  /*   const handleChange = (e) => {
    console.log(e);
    setFormData({ ...formData, fName: e.target.value });
  }; */

  return (
    <div className="addContact">
      <span className="addContactTitle">Add New Contact</span>
      <form className="addContactForm" onSubmit={handleSubmit}>
        <label>
          First Name
          <input
            autoFocus
            className="addContactInput"
            type="text"
            placeholder="First Name"
            value={formData.fName}
            onChange={(e) =>
              setFormData({ ...formData, fName: e.target.value })
            }
          />
        </label>
        <label>
          Last Name
          <input
            className="addContactInput"
            type="text"
            placeholder="Last Name"
            value={formData.lName}
            onChange={(e) =>
              setFormData({ ...formData, lName: e.target.value })
            }
          />
        </label>
        <label>
          Website
          <input
            className="addContactInput"
            type="text"
            placeholder="Website"
            value={formData.website}
            onChange={(e) =>
              setFormData({ ...formData, domain: e.target.value })
            }
          />
        </label>
        <label>
          Company Name
          <input
            className="addContactInput"
            type="text"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
          />
        </label>

        <button className="addContactButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

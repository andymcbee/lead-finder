import React, { useState } from "react";
import "./formNewContact.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    companyName: "",
    website: "",
  });
  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
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
              setFormData({ ...formData, website: e.target.value })
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

import React, { useEffect } from "react";
import ContactsDataTable from "../../components/contactsDataTable/ContactsDataTable";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

export const AllContactsPage = () => {
  const dispatch = useDispatch();
  const { getContacts } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <ContactsDataTable />
    </div>
  );
};

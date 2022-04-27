import React, { useEffect } from "react";
import ContactsDataTable from "../../components/contactsDataTable/ContactsDataTable";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

export const AllContactsPage = () => {
  const dispatch = useDispatch();
  const { getContacts } = bindActionCreators(actionCreators, dispatch);
  const accountId = useSelector(
    (state) => state.user.authData.result.accountId
  );

  console.log(accountId);

  useEffect(() => {
    getContacts(accountId);
  }, []);

  return (
    <div>
      <ContactsDataTable />
    </div>
  );
};

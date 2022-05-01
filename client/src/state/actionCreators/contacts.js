import * as api from "../../api";

// Create new contact

/* export const createContact = async (newContact) => {
  console.log("HERE111");
  await api.createContact(newContact);
  console.log("HERE222");

  return (dispatch) => {
    dispatch({
      type: "deposit",
      payload: 5,
    });
  };
}; */

export const createContact = (newContact) => async (dispatch) => {
  try {
    const { data } = await api.createContact(newContact);

    await dispatch({ type: "CREATE", payload: data.newContact });
    /*  await dispatch({
      type: "NOTIFICATION",
      showMessage: true,
      text: "Contact added!",
      subtext: "Contact has been added to the queue..",
      notifType: "success",
    });

    setTimeout(() => {
      dispatch({
        type: "NOTIFICATION",
        showMessage: false,
        text: null,
        subtext: null,

        notifType: null,
      });
    }, "2000"); */
  } catch (error) {
    console.log(error);
  }
};

export const getContacts = (accountId) => async (dispatch) => {
  try {
    const { data } = await api.getContacts(accountId);
    dispatch({ type: "FETCH", payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

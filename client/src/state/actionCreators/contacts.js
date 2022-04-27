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
    dispatch({ type: "CREATE", payload: data.newContact });
  } catch (error) {
    console.log(error);
  }
};

export const getContacts = () => async (dispatch) => {
  try {
    const { data } = await api.getContacts();
    dispatch({ type: "FETCH", payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

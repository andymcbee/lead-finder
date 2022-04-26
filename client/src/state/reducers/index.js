import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import contactsReducer from "./contactsReducer";

const reducers = combineReducers({
  account: accountReducer,
  contacts: contactsReducer,
});

export default reducers;

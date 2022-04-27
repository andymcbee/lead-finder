import { combineReducers } from "redux";
import accountReducer from "./accountReducer";
import contactsReducer from "./contactsReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  account: accountReducer,
  contacts: contactsReducer,
  user: userReducer,
});

export default reducers;

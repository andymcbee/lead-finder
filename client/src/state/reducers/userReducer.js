const authReducer = (
  state = {
    authData: null,
    message: { showMessage: false, text: null, notifType: null },
  },
  action
) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, authData: action?.data };
    case "LOGOUT":
      return { ...state, authData: null };
    case "RESETPASSWORD":
      return { ...state };
    case "SETNEWPASSWORD":
      return { ...state };
    case "NOTIFICATION":
      return {
        ...state,
        message: {
          showMessage: action.showMessage,
          text: action.text,
          subtext: action.subtext,
          notifType: action.notifType,
        },
      };

    default:
      return state;
  }
};

export default authReducer;

//showSuccess: action.showSuccess,
//message: action.message,

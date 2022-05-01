const reducer = (
  state = {
    isLoading: false,
    contacts: [],
    message: { showMessage: false, text: null, notifType: null },
  },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };

    case "CREATE":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "FETCH":
      return { ...state, contacts: action.payload };
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

export default reducer;

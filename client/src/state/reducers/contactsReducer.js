const reducer = (state = { isLoading: false, contacts: [] }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };

    case "CREATE":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "FETCH":
      return { ...state, contacts: action.payload };

    default:
      return state;
  }
};

export default reducer;

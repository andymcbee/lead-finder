const reducer = (
  state = [
    { id: "123", name: "List 1" },
    { id: "456", name: "List 2" },
  ],
  action
) => {
  switch (action.type) {
    case "deposit":
      return state + action.payload;
    case "withdraw":
      return action.payload;

    default:
      return state;
  }
};

export default reducer;

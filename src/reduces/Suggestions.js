const Suggestions = (
  state = {
    suggestion: [],
  },
  action
) => {
  switch (action.type) {
    case "ADD_SUGGESTIONS":
      state.suggestion = action.payload.suggestion;
      return state;
    default:
      break;
  }
  return state;
};

export default Suggestions;

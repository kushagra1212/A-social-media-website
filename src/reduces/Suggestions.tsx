const Suggestions = (
  state = {
    suggestion: [],
  },
  action
) => {
  switch (action.type) {
    case "ADD_SUGGESTIONS":
      return {...state,suggestion:action.payload.suggestion};
    default:
      break;
  }
  return state;
};

export default Suggestions;

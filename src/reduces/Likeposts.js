const Likeposts = (
  state = { posts: new Array(), lastcount: new Number() },
  action
) => {
  switch (action.type) {
    case "POPULATE_IT":
      state.posts = action.payload.posts;
      state.lastcount = action.payload.lastcount;
      return state;
    default:
      return state;
  }
};
export default Likeposts;

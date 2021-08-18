const Likeposts = (
  state = { posts: new Array(), lastcount: new Number() },
  action
) => {
  switch (action.type) {
    case "POPULATE_IT":
    
      return {posts:action.payload.posts,lastcount:action.payload.lastcount};
    default:
      return state;
  }
};
export default Likeposts;

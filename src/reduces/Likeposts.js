const Likeposts = (
  state = { posts: new Array(), lastcount:0 },
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

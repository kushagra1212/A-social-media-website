const userposts = (posts = [], action) => {
  switch (action.type) {
    case "ADD_POSTS":
      let pos = posts;
      pos = action.payload;
      pos.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      posts = pos;

      return posts;
    case "GET_POSTS":
      pos = posts;
      pos.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      posts = pos;
      return posts;
    case "RESET_USER_POSTS":
      posts = [];
      return posts;
    default:
      return posts;
  }
};

export default userposts;

const userposts = (posts = [], action) => {
  switch (action.type) {
    case 'ADD_POSTS':
      let pos = [];
      pos = posts;
      pos = action.payload;
      pos.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      return pos;
    case 'GET_POSTS':
      pos = posts;
      pos.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      return pos;
    case 'RESET_USER_POSTS':
      return [];
    default:
      return posts;
  }
};

export default userposts;

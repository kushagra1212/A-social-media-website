const feedposts = (
  state = {
    posts: [],
    lastcount: 0,
    array: [],
    likesArray: [],
    otherUsersLastcount: [],
  },
  action
) => {
  switch (action.type) {
    case "ADD_FEED_POSTS":
      state.posts = action.payload.posts;
      state.lastcount += action.payload.lastcount;
      state.array = action.payload.array;
      if (isNaN(state.otherUsersLastcount[action.payload.otheruser])) {
        state.otherUsersLastcount[action.payload.otheruser] =
          action.payload.lastcount;
      } else
        state.otherUsersLastcount[action.payload.otheruser] +=
          action.payload.lastcount;

      return state;
    case "GET_FEED_POSTS":
      return state;
    case "UPDATE_LIKES_ARRAY":
      let username = action.payload.username;
      let postID = action.payload.postID;
      let ind = state.likesArray.findIndex(
        (ele) => ele.username === username && ele.postID === postID
      );
      if (ind >= 0) {
        return state;
      }
      return {
        ...state,
        likesArray: [
          ...state.likesArray,
          { username: username, postID: postID },
        ],
      };

    case "UPDATE_POST":
      let index = state.posts.findIndex(
        (post) => post._id === action.payload.post._id
      );

      let newArray = state.posts;

      if (index >= 0) newArray[index].comments = action.payload.post.comments;
      return { ...state, posts: newArray };
    case "UPDATE_UNLIKES_ARRAY":
      return { ...state, likesArray: action.payload.unlikesArray };
    case "RESET_FEED_POSTS":
      return {
        ...state,
        posts: [],
        lastcount: 0,
        array: [],
        otherUsersLastcount: [],
      };
    default:
      break;
  }
  return state;
};

export default feedposts;

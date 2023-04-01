const Posts = (
  state = {
    posts: [],
    array: [],
    likesLatestArray: [],
    lastcount: 0,
    scrollPosition: 0,
  },
  action
) => {
  switch (action.type) {
    case 'ADD_LATEST_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        array: action.payload.array,
      };
    case 'GET_LATEST_POSTS':
      return state;
    case 'UPDATE_LATEST_LIKES_ARRAY':
      let username = action.payload.username;
      let postID = action.payload.postID;
      let ind = state.likesLatestArray.findIndex(
        (ele) => ele.username === username && ele.postID === postID
      );
      if (ind >= 0) {
        return state;
      }
      return {
        ...state,
        likesLatestArray: [
          ...state.likesLatestArray,
          { username: username, postID: postID },
        ],
      };
    case 'UPDATE_LAST_COUNT':
      return { ...state, lastcount: action.payload.lastcount };
    case 'UPDATE_LATEST_POST':
      let index = state.posts.findIndex(
        (post) => post._id === action.payload.post._id
      );

      let newArray = state.posts;

      if (index >= 0) newArray[index].comments = action.payload.post.comments;
      return { ...state, posts: newArray };
    case 'UPDATE_LATEST_UNLIKES_ARRAY':
      return { ...state, likesLatestArray: action.payload.unlikesArray };
    case 'SET_SCROLL_POSITION':
      return { ...state, scrollPosition: action.payload.scrollPosition };
    case 'RESET_LATEST_POSTS':
      return {
        ...state,
        posts: [],
        array: [],
        likesLatestArray: [],
        lastcount: 0,
        scrollPosition: 0,
      };
    default:
      break;
  }
  return state;
};

export default Posts;

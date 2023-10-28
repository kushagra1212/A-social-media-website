let post;
const feedposts = (
  state = {
    posts: [],
    array: [],
    count: 0,
    likesArray: [],
    otherUsersLastcount: [],
  },
  action
) => {
  switch (action.type) {
    case "ADD_FEED_POSTS":
      let other = state.otherUsersLastcount;
      if (isNaN(other[action.payload.otheruser])) {
        other[action.payload.otheruser] = 0;
      } else other[action.payload.otheruser] += action.payload.count;

      if (isNaN(other[action.payload.username])) {
        other[action.payload.username] = 0;
      } else other[action.payload.username] += action.payload.count;

      return {
        ...state,
        posts: action.payload.posts,
        array: action.payload.array,
        otherUsersLastcount: other,
      };
    case "ADD_FRIEND_FEED_POSTS":
      post = state.posts;
      post = [...post, ...action.payload.posts];
      state.posts = post;
      state.array = action.payload.array;
      let other2=state.otherUsersLastcount;
      if (isNaN(other2[action.payload.friend])) {
        other2[action.payload.friend] = 3;
      } else
      other2[action.payload.friend] +=
          action.payload.count;
      return {...state,posts:post,array:action.payload.array,otherUsersLastcount:other2};
    case "ADD_USER_FEED_POSTS":
      post = state.posts;
      post = [...post, ...action.payload.posts];
      state.posts = post;
      state.array = action.payload.array;
      if (isNaN(state.otherUsersLastcount[action.payload.username])) {
        state.otherUsersLastcount[action.payload.username] = 3;
      } else
        state.otherUsersLastcount[action.payload.username] +=
          action.payload.count;
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
        array: [],
        count: 0,
        likesArray: [],
        otherUsersLastcount: [],
      };
    default:
      break;
  }
  return state;
};

export default feedposts;

let initial = {
  username: "",
  postcount: 0,
  followerscount: 0,
  followingcount: 0,
};
const count = (state = initial, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };

    case "UPDATE_POST_COUNT":
      return { ...state, postcount: action.payload };
    case "UPDATE_FOLLOWERS_COUNT":
      return { ...state, followerscount: action.payload };
    case "UPDATE_FOLLOWING_COUNT":
      return { ...state, followingcount: action.payload };
    default:
      return state;
  }
};
export default count;

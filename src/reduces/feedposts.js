const feedposts = (
  state = {
    posts: new Array(),
    lastcount: new Number(),
    array: new Array(),
    lastcount2: new Number(),
    likesArray: new Array(),
  },
  action
) => {
  switch (action.type) {
    case "ADD_FEED_POSTS":
      state.posts = action.payload.posts;
      state.lastcount += action.payload.lastcount;
      state.array = action.payload.array;
      state.lastcount2 += action.payload.lastcount2;
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
      let index=state.posts.findIndex(post=>post._id===action.payload.post._id);

      let newArray=[...state.posts];
      newArray[index].comments=action.payload.post.comments;
      return {...state,posts:newArray};
    case "UPDATE_UNLIKES_ARRAY":
      return { ...state, likesArray: action.payload.unlikesArray };
    case "RESET_FEED_POSTS":
      return {
        ...state,
        posts: new Array(),
        lastcount: new Number(),
        array: new Array(),
        lastcount2: new Number(),
      };
  }
  return state;
};

export default feedposts;

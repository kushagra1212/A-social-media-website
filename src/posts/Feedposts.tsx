
import { addfeedposts,addfriendfeedposts,adduserfeedposts } from "../reduces/actions/userAction";

export const Feedposts = (newpost, array,otheruser,username, dispatch) => {
  dispatch(addfeedposts(newpost, array,otheruser,username));

  return null;
};
export const feedPostsUpdateFriend = (posts, array,friend,count,dispatch) => {
  dispatch(addfriendfeedposts(posts, array,friend,count));

  return null;
};
export const feedPostsUpdateUser = (posts, array,username,count, dispatch) => {
  dispatch(adduserfeedposts(posts, array,username,count));

  return null;
};

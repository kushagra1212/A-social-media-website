
import { addfeedposts } from "../reduces/actions/userAction";

const Feedposts = (newpost, array,otheruser,username, dispatch) => {
  dispatch(addfeedposts(newpost, array,otheruser,username));

  return null;
};

export default Feedposts;

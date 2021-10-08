
import { addfeedposts } from "../reduces/actions/userAction";

const Feedposts = (newpost, array,otheruser, dispatch) => {
  dispatch(addfeedposts(newpost, array,otheruser));

  return null;
};

export default Feedposts;

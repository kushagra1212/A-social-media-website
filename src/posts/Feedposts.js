import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addfeedposts } from "../reduces/actions/userAction";

const Feedposts = (newpost, lastcount, array, lastcount2, dispatch) => {
  dispatch(addfeedposts(newpost, lastcount, array, lastcount2));

  return null;
};

export default Feedposts;

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getposts } from "../methods/getposts";

const Userposts = () => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);

  useEffect(() => {
   
   
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
  }
  return null
};
export default Userposts;
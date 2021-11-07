import { useDispatch, useSelector } from "react-redux";
import Top from "./Top/Top";
import getfollowing from "../methods/getfollowing.js";
import getpostcount from "../methods/getpostcount";
import getfollowers from "../methods/getfollowers";
import Userposts from "../posts/Userposts";
import Container from "./Container/Container";
import Showbar from "../showbar/Showbar";
import { useEffect, useState } from "react";
import { getposts } from "../methods/getposts";
import Styles from "./Profile.module.css";
import { Redirect, withRouter } from "react-router";
const Profile = () => {
  const dispatch = useDispatch();
  const [post, setpost] = useState(false);
  const posts = useSelector((state) => state.userposts);
  const { username,_id } = useSelector((state) => state.user);

  const [showfollowers, setshowfollowers] = useState(false);
  const [showfollowing, setshowfollowing] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const { followerscount, followingcount } = useSelector(
    (state) => state.count
  );



  const setposthand = (is) => {
    setpost(is);
  };

   

  useEffect(
    () => {
      if (!isUnmounted) {
        setTimeout(() => {
          getfollowing(username, dispatch);
        }, 0);
        setTimeout(() => {
          getpostcount(username, dispatch);
          getfollowers(username, dispatch);
          getposts(_id, dispatch);
        }, 0);
      }
      return () => {
        setIsUnmounted(true);
      };
    },
    [username,
    followingcount,
    followerscount]
  );
 

  const setshowfollowershandle = (val) => {
    setshowfollowers(val);
  };
  const setshowfollowinghandle = (value) => {
    setshowfollowing(value);
  };


  if (showfollowers) {
    return (
      <Showbar
        setshowfollowershandle={setshowfollowershandle}
        setshowfollowinghandle={setshowfollowinghandle}
        showfollowing={showfollowing}
        showfollowers={showfollowers}
        username={username}
      />
    );
  } else if (showfollowing) {
    return (
      <Showbar
        setshowfollowershandle={setshowfollowershandle}
        setshowfollowinghandle={setshowfollowinghandle}
        showfollowing={showfollowing}
        showfollowers={showfollowers}
        username={username}
      />
    );
  } else {
    return (
      <div className={Styles.maindiv}>
        <Top
          setshowfollowershandle={setshowfollowershandle}
          setshowfollowinghandle={setshowfollowinghandle}
          setposthand={setposthand}
        />

          <>
          {username!==""?<Container toDelete={false} username={username} />:null}{" "}
          </>

      </div>
    );
  }
};

export default withRouter(Profile);

import { useDispatch, useSelector } from "react-redux";
import Top from "./Top/Top";
import getfollowing from "../methods/getfollowing.js";
import getpostcount from "../methods/getpostcount";
import getfollowers from "../methods/getfollowers";
import Userposts from "../posts/Userposts";
import Container from "./Container/Container";
import Showbar from "../showbar/Showbar";
import { useEffect, useState } from "react";
import Styles from "./Profile.module.css";
const Profile = () => {
  const dispatch = useDispatch();
  const [post, setpost] = useState(false);
  const posts = useSelector((state) => state.userposts);
  const { username } = useSelector((state) => state.user);
  const { postcount } = useSelector((state) => state.count);
  const [showfollowers, setshowfollowers] = useState(false);
  const [showfollowing, setshowfollowing] = useState(false);
  const { followerscount, followingcount } = useSelector(
    (state) => state.count
  );
  const [start, setstart] = useState(true);

  const setposthand = (is) => {
    setpost(is);
  };
  useEffect(
    () => {
      setTimeout(() => {
        getfollowing(username, dispatch);
      }, 100);
      setTimeout(() => {
        getpostcount(username, dispatch);
        getfollowers(username, dispatch);
      }, 200);
    },
    [username],
    followingcount,
    followerscount
  );
  useEffect(() => {
    setTimeout(() => {
      setstart(false);
    }, 5000);
  }, []);
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
      <div style={{ margin: "0px", padding: "0px" }}>
        <Top
          setshowfollowershandle={setshowfollowershandle}
          setshowfollowinghandle={setshowfollowinghandle}
          setposthand={setposthand}
        />
        {!posts.length > 0 ? (
          <div
            className={Styles.loadermaindiv}
            style={{ position: "absolute" }}
          >
            {start ? (
              <div className={Styles.loader}></div>
            ) : (
              <div>NOTHING POSTED YET</div>
            )}
            <Userposts />
          </div>
        ) : (
          <>
            <Container posts={posts} />{" "}
          </>
        )}
      </div>
    );
  }
};

export default Profile;

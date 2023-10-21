import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./User.module.css";
import { removefollowers, setfollowers } from "../../methods/setfollowers";
import verifiesusers from "../../methods/verifiesusers";
import Showbar from "../../showbar/Showbar";
import { useAlert } from "react-alert";
import addconversation from "../../methods/addconversation";
import getconversations from "../../methods/getconversations";
import deleteconversation from "../../methods/deleteconversation";
import ShowPost from "./ShowPost";
import { useSpring, animated } from "react-spring";
import { PUBLIC_URL } from "../../utils/constants/env";
const calcXY = (x, y) => [
  -(y - window.innerHeight / 2) / 10,
  (x - window.innerWidth / 2) / 10,
  1.0,
];

const perspective = (x, y, s) =>
  `perspective(500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const User = ({
  profpic,
  name,
  username,
  bio,
  postsnumber,
  followingcount,
  followerscount,
  getcounts,
  setshowfollowershandle,
  setshowfollowinghandle,
  showfollowers,
  showfollowing,
}) => {
  const [following, setfollowing] = useState(false);
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const usernameofsender = useSelector((state) => state.user.username);
  const [isUnmounted, setUnmounted] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [showProfilePic, setShowProfilePic] = useState(false);
  const Alert = useAlert();
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 200, friction: 100 },
  }));
  const setfollowinghandle = async (e) => {
    setfollowers(username, usernameofsender, dispatch);
    let exists = false;
    if (following === false) {
      const conver = await getconversations(username);

      conver.forEach((element) => {
        if (element.members.includes(usernameofsender)) {
          exists = true;
        }
      });
      if (!exists) addconversation([username, usernameofsender]);
      setfollowing(true);
    }
  };
  const removefollowinghandle = () => {
    removefollowers(username, usernameofsender, dispatch);
    deleteconversation([username, usernameofsender]);
    setfollowing(false);
  };
  const setfollowingfunc = (value) => {
    setfollowing(value);
  };

  useEffect(() => {
    if (!isUnmounted) {
      verifiesusers(setfollowingfunc, username, usernameofsender);

      setloading(false);
    }
    return () => setUnmounted(true);
  }, []);
  const showAlertHandle = () => {
    Alert.info("Not Available 😛", {
      onOpen: () => {
        setShowAlert(false);
      },

      onClose: () => {
        setShowAlert(true);
      },
    });
  };
  const floatDown = useSpring({
    from: { y: "-100%", opacity: "0%" },
    y: "0%",
    x: "0%",
    opacity: "100%",
  });
  if (showProfilePic) {
    return (
      <animated.div style={floatDown} className={Styles.editprofileMain}>
        <span
          className={Styles.backbut}
          style={{ fontSize: "50px", color: "blue", cursor: "pointer" }}
          onClick={() => setShowProfilePic(false)}
        >
          <i
            styles={{ color: "Dodgerblue", cursor: "pointer" }}
            className="fa fa-arrow-circle-left"
          ></i>
        </span>
        {profpic ? (
          <animated.img
            onMouseMove={({ clientX: x, clientY: y }) =>
              set({ xys: calcXY(x, y) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.to(perspective) }}
            className={Styles.editimg}
            src={profpic ? profpic : "userImage.png"}
            alt=""
          />
        ) : null}
      </animated.div>
    );
  }
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
  }
  if (showfollowing) {
    return (
      <Showbar
        setshowfollowershandle={setshowfollowershandle}
        setshowfollowinghandle={setshowfollowinghandle}
        showfollowing={showfollowing}
        showfollowers={showfollowers}
        username={username}
      />
    );
  }
  return (
    <>
      <div className={Styles.maindiv}>
        <div className={Styles.firstdiv}>
          <img
            alt=""
            onClick={() => setShowProfilePic(true)}
            src={profpic ? profpic : "userImage.png"}
          />
        </div>
        <div className={Styles.seconddiv}>
          <h3>{name}</h3>

          <h6>@{username}</h6>
          <h5>{bio}</h5>
        </div>
        <div className={Styles.thirddiv}>
          <div className={Styles.posts}>
            <label style={{ color: "white" }}>Posts</label>
            <br />
            {postsnumber}
          </div>

          <label>
            <button
              className={Styles.followersbut}
              onClick={() =>
                followerscount >= 1
                  ? setshowfollowershandle(true)
                  : showAlert
                  ? showAlertHandle()
                  : null
              }
            >
              followers{" "}
            </button>{" "}
            <h6>{followerscount}</h6>
          </label>

          <label>
            <button
              className={Styles.followingbut}
              onClick={() =>
                followingcount
                  ? setshowfollowinghandle(true)
                  : showAlert
                  ? showAlertHandle()
                  : null
              }
            >
              following{" "}
            </button>{" "}
            <h6>{followingcount}</h6>
          </label>

          <button
            className={Styles.isfollowing}
            style={following ? { backgroundColor: "grey" } : {}}
            onClick={() =>
              !loading
                ? !following
                  ? setfollowinghandle()
                  : removefollowinghandle()
                : null
            }
          >
            {following ? "Unfollow" : "Follow"}{" "}
          </button>
        </div>
      </div>
      <ShowPost username={username} toDelete={false} />
    </>
  );
};
export default User;

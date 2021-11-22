import { useState } from "react";

import { useSelector } from "react-redux";
import Styles from "./Preview.module.css";
import { useAlert } from "react-alert";
import Search from "../../Search/Search";
const Preview = ({
  followerscount,
  followingcount,
  name,
  img,
  username,
  bio,
  postsnumber,
}) => {
  const Alert = useAlert();
  const [showAlert, setShowAlert] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

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
  if (showProfile) {
    return (
      <div className={Styles.wholediv}>
        <Search
          showprofilefromshowbar={showProfile}
          view={false}
          usernameformshowbar={username}
          preview={false}
        />
      </div>
    );
  }
  return (
    <div className={Styles.maindiv}>
      <div className={Styles.firstdiv}>
        <img
          onClick={() => {}}
          src={img ? img : process.env.PUBLIC_URL + "/userImage.png"}
          alt=""
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
          <h6> {postsnumber}</h6>
        </div>

        <label>
          {" "}
          <button className={Styles.followersbut} onClick={() => {}}>
            followers{" "}
          </button>{" "}
          <h6>{followerscount}</h6>{" "}
        </label>

        <label>
          {" "}
          <button className={Styles.followingbut} onClick={() => {}}>
            following{" "}
          </button>{" "}
          <h6>{followingcount}</h6>
        </label>
      </div>
      <div className={Styles.goto}onClick={()=>{setShowProfile(true)}}>Go to Profile</div>
    </div>
  );
};
export default Preview;

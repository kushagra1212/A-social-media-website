import { useState } from "react";

import { useSelector } from "react-redux";
import Styles from "./Preview.module.css";
import { useAlert } from "react-alert";
const Preview = ({
  setposthandle,
  edit_it,
  logouthandle,
  name,
  img,
  username,
  bio,
  postsnumber,
  setshowfollowershandle,
  setshowfollowinghandle,
}) => {
  const Alert = useAlert();
  const [showAlert, setShowAlert] = useState(true);
  const { followerscount, followingcount } = useSelector(
    (state) => state.count
  );
  let { profilepic } = useSelector((state) => {
    return state.user;
  });
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
  return (
    <div className={Styles.maindiv}>
      <div className={Styles.firstdiv}>
        <img
        onClick={() => edit_it()}
          src={
            profilepic ? profilepic : process.env.PUBLIC_URL + "/userImage.png"
          }
          alt=""
        />
     

      </div>
      <div className={Styles.seconddiv}>
        <h3>{name}</h3>
        <img src={img} alt="" />
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
          <button
            className={Styles.followersbut}
            onClick={() =>{}
            }
          >
            followers{" "}
          </button>{" "}
          <h6>{followerscount}</h6>{" "}
        </label>

        <label>
          {" "}
          <button
            className={Styles.followingbut}
            onClick={() =>{}
            }
          >
            following{" "}
          </button>{" "}
          <h6>{followingcount}</h6>
        </label>
     

   
      </div>
      <div className={Styles.goto}>
                Go to Profile
        </div>
    </div>
  );
};
export default Preview;

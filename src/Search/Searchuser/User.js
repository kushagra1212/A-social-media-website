import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./User.module.css";
import { setfollowers } from "../../methods/setfollowers";
import verifiesusers from '../../methods/verifiesusers'
const URL=process.env.REACT_APP_URL;
const User = ({
  profpic,
  name,
  username,
  bio,
  postsnumber,
  followingcount,
  followerscount,
  getcounts,
}) => {
  const [following, setfollowing] = useState(false);
  const dispatch = useDispatch();
  const usernameofsender = useSelector((state) => state.user.username);
  const setfollowinghandle = (e) => {
    if (following == false) {
      setfollowers(username, usernameofsender, dispatch);
      setfollowing(true);
    }
  };
  const setfollowingfunc=(value)=>{
      setfollowing(value);
  }
 
  useEffect(() => {
    getcounts();
    verifiesusers(setfollowingfunc,username,usernameofsender);
  }, []);
  return (
    <div className={Styles.maindiv}>
      <div className={Styles.firstdiv}>
        <img src={profpic} />
      </div>
      <div className={Styles.seconddiv}>
        <h3>{name}</h3>

        <h6>@{username}</h6>
        <h5>{bio}</h5>
      </div>
      <div className={Styles.thirddiv}>
        <label>
          Posts <h6> {postsnumber}</h6>
        </label>

        <label>
          followers <h6>{followerscount}</h6>
        </label>

        <label>
          following <h6>{followingcount}</h6>
        </label>

        <button onClick={() => setfollowinghandle()}>
          {following ? "Following" : "Follow"}{" "}
        </button>
      </div>
    </div>
  );
};
export default User;

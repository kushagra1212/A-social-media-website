import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./User.module.css";
import { setfollowers } from "../../methods/setfollowers";
import verifiesusers from "../../methods/verifiesusers";
import Showbar from '../../showbar/Showbar'
const URL = process.env.REACT_APP_URL;
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
  showfollowing

}) => {
  const [following, setfollowing] = useState(false);
  const [loading,setloading]=useState(true);
  const dispatch = useDispatch();
  const usernameofsender = useSelector((state) => state.user.username);
  const [isUnmounted,setUnmounted]=useState(false);
  const setfollowinghandle = (e) => {
    if (following == false) {
      setfollowers(username, usernameofsender, dispatch);
      setfollowing(true);
    }
  };
  const setfollowingfunc = (value) => {
    setfollowing(value);
  };

  useEffect(() => {
    if(!isUnmounted)
    {
      
    getcounts();
    verifiesusers(setfollowingfunc, username, usernameofsender);
 
      setloading(false);
    }
    return ()=> setUnmounted(true);

  }, []);
 

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
    <div className={Styles.maindiv}>
      <div className={Styles.firstdiv}>
        <img src={profpic?profpic:process.env.PUBLIC_URL+'userImage.png'} />
      </div>
      <div className={Styles.seconddiv}>
        <h3>{name}</h3>

        <h6>@{username}</h6>
        <h5>{bio}</h5>
      </div>
      <div className={Styles.thirddiv}>
      <div  className={Styles.posts}  >
            <label style={{color:"white"}} >Posts</label><br/>
            {postsnumber}

            </div>

        <label>
        <button className={Styles.followersbut}   onClick={()=>setshowfollowershandle(true)}      >followers </button> <h6>{followerscount}</h6>
        </label>

        <label>
        <button className={Styles.followingbut}  onClick={()=>setshowfollowinghandle(true)}      >following </button> <h6>{followingcount}</h6>
        </label>

        <button className={Styles.isfollowing} onClick={() => !loading?setfollowinghandle():null}>
          {following ? "Following" : "Follow"}{" "}
        </button>
      </div>
    </div>
  );
};
export default User;

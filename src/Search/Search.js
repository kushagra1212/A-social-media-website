import { useEffect, useState } from "react";
import axios from "axios";
import User from "./Searchuser/User";
import ShowPost from "./Searchuser/ShowPost";
import {useSelector } from "react-redux";
import Profile from "../Profile/Profile";
import Styles from "./Search.module.css";
import searchImg from "./icons/search-icon.png"
import verifiesusers from "../methods/verifiesusers";


const URL = process.env.REACT_APP_URL;
let  count=0;
const Search = ({ showprofilefromshowbar, usernameformshowbar, view }) => {
  const [searchuser, setsearchuser] = useState("");
  const [user, setuser] = useState("");
  const [loading, setloading] = useState(false);
  const [found, setfound] = useState({ found: false, text: "" });

  const [showprofile, setshowprofile] = useState(false);
  const { username } = useSelector((state) => state.user);
  const [postcount, setpostcount] = useState(null);
  const [followerscount, setfollowerscount] = useState(null);
  const [followingcount, setfollowingcount] = useState(null);
  const [following, setfollowing] = useState(null);
  const [showfollowers, setshowfollowers] = useState(false);
  const [showfollowing, setshowfollowing] = useState(false);
  const [showlist, setshowlist] = useState(true);
  const [isUnmounted, setUnmounted] = useState(false);

  const setfollowingfunc = (value) => {
    setfollowing(value);
  };

  useEffect(() => {
    if (showprofilefromshowbar) {
      setloading(true);
      setuser(usernameformshowbar);
      setsearchuser(usernameformshowbar);
      setfound({ found: true, text: "" });
      searchuserhandle(usernameformshowbar);
      showuserprofilehandle();
    }
    count++;
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);
  
  const getcounts = async () => {
    try {
      await axios.patch(`${URL}/count/updatefollowerscount`, {
        username: searchuser,
      });
      const res2 = await axios.patch(`${URL}/count/updatefollowingcount`, {
        username: searchuser,
      });
      if (res2.data) {
        setpostcount(res2.data.postcount);
        setfollowerscount(res2.data.followerscount);
        setfollowingcount(res2.data.followingcount);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const collectposts = async (id) => {
    try {
      const res = await axios.get(`${URL}/post/getpost?id=${id}`);
      if (res) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const searchuserhandle = async (username) => {
    if (username == null) {
      setloading(false);
      return;
    }
    try {
      setloading(true);
      const res = await axios.get(`${URL}/users/getuser?username=${username}`);

      if (res) {
        setuser(res.data);
        setfound({ found: true, text: "" });
      } else {
         
    setloading(false);
        setfound({ found: false, text: "user not found" });
      }
    } catch (err) {
      setfound({ found: false, text: "user not found" });
      console.log(err);
    }
    setloading(false);
  };

  const showuserprofilehandle = () => {
    setshowlist(false);
    setshowprofile(!showprofile);
  };
  const setshowfollowershandle = (val) => {
    setshowfollowers(val);
  };
  const setshowfollowinghandle = (value) => {
    setshowfollowing(value);
  };

  useEffect(() => {
    if (!isUnmounted) {
      let usernameofsender = searchuser;

      verifiesusers(setfollowingfunc, username, usernameofsender);
    }
    return () => setUnmounted(true);
  }, [searchuser,isUnmounted,username]);
  if (showprofilefromshowbar && !loading) {
    if (username === searchuser) {
    
      if(count>=30)
      {
        count=0;
        window.location.reload();
        return null;
      }
      count++;

      return (
      
        <div style={{ width: "100%", height: "100%", zIndex: 100 }}>
          <Profile  />
        </div>
      );
    }
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <User
          profpic={user.profilepic}
          name={user.name}
          bio={user.bio}
          postsnumber={postcount}
          followerscount={followerscount}
          followingcount={followingcount}
          username={user.username}
          getcounts={getcounts}
          setshowfollowershandle={setshowfollowershandle}
          setshowfollowinghandle={setshowfollowinghandle}
          showfollowers={showfollowers}
          showfollowing={showfollowing}
        />
        {showfollowers || showfollowing ? null : (
           <ShowPost  username={user.username} />
        )}
      </div>
    );
  } else if (showprofilefromshowbar && loading) {
    return <div></div>;
  } else if (showlist === true) {
    return (
      <div className={Styles.maindiv2}>
        <div className={Styles.topsearchbar}>
          {view ? (
            <div className={Styles.searchbar}>
              <input
                placeholder="Search User Here..."
                type="text"
                value={searchuser}
                onChange={(e) => {
                  setsearchuser(e.target.value);
                  searchuserhandle(e.target.value);
                }}
                required
              />
              <img
                className={Styles.searchbtn}
                onClick={() =>
                  searchuser.length > 0 ? setshowprofile(true) : null
                }
                src={searchImg}
                width="40px"
                height="40px"
                alt=""
              / >
            </div>
          ) : null}
        </div>
        {loading ? (
          <div className={Styles.loader}></div>
        ) : found.found ? (
          <>
            <div className={Styles.userprofile} onClick={showuserprofilehandle}>
              <img
                width="30px"
                height="30px"
                alt=""
                src={
                  user.profilepic
                    ? user.profilepic
                    : process.env.PUBLIC_URL + "/userImage.png"
                }
              />

              <div>
                <h6>@{user.username}</h6>
                <h4>{user.name}</h4>
              </div>
              <button>Go to profile</button>
            </div>
          </>
        ) : (
          <div className={Styles.temp}></div>
        )}
      </div>
    );
  } else if (showprofile) {
    if (username === searchuser && showprofilefromshowbar===false) {
      if(count>=30)
      {
        window.location.reload();
        count=0;
        return null;
      }
      count++;
    
    
      return (
        <div style={{ width: "100%", height: "100%" }}>
          {/*<button style={{zIndex:10}}  className={Styles.backbut} onClick={showuserprofilehandle}>
            BACK
          </button> */}

          <Profile />
        </div>
      );
    }

    return (
      <div style={{ width: "100%", height: "100%", zIndex: 100 }}>
        <User
          profpic={user.profilepic}
          name={user.name}
          bio={user.bio}
          postsnumber={postcount}
          followerscount={followerscount}
          followingcount={followingcount}
          username={user.username}
          getcounts={getcounts}
          setshowfollowershandle={setshowfollowershandle}
          setshowfollowinghandle={setshowfollowinghandle}
          showfollowers={showfollowers}
          showfollowing={showfollowing}
        />
        {showfollowers || showfollowing ? null : (
          <ShowPost  username={user.username} />
        )}
      </div>
    );
  }
};

export default Search;

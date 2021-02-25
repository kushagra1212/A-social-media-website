import { useEffect, useState } from "react";
import axios from "axios";
import User from "./Searchuser/User";
import Container from "./Searchuser/Container";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../Profile/Profile";
import Styles from "./Search.module.css";
import verifiesusers from '../methods/verifiesusers'
const URL = process.env.REACT_APP_URL;
const Search = ({fromshowbar,usernameformshowbar}) => {
  const [searchuser, setsearchuser] = useState("");
  const [user, setuser] = useState("");
  const [loading, setloading] = useState(false);
  const [found, setfound] = useState({ found: false, text: "" });
  const [posts, setposts] = useState(null);
  const [showprofile, setshowprofile] = useState(false);
  const { username } = useSelector((state) => state.user);
  const [postcount,setpostcount]=useState(null);
  const [followerscount,setfollowerscount]=useState(null);
  const [followingcount,setfollowingcount]=useState(null);
  const [following,setfollowing]=useState(null);
  const dispatch=useDispatch();

const setfollowingfunc=(value)=>{
  setfollowing(value);
}
useEffect(()=>{
  if(fromshowbar)
  {
    setsearchuser(usernameformshowbar);
    searchuserhandle(usernameformshowbar);
  }
    },[])
const getcounts=async()=>{
  try{
 await axios.patch(`${URL}/count/updatefollowerscount`,{
   username:searchuser
 });
    const res2=await axios.patch(`${URL}/count/updatefollowingcount`,{
      username:searchuser
    });
    if(res2.data)
    {
      console.log(res2.data,"cc")
      setpostcount(res2.data.postcount);
      setfollowerscount(res2.data.followerscount);
      setfollowingcount(res2.data.followingcount);
    }

  }catch(err)
  {
    console.log(err);
  }

}

  const collectposts = async (id) => {
   
    try {
      const res = await axios.get(`${URL}/post/getpost?id=${id}`);
      if (res) {
        console.log(res);
        setposts(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  
  };

  const searchuserhandle = async (username) => {
    try {
      setloading(true);
      const res = await axios.get(`${URL}/users/getuser?username=${username}`);
    
      if (res) {
        collectposts(res.data._id);
        setuser(res.data);
        setfound({ found: true, text: "" });
        console.log(res.data);
      } else {
        setfound({ found: false, text: "user not found" });
      }
    } catch (err) {
     
      setfound({ found: false, text: "user not found" });
      console.log(err);
    }
    setloading(false);
  };

  const showuserprofilehandle = () => {
    setposts("");
    setshowprofile(!showprofile);
  };
  useEffect(()=>{
    let usernameofsender=searchuser;
    console.log(usernameofsender)
    verifiesusers(setfollowingfunc,username,usernameofsender);
  },[searchuser])
  if (showprofile) {
    if (username === searchuser) {
      return (
        <>
          <button className={Styles.backbut} onClick={showuserprofilehandle}>
            BACK
          </button>

          <Profile />
        </>
      );
    }



    return (
      <>
        <button className={Styles.backbut} onClick={showuserprofilehandle}>
          
          BACK

        </button>

        <User
          profpic={user.profilepic}
          name={user.name}
          bio={user.bio}
          postsnumber={postcount}
          followerscount={followerscount}
          followingcount={followingcount}
          username={user.username}
          getcounts={getcounts}
        />
        <Container posts={posts} />
      </>
    );
  }
  
  return (
    <div>
      {fromshowbar?null:<div>
        <input
        placeholder="Search User Here"
        value={searchuser}
        onChange={(e) => {
          setsearchuser(e.target.value);
          searchuserhandle(e.target.value);
        }}   
      />
      <button onClick={() => setshowprofile(true)}>Search</button>
        </div>}
      {loading ? <div>Loading...</div> : null}
      {found.found ? (
        <div
          onClick={showuserprofilehandle}
          style={{ backgroundColor: "pink" }}
        >
          <img width="30px" height="30px" src={user.profilepic} />
          <h4>{user.name}</h4>
          <h6>@{user.username}</h6>
          <button>{following?"following":"follow"}</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Search;

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

  const [showprofile, setshowprofile] = useState(false);
  const { username } = useSelector((state) => state.user);
  const [postcount,setpostcount]=useState(null);
  const [followerscount,setfollowerscount]=useState(null);
  const [followingcount,setfollowingcount]=useState(null);
  const [following,setfollowing]=useState(null);
  const [showfollowers,setshowfollowers]=useState(false);
  const [showfollowing,setshowfollowing]=useState(false);
  useSelector(state=>console.log(state));
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
      
        return res.data;
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
          <button  className={Styles.backbut} onClick={showuserprofilehandle}>
            BACK
          </button>

          <Profile />
        </>
      );
    }
    const setshowfollowershandle = (val) => {
      setshowfollowers(val);
    };
    const setshowfollowinghandle = (value) => {
      setshowfollowing(value);
    };
  



    return (
      <>
       

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
        {showfollowers ||showfollowing?null:<Container collectposts={collectposts} user={user}  />}
      </>
    );
  }
  
  return (
    <div>
      {fromshowbar?null:<div className={Styles.topsearchbar}>
        <input className={Styles.searchinput}
        placeholder="Search User Here"
        value={searchuser}
        onChange={(e) => {
          setsearchuser(e.target.value);
          searchuserhandle(e.target.value);
        }}   
      />
      <button className={Styles.searchbutton} onClick={() => searchuser.length>0?setshowprofile(true):null}>Search</button>
        </div>}
      {loading ? <div>Loading...</div> : null}
      {found.found ? (
        <div
        className={Styles.userprofile}
          onClick={showuserprofilehandle}
       
        >
          <img width="30px" height="30px" src={user.profilepic} />
          <h4>{user.name}</h4>
          <h6>@{user.username}</h6>
          <button>Go to profile</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Search;

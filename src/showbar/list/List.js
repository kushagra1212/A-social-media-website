import { useEffect, useReducer, useState } from "react";
import getuser from "../../methods/getuser";
import Styles from './List.module.css';
import user from "../../reduces/user";
import Search from "../../Search/Search";
const List = ({ list }) => {
  const [users, setusers] = useState([]);
  const [usernames, setusernames] = useState(list);
  const [loading,setloading]=useState(true);
  const [showprofile,setshowprofile]=useState(false);
  const [username,setusername]=useState(null);
  const unique=(array)=>{
    let newar=[];
    let isvisited={};
    array.forEach(ele => {
      if(!isvisited[ele.username])
      {
          newar.push(ele);
          isvisited[ele.username]=true;
      }
    });
    return newar;
  }
  const setusershandle = async() => {
    let arr=[];
    arr=users;
        await usernames.map(async(ele) => {
    const {username}=ele;
     const data=await getuser(username);
     
   if(data)
   {
    arr.push(data);
    arr=unique(arr);
    setusers(arr);
    
   }
     
     
    });
  
    setloading(false);
    console.log(users);
  };
  useEffect(() => {
    setusershandle();
  }, []);
  useEffect(()=>{
    console.log(users);
  },[users])
 
  if(loading) return (<div >Loading..</div>)
  if (users.length>0 && showprofile==false) {
  
    return (
    <div className={Styles.maindiv} >
    {users.map((user,id)=>{
      {console.log(user)}
     return ( <div
      className={Styles.userprofile}
        key={id}
     
      >
        <img width="30px" height="30px" src={user.profilepic} />
        <h4>{user.name}</h4>
        <h6>@{user.username}</h6>
        <button onClick={()=>{setshowprofile(true); setusername(user.username)}}  >Go to profile</button>
      </div>)
    })}
    <div className={Styles.loader} ></div>
    </div>
    );
  }
  else{
    return (
        <div>
          <Search showprofilefromshowbar={showprofile}  usernameformshowbar={username} />
        </div>
      );
  }
  


};
export default List;

import { useEffect, useReducer, useState } from "react";
import getuser from "../../methods/getuser";
import Styles from './List.module.css';
import user from "../../reduces/user";
import Loader from "../../Animation/Loader/Loader";
import Search from "../../Search/Search";
const List = ({ list }) => {
  const [users, setusers] = useState([]);
  const [usernames, setusernames] = useState(list);
  const [loading,setloading]=useState(true);
  const [showprofile,setshowprofile]=useState(false);
  const [username,setusername]=useState([]);
  const [isUnmounted,setIsUnmounted]=useState(false);
 
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
  
    console.log(usernames);
        usernames.map(async(ele) => {
    const {username}=ele;
     const data=await getuser(username);
     
        try{
          if(data)
          {
          
           setusers((prev)=>[...prev,data]);
           
          }
            
        }catch(err)
      {
        console.log(err);
     
      }
     
    });
    setloading(false);

    console.log(users);
  };
  useEffect(() => {

  
  setusershandle();


    return ()=>setIsUnmounted(true);
  }, []);
  useEffect(()=>{
    console.log(users);
  },[users])
 
  if(loading) return (<Loader width={1} height={1}/>)
  if (users.length>0 && showprofile==false) {
  
    return (
    <div className={Styles.maindiv} >
    {users.map((user,id)=>{
      {console.log(user)}
     return ( <div
      className={Styles.userprofile}
        key={id}
     
      >
        <img width="30px" height="30px" src={user.profilepic?user.profilepic:process.env.PUBLIC_URL+'/userImage.png'} />
        <h4>{user.name}</h4>
        <h6>@{user.username}</h6>
        <button onClick={()=>{setshowprofile(true); setusername(user.username)}}  >Go to profile</button>
      </div>)
    })}
    {list.length==users.length?null:<Loader width={1} height={1} fontSize={10}/>}
    </div>
    );
  }
  else{
    return (
        <div>
          <Search showprofilefromshowbar={showprofile} view={false} usernameformshowbar={username} />
        </div>
      );
  }
  


};
export default List;

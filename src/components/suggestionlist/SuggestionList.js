import { useState, useEffect } from "react";
import getusers from "../../methods/getusers";
import Styles  from "./SuggestionList.module.css";
import { useSelector } from "react-redux";
import ContentLoader from 'react-content-loader'
import isconnection from "../../methods/isconnection";
import { setfollowers } from "../../methods/setfollowers";
import { useDispatch } from "react-redux";
import addconversation from "../../methods/addconversation";
import getconversations from "../../methods/getconversations";
const MyLoader = (props) => (
  <ContentLoader 
    speed={3}
    width={250}
    height={510}
    viewBox="0 0 250 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >    <rect x="15" y="70" rx="0" ry="3" width="140" height="20" /> 
    <rect x="15" y="0" rx="10" ry="10" width="60" height="60" /> 
  
    <rect x="140" y="5" rx="0" ry="3" width="100" height="30" /> 


  </ContentLoader>
)

const SuggestionList = () => {
  const [loading,setLoading]=useState(true);
  const [users,setUsers]=useState([]);
  const { username } = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const checkUsers=async(Users)=>{
    
    let newArray=[];
   
    for(let user of Users){
     
      let currentusername=user.username;
      const found=await isconnection(username,currentusername);
      if(!found && username!==user.username)
        newArray.push(user);
      
    }
    setUsers(newArray);
    setLoading(false);
    
 }
  useEffect(()=>{
    getusers().then(res=>{ checkUsers(res.data); }).catch(err=>console.log(err));
   
  },[username])

const handleAdd=async(user)=>{
  setfollowers(username, user.username, dispatch);
  let exists=false;
 
    const conver = await getconversations(username);

    
    conver.forEach((element) => {
     
      if (element.members.includes(user.username)) {
         exists=true;
      }
    });
  if(!exists)
   addconversation([username, user.username]);
  

  let currentusers=users;
  currentusers=users.filter((u)=>u._id!==user._id);
  setUsers(currentusers);
}
  if(loading)
  return(<div className={Styles.skeletondiv} >  <MyLoader  /> <MyLoader  /> <MyLoader  />)</div>)
  else
  return (
    <>
     
    <div className={Styles.maindiv} >
 
      {users.length>0 && users.map((user) => {
        return <div key={user._id} className={Styles.listitem} >
                 
                <div className={Styles.listhead} >
                <img width="70px" height="70px" className={Styles.listimg} alt="" src={user.profilepic?user.profilepic:process.env.PUBLIC_URL+'/userImage.png'}/>
                 <button onClick={()=>handleAdd(user)} className={Styles.listbut} styles={username===user.username?{backgroundColor:"black"}:{}} >{username===user.username?"following":"follow"}</button>
               </div>
               <h6>@{user.username}</h6>
             
        </div>
      })}
    </div>
    </>
  );
};
export default SuggestionList;

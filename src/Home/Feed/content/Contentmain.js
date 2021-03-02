import Styles from "./Content.module.css";

import {getpostsforfeed} from '../../../methods/getpostsforfeed'
import sharepic from "./images/share.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getitem from '../../../methods/getitem';
const Contentmain = () => {
  const {_id,profilepic,username}=useSelector(state=>state.user)
  const [liked, setlike] = useState(false);
  const [likecount,setlikecount]=useState(0);
  

 const [posts,setposts]=useState([{username:"",picture:""}]);

 const [loading,setloading]=useState(true);

  const likefunction=()=>{
    liked?setlikecount(likecount):setlikecount(likecount+1);
    setlike(true);
  }
  const unlikefunction=()=>{
!liked || likecount==0?setlikecount(likecount):setlikecount(likecount-1);
setlike(false);
  }
  let post1=[];
  const call_func=()=>{
   if(username)
   {
    getpostsforfeed(username).then(post=>{  post1=post;     getothers();   console.log(post,"own"); }).catch(err=>console.log(err));
   }

 
  }
  const getothers=()=>{
    getitem(username).then(item=>item?.following?.map((dat)=>{
      
      getpostsforfeed(dat.username).then(post=>{
        
         setposts([...post1,...post]);
         setloading(false);
            console.log(post,"different");
      }).catch(err=>console.log(err));
    }))
}
  
 
  useEffect(()=>{
call_func();
  },[]);
 
    
    if(loading===true)
    {
      return <div  className={Styles.maincontent} >  fetching posts....</div>
    }
    else if(posts.length==0)
    {
      return <div className={Styles.maincontent}>
        Seems like you are not following any one , please follow others to see their posts
      </div>
    }
    else{
  return (
    <>
      <div className={Styles.maincontent}>
       {posts.map((post,key)=>(
            <div key={key} className={Styles.singlecontainer}>
            <div className={Styles.topdiv}>
              <img src={profilepic} />
              <h5>{post.username}</h5>
            </div>
            <button onDoubleClick={likefunction}  className={Styles.imgdiv}>
              <img src={post.picture} width="100%" height="200px" />
            </button>
            <div className={Styles.bottomdiv}>
            {liked ? <span  onClick={unlikefunction}   >💖 {likecount}</span  > : <span  onClick={likefunction}  >🤍 {likecount}</span>}
              
              <span>💬 5</span>
             
              <img src={sharepic} width="4.5%" height="2%" />
            </div>
          </div>
        
       ))}
       
      </div>
    </>
  );}
};
export default Contentmain;

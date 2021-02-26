import Styles from "./Content.module.css";

import {getpostsforfeed} from '../../../methods/getpostsforfeed'
import sharepic from "./images/share.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import getitem from '../../../methods/getitem';
const Contentmain = () => {
  const [liked, setlike] = useState(false);
  const [likecount,setlikecount]=useState(0);

 const [posts,setposts]=useState([]);
 const {_id,profilepic,username}=useSelector(state=>state.user)
 const [loading,setloading]=useState(false);
  const likefunction=()=>{
    liked?setlikecount(likecount):setlikecount(likecount+1);
    setlike(true);
  }
  const unlikefunction=()=>{
!liked || likecount==0?setlikecount(likecount):setlikecount(likecount-1);
setlike(false);
  }
  useEffect(()=>{
    setloading(true);
   
   getpostsforfeed(username).then(post=>{setposts(post); console.log(post); setloading(false);}).catch(err=>console.log(err));
    getitem(username).then(item=>item.following.map((dat)=>{
      setloading(true);
      getpostsforfeed(dat.username).then(post=>{
        console.log(post);
      }).catch(err=>console.log(err));
    }))
    },[])
    if(loading)
    {
      return <div  className={Styles.maincontent} >  fetching posts....</div>
    }
    if(posts.length==0)
    {
      return <div className={Styles.maincontent}>
        Seems like you are not following any one , please follow others to see their posts
      </div>
    }
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
  );
};
export default Contentmain;

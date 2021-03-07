import Styles from "./Content.module.css";

import {getpostsforfeed} from '../../../methods/getpostsforfeed'
import sharepic from "./images/share.png";
import { useEffect, useState } from "react";
import getuser from '../../../methods/getuser'
import { useSelector } from "react-redux";
import getitem from '../../../methods/getitem';
import updatelikes from '../../../methods/updatelikes';
import deletelike from '../../../methods/deletelike';
const Contentmain = () => {
  const {_id,profilepic,username}=useSelector(state=>state.user)
  const [liked, setlike] = useState(false);
  const [likecount,setlikecount]=useState(0);
  

 const [posts,setposts]=useState([{username:"",picture:"",pic:null}]);

 const [loading,setloading]=useState(true);

  const likefunction=(post)=>{
    setlike(true);
    post.liked=true;

    updatelikes({username:username,id:post._id});
  }
  const unlikefunction=(post)=>{
    setlike(false);
deletelike({username:username,id:post._id});
  
  }
  let post1=[];
  const call_func=()=>{
   if(username)
   {
    getpostsforfeed(username).then(post=>{  post1=post;  
      post1.map(ele=>{ele["pic"]=profilepic; });
     
      getothers();   console.log(post,"own"); }).catch(err=>console.log(err));
   }
  }
  const getothers=()=>{
    let post2=[];
    getitem(username).then(item=>item?.following?.map((dat)=>{
     
      getpostsforfeed(dat.username).then(post=>{
        post2=post;
        getuser(dat.username).then(ele=>post2.map(elee=>{elee["pic"]=ele.profilepic;
      
        setposts([...post1,...post2]);
       
        setloading(false);
     
    })
  
    
    );

     
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
              <img src={post.pic} />
            
              <h5>{post.username}</h5>
            </div>
            <button onDoubleClick={likefunction}  className={Styles.imgdiv}>
              <img src={post.picture} width="100%" height="200px" />
            </button>
            <div className={Styles.bottomdiv}>
            {post.likes.find(ele=>ele.username===username)  ? <span onClick={()=>unlikefunction(post)}    >💖 {post.likes.length}</span  > : <span  onClick={()=>likefunction(post)}  >🤍 {likecount}</span>}
              
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

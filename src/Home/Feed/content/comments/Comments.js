import { useEffect, useState } from 'react';
import Addcomment from './Addcomment';
import addcomment  from '../../../../methods/addcomments'
import Styles from './Comments.module.css'
const Comment=({username,showcomments,setcommentsfunc})=>{
   const [post,setpost]=useState(showcomments.post);
   
   const addCommentFunc=async(comment)=>{
    let id=showcomments.post._id;
    let ne=await addcomment(id,username,comment);
     setpost(ne);
   

 }
 useEffect(()=>{

 },[post])
    return(
<div className={Styles.maindiv}>
<button className={Styles.backbut}  onClick={()=>setcommentsfunc({val:false,post:null})} >back</button>
<Addcomment  addCommentFunc={addCommentFunc}   />
<div className={Styles.main}  >
{post?.comments.map((ele,id)=>{
   return(
    <div className={Styles.commentdiv}  key={id}   >
    <div className={Styles.username}>@{ele.username} </div>
    <div className={Styles.comment}   >{ele.comment}</div>
   
 </div>
   )
})}
</div>
</div>
  
   )
}

export default Comment;
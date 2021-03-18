import { useEffect, useState } from 'react';
import Addcomment from './Addcomment';
import addcomment  from '../../../../methods/addcomments'
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
<>
<button onClick={()=>setcommentsfunc({val:false,post:null})}   >back</button>
<Addcomment addCommentFunc={addCommentFunc}   />
{post?.comments.map((ele,id)=>{
   return(
    <div  key={id}   >
    <div>{ele.username}</div>
    <div>{ele.comment}</div>
 </div>
   )
})}
</>
  
   )
}

export default Comment;
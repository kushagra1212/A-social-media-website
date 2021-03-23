import {useState} from 'react';

const Addcomment = ({addCommentFunc})=>{
   const [comment,setcomment]=useState("");
 
    return(
        <>
        <input placeholder="Add Comment" type="text" value={comment}  onChange={e=>setcomment(e.target.value)}  />
        <button onClick={()=>{addCommentFunc(comment);  setcomment("");}}  > Add </button>
        </>
    )
   
}
export default Addcomment;
import {useState} from 'react';
import Styles from './Addcomment.module.css'
const Addcomment = ({addCommentFunc})=>{
   const [comment,setcomment]=useState("");
   const add_comment_handle=(event)=>{
      
    if(comment!="")
    {
     
            addCommentFunc(comment);
              setcomment("");
  
    }

   } 
    return(
        <div className={Styles.maindiv}>
        <input placeholder="Write Comment" type="text" value={comment}  onChange={e=>setcomment(e.target.value)}  />
        <button style={comment==""?{opacity:0.2}:{opacity:1}} onKeyDown={(event)=>event.key=="Enter"?add_comment_handle():null} onClick={add_comment_handle}  > Add </button>
        </div>
    )
   
}
export default Addcomment;
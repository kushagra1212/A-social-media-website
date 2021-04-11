import {useState} from 'react';
import Styles from './Addcomment.module.css'
const Addcomment = ({addCommentFunc})=>{
   const [comment,setcomment]=useState("");
 
    return(
        <div className={Styles.maindiv}>
        <input placeholder="Add Comment" type="text" value={comment}  onChange={e=>setcomment(e.target.value)}  />
        <button onClick={()=>{addCommentFunc(comment);  setcomment("");}}  > Add </button>
        </div>
    )
   
}
export default Addcomment;
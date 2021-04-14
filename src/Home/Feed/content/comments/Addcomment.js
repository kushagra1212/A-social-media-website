import {useState} from 'react';
import Styles from './Addcomment.module.css'
const Addcomment = ({addCommentFunc})=>{
   const [comment,setcomment]=useState("");
 
    return(
        <div className={Styles.maindiv}>
        <input placeholder="Write Comment" type="text" value={comment}  onChange={e=>setcomment(e.target.value)}  />
        <button onClick={()=>{addCommentFunc(comment);  setcomment("");}}  > Add </button>
        </div>
    )
   
}
export default Addcomment;
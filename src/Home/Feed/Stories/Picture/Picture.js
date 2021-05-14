import {useState} from 'react';
import Styles from './Picture.module.css';
import {useDispatch} from 'react-redux';
import {show_user_stories_handle} from '../../../../reduces/actions/StoriesAction';
const Picture=({documents,set_picture_handle})=>{
    const [count,setcount]=useState(0);
    const dispatch=useDispatch();
    return (
        <div className={Styles.maindiv} >
        <button className={Styles.addMore} onClick={()=>set_picture_handle(false)}  >Add more</button>
       <div className={Styles.pictures}>
               <img className={Styles.picture} src={documents[count].picture} width="100px"/ ></div>
               <button  className={Styles.next}  onClick={()=>count+1<=documents.length-1?setcount(count+1):dispatch(show_user_stories_handle(false))}    > </button>
               <button  className={Styles.previous}  onClick={()=>count-1>=0?setcount(count-1):dispatch(show_user_stories_handle(false))}    > </button>
        </div>
      
    )
}
export default Picture;
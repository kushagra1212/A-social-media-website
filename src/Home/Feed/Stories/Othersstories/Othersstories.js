import Styles from '../Picture/Picture.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {useState} from 'react';
import {show_others_stories_handle} from '../../../../reduces/actions/StoriesAction';

const Othersstories=()=>{
  const dispatch=useDispatch();
  const { show_others_stories,othersStories } = useSelector((state) => state.Stories);
  const [count,setcount]=useState(0);
  return(
    <>
 
      {othersStories.map((ele,id)=>{
        let documents=ele.stories;
        return(
          <div className={Styles.maindiv} >
<button onClick={()=>dispatch(show_others_stories_handle(false,-1))}  >BACK</button>
          <div className={Styles.pictures}>
          
          
                  
                  <img className={Styles.picture} src={documents[count].picture} width="100px"/ ></div>
                  <button  className={Styles.next}  onClick={()=>count+1<=documents.length-1?setcount(count+1):dispatch(show_others_stories_handle(false,-1))}    > </button>
                  <button  className={Styles.previous}  onClick={()=>count-1>=0?setcount(count-1):dispatch(show_others_stories_handle(false,-1))}    > </button>
           </div>
        )
      })}

    </>
    )
}
export default Othersstories;
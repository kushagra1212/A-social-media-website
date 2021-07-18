import Styles from '../Picture/Picture.module.css';
import {useSelector,useDispatch} from 'react-redux';
import {useState} from 'react';
import {show_others_stories_handle} from '../../../../reduces/actions/StoriesAction';
import Picture from '../Picture/Picture';
const Othersstories=()=>{
  const dispatch=useDispatch();
  const { show_others_stories,othersStories } = useSelector((state) => state.Stories);
  const [count,setcount]=useState(0);
  const {username}=useSelector(state=>state.user);
  const [showpictures, setshowpictures] = useState(true);
  const set_picture_handle = (ans) => {
    setshowpictures(ans);
  };
  return(
    <>
    {othersStories.map((element,id)=>
    {
      if(element.username!=username)
      {
        return (<Picture
          other={true }
          key={id}
            documents={element.stories}
            set_picture_handle={set_picture_handle}
          />);
      }else{
        return null;
      }
    }
    )}
    
    </>
    )
}
export default Othersstories;
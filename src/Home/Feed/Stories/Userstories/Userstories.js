import Styles from "./Userstories.module.css";
import FileBase64 from "react-file-base64";
import {
  show_user_stories_handle,
  show_webcam_handle,
} from "../../../../reduces/actions/StoriesAction";
import { useDispatch,useSelector } from "react-redux";
import {useState} from 'react';
import cameraimg from "./cameraimg.png";
import Webcamcapture from "../Webcam/Webcamcapture";
import Picture from '../Picture/Picture';
const Userstories = () => {
  const dispatch = useDispatch();
  const { show_webcam } = useSelector((state) => state.Stories);
  const {picture}=useSelector(state=>state.Stories);
  const [showpictures,setshowpictures]=useState(true);

const set_picture_handle=(ans)=>{
 setshowpictures(ans);
}

  if(picture.length>=1 && showpictures)
    return( <div className={Styles.stories}><Picture pictures={picture} set_picture_handle={set_picture_handle}  /></div>)

  if (show_webcam)
    return (
      <div className={Styles.cameradiv}>
        <button
        onClick={() => {dispatch(show_webcam_handle(false));}}
        className={Styles.backbut}
      >BACK</button>
       
        <Webcamcapture />
      </div>
    );

  return (
    <div className={Styles.maindiv}>
      <button
        onClick={() => {dispatch(show_user_stories_handle(false));}}
        className={Styles.backbut}
      >
        Back
      </button>
      <div className={Styles.file}>
        <FileBase64 />
      </div>
      <div
        className={Styles.camera}
        onClick={() => dispatch(show_webcam_handle(true))}
      >
        <img width="100%" height="100%" src={cameraimg} alt="NAN" />
      </div>
    </div>
  );
};
export default Userstories;

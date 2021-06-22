import Styles from "./Userstories.module.css";
import FileBase64 from "react-file-base64";
import {
  show_user_stories_handle,
  show_webcam_handle,
} from "../../../../reduces/actions/StoriesAction";
import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useSpring,animated } from "react-spring";
import cameraimg from "./cameraimg.png";
import backImg from './backImage.png';
import Webcamcapture from "../Webcam/Webcamcapture";
import Picture from "../Picture/Picture";
import { uploadstories } from "../../../../methods/uploadstories";
const Userstories = () => {
  const dispatch = useDispatch();
  const { show_webcam, show_others_stories } = useSelector(
    (state) => state.Stories
  );
  const { username } = useSelector((state) => state.user);
  const { documents } = useSelector((state) => state.Stories);
  const [showpictures, setshowpictures] = useState(true);
  const [file, setfile] = useState(null);

  const set_picture_handle = (ans) => {
    setshowpictures(ans);
  };

  const [styleOne,animateOne]=useSpring({x:100},[]);
  const [styleTwo,animateTwo]=useSpring({y:-100},[])
  useEffect(()=>{
    animateOne.start({x:0,y:0});
    animateTwo.start({y:0,x:0});
  },[,showpictures,show_webcam])

  const save_button_handle = () => {
    setTimeout(() => {
      dispatch(show_user_stories_handle(false));
    }, 400);
    uploadstories(username, file, dispatch);
    setfile(null);
  };

  if (documents.length >= 1 && showpictures)
    return (
      <div className={Styles.stories}>
        <Picture
          documents={documents}
          set_picture_handle={set_picture_handle}
        />
      </div>
    );

  if (show_webcam)
    return (
      <div  className={Styles.cameradiv}>
        <button 
          onClick={() => {
            dispatch(show_webcam_handle(false));
          }}
          className={Styles.backbut}
        >
          <span  className={Styles.back}>BACK</span>
        </button>
        <Webcamcapture />
      </div>
    );

  return (
    <div className={Styles.maindiv}>
      
      <animated.div style={styleTwo}><button
        onClick={() => {
          dispatch(show_user_stories_handle(false));
        }}
        className={Styles.backbut}
      >
        <span className={Styles.back}>BACK</span>
      </button></animated.div>

      <animated.div style={styleOne} className={Styles.file}>
        <FileBase64 multiple={false} onDone={(e) => setfile(e.base64)} />
        {file ? (
          <div>
            <img src={file} width="100px" height="100px" />
            <button onClick={save_button_handle}>Add to Stories</button>
          </div>
        ) : null}
      </animated.div>
      <animated.div
      style={styleOne}
        className={Styles.camera}
        onClick={() => dispatch(show_webcam_handle(true))}
      >
        <img width="100%" height="100%" src={cameraimg} alt="NAN" />
      </animated.div>
    </div>
  );
};
export default Userstories;

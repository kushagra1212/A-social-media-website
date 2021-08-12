import Webcam from "react-webcam";
import { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  show_user_stories_handle,
  show_webcam_handle,
} from "../../../../reduces/actions/StoriesAction";
import Styles from "./Webcamcapture.module.css";
import {animated, useSpring} from 'react-spring';
import { uploadstories } from "../../../../methods/uploadstories";
const Webcamcapture = () => {
  const [imagecaptured, setimagecaptured] = useState(null);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);
  const { picture, started, _id } = useSelector((state) => state.Stories);
  const [isUnmounted,setIsUnmounted]=useState(false);
  const webcamRef = useRef(null);
  const videoContraints = {
    facingMode: "user",
    height: 400,
    width:400
  };

  const takePhotoButStyle=useSpring({
    transform:imagecaptured?"scale(1.2,1.2)":"scale(1,1)"

  })
  const savePhotoButStyle=useSpring({
    transform:loading===false?"scale(1.2,1.2)":"scale(1,1)"
  })


  const save_button_handle = () => {
    setloading(true);
    uploadstories(username, imagecaptured, dispatch);

    setTimeout(() => {
      setloading(false);
      dispatch(show_webcam_handle(false));
      dispatch(show_user_stories_handle(false));
    }, 2000);
  };

  const capture = useCallback(() => {
     if(!isUnmounted)
     {
      const image = webcamRef.current.getScreenshot();
      setimagecaptured(image);
     }

     return ()=>setIsUnmounted(true);

  }, [webcamRef]);

  return (
    <div className={Styles.maindiv}>
      {imagecaptured == null ? (
        <div className={Styles.webcamdiv}>
          <Webcam
            audio={false}
            height="100%"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            videoConstraints={videoContraints}
          />
          <animated.button onClick={capture} style={takePhotoButStyle}  className={Styles.capturebut}>
            Take Photo
          </animated.button>
        </div>
      ) : (
        <div className={Styles.webcamdiv}>
          <img className={Styles.imagecaptured} src={imagecaptured} alt="NAN" />
          <button
            onClick={() => setimagecaptured(null)}
            className={Styles.capturebut}
          >
            Retake
          </button>
          <animated.button style={savePhotoButStyle} className={Styles.savebut}  onClick={save_button_handle}>Save</animated.button>
        </div>
      )}
    </div>
  );
};
export default Webcamcapture;

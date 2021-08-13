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
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import "./webcam.css"
const Webcamcapture = () => {
  const [imagecaptured, setimagecaptured] = useState(null);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);
  const { picture, started, _id } = useSelector((state) => state.Stories);
  const [isUnmounted,setIsUnmounted]=useState(false);
  const webcamRef = useRef(null);
  const [retake,setRetake]=useState(true);
  // const videoContraints = {
  //   facingMode: "user",
  //   height: 300,
  //   width:300
  // };

  const takePhotoButStyle=useSpring({
    transform:imagecaptured?"scale(1.2,1.2)":"scale(1,1)"

  })
  const savePhotoButStyle=useSpring({
    transform:loading===false?"scale(1.2,1.2)":"scale(1,1)"
  })
  
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    
    setimagecaptured(dataUri);
    setRetake(false);
    console.log('takePhoto');
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
  
    console.log(  'takePhoto');
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');
  }

  const save_button_handle = () => {
   
    setloading(true);
    uploadstories(username, imagecaptured, dispatch);

    setTimeout(() => {
      setloading(false);
      dispatch(show_webcam_handle(false));
      dispatch(show_user_stories_handle(false));
    }, 2000);
  };

  // const capture = useCallback(() => {
  //    if(!isUnmounted)
  //    {
  //     const image = webcamRef.current.getScreenshot();
  //     console.log(image);
  //     setimagecaptured(image);
  //    }

  //    return ()=>setIsUnmounted(true);

  // }, [webcamRef]);


 
  return (
    // <div className={Styles.maindiv}>
    //   {imagecaptured == null ? (
    //     <div className={Styles.webcamdiv}>
    //       <Webcam
    //         audio={false}
    //         height="100%"
    //         ref={webcamRef}
    //         screenshotFormat="image/jpeg"
    //         width="100%"
    //         videoConstraints={videoContraints}
    //       />
    //       <button onClick={capture}   className={Styles.capturebut}>
    //         Take Photo
    //       </button>
    //     </div>
    //   ) : (
    //     <div className={Styles.webcamdiv}>
    //       <img className={Styles.imagecaptured} src={imagecaptured} alt="NAN" />
          // <button
          //   onClick={() => setimagecaptured(null)}
          //   className={Styles.capturebut}
          // >
          //   Retake
          // </button>
    //       <animated.button style={savePhotoButStyle} className={Styles.savebut}  onClick={save_button_handle}>Save</animated.button>
    //     </div>
    //   )}
    // </div>
  <>
 {retake?   <Camera
    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
    onCameraError = { (error) => { handleCameraError(error); } }
    idealFacingMode = {FACING_MODES.ENVIRONMENT}
    idealResolution = {{width: 640, height: 480}}
    imageType = {IMAGE_TYPES.JPG}
    imageCompression = {0.40}
    isMaxResolution = {true}
    isImageMirror = {false}
    isSilentMode = {false}
    isDisplayStartCameraError = {true}
    isFullscreen = {true}
    sizeFactor = {1}
    onCameraStart = { (stream) => { handleCameraStart(stream); } }
    onCameraStop = { () => { handleCameraStop(); } }
  />:<>
  <img className={Styles.imagecaptured} src={imagecaptured} alt="NAN" />
    <animated.button style={savePhotoButStyle} className={Styles.savebut}  onClick={save_button_handle}>UPLOAD</animated.button>
    <button
            onClick={() => setRetake(true)}
            className={Styles.capturebut}
          >
            Retake
          </button>
  
  </>}

  </>
  );
};
export default Webcamcapture;

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  show_user_stories_handle,
  show_webcam_handle,
} from '../../../../reduces/actions/StoriesAction';
import Styles from './Webcamcapture.module.css';
import { animated, useSpring } from 'react-spring';
import { uploadstories } from '../../../../methods/uploadstories';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './webcam.css';
const Webcamcapture = () => {
  const [imagecaptured, setimagecaptured] = useState(null);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { username, profilepic } = useSelector((state) => state.user);

  const [retake, setRetake] = useState(true);

  const savePhotoButStyle = useSpring({
    transform: loading === false ? 'scale(1.2,1.2)' : 'scale(1,1)',
  });

  function handleTakePhoto(dataUri) {
    setRetake(false);
    setimagecaptured(dataUri);

    console.log('takePhoto');
  }

  function handleTakePhotoAnimationDone(dataUri) {
    console.log('takePhoto');
  }

  function handleCameraError(error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart(stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop() {
    console.log('handleCameraStop');
  }

  const save_button_handle = () => {
    setloading(true);
    uploadstories(username, imagecaptured, profilepic, dispatch);

    setTimeout(() => {
      setloading(false);
      dispatch(show_webcam_handle(false));
      dispatch(show_user_stories_handle(false));
    }, 2000);
  };

  return (
    <>
      {retake ? (
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
          onTakePhotoAnimationDone={(dataUri) => {
            handleTakePhotoAnimationDone(dataUri);
          }}
          onCameraError={(error) => {
            handleCameraError(error);
          }}
          idealFacingMode={FACING_MODES.USER}
          idealResolution={{ width: 640, height: 480 }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.2}
          isMaxResolution={true}
          isImageMirror={false}
          isSilentMode={false}
          isDisplayStartCameraError={true}
          isFullscreen={true}
          sizeFactor={1}
          onCameraStart={(stream) => {
            handleCameraStart(stream);
          }}
          onCameraStop={() => {
            handleCameraStop();
          }}
        />
      ) : (
        <>
          <img className={Styles.imagecaptured} src={imagecaptured} alt="NAN" />
          <animated.button
            style={savePhotoButStyle}
            className={Styles.savebut}
            onClick={save_button_handle}
          >
            UPLOAD
          </animated.button>
          <button onClick={() => setRetake(true)} className={Styles.capturebut}>
            Retake
          </button>
        </>
      )}
    </>
  );
};
export default Webcamcapture;

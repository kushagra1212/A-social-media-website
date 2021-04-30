import Webcam from 'react-webcam';
import {useRef,useCallback,useState} from 'react';
import {useDispatch} from 'react-redux';
import {show_user_stories_handle, show_webcam_handle} from '../../../../reduces/actions/StoriesAction';
import Styles from './Webcamcapture.module.css';
const Webcamcapture=()=>{
    const [imagecaptured,setimagecaptured]=useState(null);
    const dispatch=useDispatch();
 const webcamRef=useRef(null);
const videoContraints={
  
    facingMode:"user"
};

const capture=useCallback(()=>{
   const image=webcamRef.current.getScreenshot();
   setimagecaptured(image);
},[webcamRef])
return (
    <div className={Styles.maindiv} >
  
    {imagecaptured==null?<><Webcam 
    audio={false}
    height="100%"
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    width="100%"
    videoConstraints={videoContraints}
    />
    <button onClick={capture} className={Styles.capturebut} >Take Photo</button></>:<>
    <img className={Styles.imagecaptured}  src={imagecaptured} alt="NAN"  />
    <button onClick={()=>setimagecaptured(null)} className={Styles.capturebut} >Retake</button>
    </>}
    </div>
)


}
export default Webcamcapture;
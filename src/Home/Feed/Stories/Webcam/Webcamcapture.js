import Webcam from 'react-webcam';
import {useRef,useCallback,useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {show_user_stories_handle, show_webcam_handle} from '../../../../reduces/actions/StoriesAction';
import Styles from './Webcamcapture.module.css';
import {uploadstories,updatestories} from '../../../../methods/uploadstories';
const Webcamcapture=()=>{
    const [imagecaptured,setimagecaptured]=useState(null);
    const [loading ,setloading]=useState(false);
    const dispatch=useDispatch();
    const {username,}=useSelector(state=>state.user)
    const {picture,started,_id}=useSelector(state=>state.Stories);
 const webcamRef=useRef(null);
const videoContraints={
    facingMode:"user"
};

const save_button_handle=()=>{
    setloading(true);
    //if(started==false)   uploadstories(username,dispatch);
    dispatch(show_webcam_handle(false));   
     dispatch(show_user_stories_handle(false));
    updatestories(_id,imagecaptured,dispatch);
     
}
setTimeout(()=>{
setloading(false);
},1000);

const capture=useCallback(()=>{
   const image=webcamRef.current.getScreenshot();
   setimagecaptured(image);
},[webcamRef]);

return (
    <div className={Styles.maindiv} >
  
    {imagecaptured==null?<div className={Styles.webcamdiv} ><Webcam 
    audio={false}
    height="100%"
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    width="100%"
    videoConstraints={videoContraints}
   
    />
    <button onClick={capture} className={Styles.capturebut} >Take Photo</button></div>:<div  className={Styles.webcamdiv} >
    <img className={Styles.imagecaptured}  src={imagecaptured} alt="NAN"  />
    <button onClick={()=>setimagecaptured(null)} className={Styles.capturebut} >Retake</button>
    <button onClick={save_button_handle}  >Save</button>
   
    </div>}
    </div>
)


}
export default Webcamcapture;
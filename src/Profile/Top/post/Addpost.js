import { useState,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatecountforpost } from "../../../reduces/actions/countAction";
import axios from "axios";
import Styles from "./Addpost.module.css";
import { useSpring,animated } from "react-spring";
import { useAlert } from "react-alert";
import ProgressBar from "../../../Animation/Loader/Progressbar/ProgressBar";
import ImageCropper from "../ImageCroper/ImageCropper";
import { getCroppedImg } from "../../../methods/createcrop";
import {resetUserPosts,resetFeedPosts} from "../../../reduces/actions/userAction";
const URL = process.env.REACT_APP_URL;
const Addpost = ({ setposthandle }) => {
  const [pic, setPic] = useState(null);
  const [desc, setdesc] = useState("");
  const ALert=useAlert();
  const Refinput=useRef();
  const { username } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [selectedFile,setSelectedFile]=useState(null);
  const [image, setImage] = useState(null);
	const [croppedArea, setCroppedArea] = useState(null);
	const [crop, setCrop] =useState({ x: 0, y: 0 });
  const [progress,setProgress]=useState(0);
  const dispatch = useDispatch();
  const { postcount } = useSelector((state) => state.count);
  const savehandle = async (e) => {

    if(selectedFile==null)
    {
     
      ALert.error("Oops ! 😜");
      return;
    }
    setloading(!loading);
    const data=new FormData(e.target);
    data.append('file',selectedFile);
    
    try {
      const res = await axios.post(`${URL}/post/uploadpost`,data,{
        params:{username:username,desc:desc},   onUploadProgress: data => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
       
        }
      });
   

      dispatch(resetFeedPosts());
      dispatch(resetUserPosts());
    
      setloading(!loading);
      setposthandle(false);
      window.location.reload("/main");
    } catch (err) {
      console.log(err);
    }
    dispatch(updatecountforpost(username, postcount));
  };
  
  const selectedFileHandle=(e)=>{
    e.preventDefault();
  
      const reader= new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load",()=>{
        setImage(reader.result);
         console.log(Image);
      })
   
      
      setSelectedFile(e.target.files[0]); 
      //this was previous code   
          // setPic(global.URL.createObjectURL(e.target.files[0]));
  
    }

    const openChoosefile=()=>{
      Refinput.current.click();
  }

  const generateDownload = async (imageSrc, crop) => {
    
    if (!crop || !imageSrc) {
      return;
    }
  setloading(true);
    const canvas = await getCroppedImg(imageSrc, crop);

    canvas.toBlob(
      (blob) => {
  
        const previewUrl = window.URL.createObjectURL(blob);
    
        const anchor = document.createElement("a");
  
        anchor.href = window.URL.createObjectURL(blob);
    
        setPic(anchor.href);
  
        window.URL.revokeObjectURL(previewUrl);
 
   //     setSelectedFile(blob);
   
     setloading(false);  
     setImage(null);
      },
      "image/",
      0.01
    );

  };
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  
  };
  
  const Popup = useSpring({
    
    from: { y:"-70%",x:"5%" ,transform:"scale(0.2)"},
   y: "-50%",x:"-50%",transform:"scale(1)",
   
    config: { mass: 10, tension: 10, friction: 1,duration:100 },
  });
  if (loading) {
    return (
      <div  className={Styles.cropdiv}  style={{backgroundColor:"white"}}  >
        <label style={{color:"black",frontSize:"100px"}}  >{progress!==0?"Wait for a while !  Uploading...":"Loading..."}</label>
        <ProgressBar bgcolor="#99ff66" progress={progress}  height={30} />
      </div>
    );
  }else if(image){
 
    return (
    <div className={Styles.cropdiv} >
    <ImageCropper
      crop={crop}
      image={image}
      setCrop={setCrop}
      onCropComplete={onCropComplete}
      generateDownload={generateDownload}
      setImage={setImage}
      croppedArea={croppedArea}
    />
       </div>
    ) 

    
  }
  return (
<>
     <animated.form className={Styles.maindiv} style={Popup} onSubmit={e=>savehandle(e)}>
     <button onClick={() => setposthandle(false)}>Back</button>
     {pic?<img className={Styles.editimg} src={pic?pic:process.env.PUBLIC_URL+'/userImage.png'} alt=""/>:null}
    
    <input style={{display:"none"}}  type="file" ref={Refinput}  onChange={selectedFileHandle}/>

    <button className={Styles.choosebutton} type="button" onClick={openChoosefile} >Choose Image</button>
  
      <textarea
        type="name"
        value={desc}
        onChange={(e) => setdesc(e.target.value.substr(0, 100))}
        placeholder="    Write Something 😜   "
      />
      <button type="submit">save</button>
     </animated.form></>
 
  );
};

export default Addpost;

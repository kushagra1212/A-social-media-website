import Styles from "./Userstories.module.css";
import FileBase64 from "react-file-base64";
import {
  show_user_stories_handle,
  show_webcam_handle,
} from "../../../../reduces/actions/StoriesAction";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import cameraimg from "./cameraimg.png";
import backImg from "./backImage.png";
import ImageCropper from "../../../../Profile/Top/ImageCroper/ImageCropper";
import Webcamcapture from "../Webcam/Webcamcapture";
import Picture from "../Picture/Picture";
import ProgressBar from "../../../../Animation/Loader/Progressbar/ProgressBar";
import { uploadstories } from "../../../../methods/uploadstories";
import { data_URL_to_file } from "../../../../methods/data_URL_to_file";
import { getCroppedImg } from "../../../../methods/createcrop";
const Userstories = () => {
  const dispatch = useDispatch();
  const [pic, setPic] = useState(null);
  const { show_webcam, show_others_stories } = useSelector(
    (state) => state.Stories
  );
  const { username } = useSelector((state) => state.user);
  const { documents } = useSelector((state) => state.Stories);
  const [showpictures, setshowpictures] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);
  const Refinput = useRef();
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [showChoosebut,setShowChoosebut]=useState(true);
 

  const set_picture_handle = (ans) => {
    setshowpictures(ans);
  };

  const [styleOne, animateOne] = useSpring({ x: 100 }, []);
  const [styleTwo, animateTwo] = useSpring({ y: -100 }, []);
  useEffect(() => {
    animateOne.start({ x: 0, y: 0 });
    animateTwo.start({ y: 0, x: 0 });
  }, [showpictures, show_webcam,animateTwo,animateOne]);

  const selectedFileHandle = (e) => {
    e.preventDefault();
    setShowChoosebut(false);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
   
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });

    //  setSelectedFile(e.target.files[0]);
    // this was previous code
    // setPic(global.URL.createObjectURL(e.target.files[0]));
  };

  const openChoosefile = () => {
    Refinput.current.click();
  };

  const generateDownload = async (imageSrc, crop) => {
    if (!crop || !imageSrc) {
      return;
    }
    setloading(true);
    const canvas = await getCroppedImg(imageSrc, crop);
    let dataURL = canvas.toDataURL("image/jpeg", 0.1);

    setSelectedFile(dataURL);

    setPic(dataURL);
    setloading(false);
    setImage(null);
  };
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  const save_button_handle = () => {
    setloading(true);

    uploadstories(username, selectedFile, dispatch)
      .then((res) => {
        setloading(false);
        setSelectedFile(null);
        dispatch(show_user_stories_handle(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(show_user_stories_handle(false));
      });
  };

  if (documents.length >= 1 && showpictures)
    return (
      <Picture
        other={false}
        documents={documents}
        set_picture_handle={set_picture_handle}
      />
    );

  if (show_webcam)
    return (
      <div className={Styles.cameradiv}>
   

        <span
            
            style={{ fontSize: "50px", color: "blue", cursor: "pointer" }}
            onClick={() => {
              dispatch(show_webcam_handle(false));
            }}
          >
            <i
              styles={{ color: "Dodgerblue", cursor: "pointer" }}
              className="fa fa-arrow-circle-left"
            ></i>
          </span>
        <Webcamcapture />
      </div>
    );
  if (loading) {
    return (
      <div className={Styles.cropdiv} style={{ backgroundColor: "white" }}>
        <label style={{ color: "black", frontSize: "100px" }}>
          {progress !== 0 ? "Wait for a while !  Uploading..." : "Loading..."}
        </label>
        <ProgressBar bgcolor="#99ff66" progress={progress} height={30} />
      </div>
    );
  } else if (image) {
    return (
      <div className={Styles.cropdiv}>
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
    );
  }

  return (
    <div className={Styles.maindiv}>
      <animated.div style={styleTwo}>
      
      
      <span
            
            style={{ fontSize: "50px", color: "blue", cursor: "pointer" }}
            onClick={() => {
              dispatch(show_user_stories_handle(false));
            }}
          >
            <i
              styles={{ color: "Dodgerblue", cursor: "pointer" }}
              className="fa fa-arrow-circle-left"
            ></i>
          </span>
   
          </animated.div>
      {pic ? (
      <>
        <img
          className={Styles.editimg}
          src={pic ? pic : process.env.PUBLIC_URL + "/userImage.png"}
          alt=""
        />
        
        <button className={Styles.savebut} onClick={save_button_handle}>Add to Stories</button>
      </>
      ) : null}

      <input
        style={{ display: "none" }}
        type="file"
        ref={Refinput}
        onChange={selectedFileHandle}
      />

      {showChoosebut?<button
        className={Styles.choosebutton}
        type="button"
        onClick={openChoosefile}
      >
        Choose Picture
      </button>:null}
      <animated.div style={styleOne} >
      
      </animated.div>
      {window.screen.width>=768? <animated.div
        style={styleOne}
        className={Styles.camera}
        onClick={() => dispatch(show_webcam_handle(true))}
      >
        <img width="100%" height="100%" src={cameraimg} alt="NAN" />
      </animated.div>:null}
    </div>
  );
};
export default Userstories;

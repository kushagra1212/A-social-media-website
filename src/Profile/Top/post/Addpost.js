import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatecountforpost } from "../../../reduces/actions/countAction";
import axios from "axios";
import Styles from "./Addpost.module.css";
import { useSpring, animated } from "react-spring";
import { useAlert } from "react-alert";
import ProgressBar from "../../../Animation/Loader/Progressbar/ProgressBar";
import ImageCropper from "../ImageCroper/ImageCropper";
import Loader from "../../../Animation/Loader/Loader";
import { getCroppedImg } from "../../../methods/createcrop";
import {
  resetUserPosts,
  resetFeedPosts,
} from "../../../reduces/actions/userAction";
import { data_URL_to_file } from "../../../methods/data_URL_to_file";
import firebase from "../../../Firebase/index";
import VerticalLoader from "../../../Animation/Loader/loader/VerticalLoader";
import NormalLoader from "../../../Animation/Loader/loader/NormalLoader";
const URL = process.env.REACT_APP_URL;
const Addpost = ({ setposthandle }) => {
  const [pic, setPic] = useState(null);
  const [desc, setdesc] = useState("");
  const ALert = useAlert();
  const Refinput = useRef();
  const { username, profilepic } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const { postcount } = useSelector((state) => state.count);
  const [fileName, setfileName] = useState("");

  const upload = async (ul) => {
    try {
      const res = await axios.post(
        `${URL}/post/addpost`,
        {
          username: username,
          picture: ul,
          desc: desc,
          profilepic: profilepic,
        },
        {
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total));
          },
        }
      );
      const resP=await axios.patch(`${URL}/count/increasepostcount`,{
        username:username
      });
       window.location.reload("/main");
  
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateItemImage = (e) => {
    if (selectedFile == null) {
      ALert.error("Oops ! 😜");
      return;
    }

    setloading(!loading);
    const storage = firebase.storage();

    const uploadTask = storage
      .ref(`photos/${selectedFile.name}`)
      .put(selectedFile);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("photos")
          .child(selectedFile.name)
          .getDownloadURL()
          .then((ul) => {
            console.log(ul);
            upload(ul);
          });
      }
    );
  };
  const savehandle = async (e) => {
    if (selectedFile == null) {
      ALert.error("Oops ! 😜");
      return;
    }
    setloading(!loading);
    const data = new FormData(e.target);
    data.append("file", selectedFile);

    try {
      const res = await axios.post(`${URL}/post/uploadpost`, data, {
        params: { username: username, desc: desc },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });
  
    } catch (err) {
      console.log(err);
    }
    dispatch(updatecountforpost(username, postcount));
  };

  const selectedFileHandle = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setfileName(e.target.files[0].name);
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
    let dataURL = canvas.toDataURL("image/jpeg", 0.25);

    setSelectedFile(data_URL_to_file(dataURL, fileName));
    canvas.toBlob(
      (blob) => {
        const previewUrl = window.URL.createObjectURL(blob);

        const anchor = document.createElement("a");

        anchor.href = window.URL.createObjectURL(blob);

        setPic(anchor.href);

        window.URL.revokeObjectURL(previewUrl);

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
    from: {marginTop:-500,opacity:0 },
    marginTop:0,
    opacity:1,
  });
  if (loading) {
    return (
      <div style={{width:"100vw",height:"100vh",zIndex:"100",position:"fixed",display:"flex",alignItems:"center",justifyContent:"center", backdropFilter: "blur(10px)"}}>
      <NormalLoader/>
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
    <div className={Styles.addpostDiv}>
      <animated.form
        className={Styles.maindiv}
        style={Popup}
        onSubmit={(e) => {}}
      >
        <span
          className={Styles.backbut}
          style={{ fontSize: "50px", color: "blue", cursor: "pointer" }}
          onClick={() => setposthandle(false)}
        >
          <i
            styles={{ color: "Dodgerblue", cursor: "pointer" }}
            className="fa fa-arrow-circle-left"
          ></i>
        </span>
        {pic ? (
          <img
            className={Styles.editimg}
            src={pic ? pic : process.env.PUBLIC_URL + "/userImage.png"}
            alt=""
          />
        ) : null}

        <input
          style={{ display: "none" }}
          type="file"
          ref={Refinput}
          onChange={selectedFileHandle}
        />

        <button
          className={Styles.choosebutton}
          type="button"
          onClick={openChoosefile}
        >
          Choose Picture
        </button>

        <textarea
          type="name"
          value={desc}
          onChange={(e) => setdesc(e.target.value.substr(0, 100))}
          placeholder="    Write Caption 😜   "
        />
        <button className={Styles.savebut} onClick={handleUpdateItemImage}>
          Upload
        </button>
      </animated.form>
    </div>
  );
};

export default Addpost;

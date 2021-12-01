import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useAlert } from "react-alert";
import { useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import Styles from "./Editprofile.module.css";
import ImageCropper from "./ImageCroper/ImageCropper";

import { getCroppedImg } from "../../methods/createcrop";
import ProgressBar from "../../Animation/Loader/Progressbar/ProgressBar";
import { data_URL_to_file } from "../../../src/methods/data_URL_to_file";
import NormalLoader from "../../Animation/Loader/loader/NormalLoader";
const URL = process.env.REACT_APP_URL;
const calcXY = (x, y) => [
  -(y - window.innerHeight / 2) / 10,
  (x - window.innerWidth / 2) / 10,
  1.0,
];

const perspective = (x, y, s) =>
  `perspective(500px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const Editprofile = ({ edit_it, setprofpichandle }) => {
  const Alert = useAlert();
  const Refinput = useRef();
  const dispatch = useDispatch();
  const { username, email, profilepic, _id, bio } = useSelector(
    (state) => state.user
  );

  const [newemail, setnewemail] = useState(email);
  const [newusername, setnewusername] = useState(username);
  const [loading, setloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pic, setPic] = useState(profilepic);
  const [newbio, setnewbio] = useState(bio);
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 200, friction: 100 },
  }));
  const save_it = async (e) => {
    setloading(true);
    try {
      const data = new FormData(e.target);
      data.append("file", selectedFile);

      console.log(selectedFile, "selcected");

      const res = await axios.patch(`${URL}/upload/updateuser`, data, {
        params: {
          email: newemail,
          username: newusername,
          _id: _id,
          profilepic: pic,
          bio: newbio,
        },
        onUploadProgress: (data) => {
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      });

      if (res) {
        setprofpichandle(pic);
        setloading(false);

        dispatch({
          type: "UPDATE_USER",
          payload: {
            email: newemail,
            username: newusername,
            profilepic: pic,
            bio: newbio,
          },
        });

        edit_it();
      } else console.log("err");
    } catch (err) {
      console.log(err);

      Alert.show("Bio word limit 80 😀 ");
      setTimeout(() => {
        setloading(false);
        edit_it();
      }, 50);
    }
  };
  const selectedFileHandle = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setFileName(e.target.files[0].name);
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });

  };

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const generateDownload = async (imageSrc, crop) => {
    if (!crop || !imageSrc) {
      return;
    }
    setloading(true);
    const canvas = await getCroppedImg(imageSrc, crop);
    let dataURL = canvas.toDataURL("image/jpeg", 0.7);

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

  const openChoosefile = () => {
    Refinput.current.click();
  };

  const floatDown = useSpring({
    from: { y: "-100%",opacity:"0%" },
    y: "0%",
    x: "0%",
    opacity:"100%",
  });
  const imageAni = useSpring({
    from:{marginTop:-500,opacity:0},
    marginTop:0,
    opacity:1
   });
   const cropAni = useSpring({
    
    marginTop:image?0:500,
    opacity:image?1:0
   });
  if (loading) {
    return (
      <div style={{width:"100vw",height:"100vh",zIndex:"100",position:"fixed",display:"flex",alignItems:"center",justifyContent:"center", backdropFilter: "blur(10px)"}}>
      <NormalLoader/>
      </div>
    );
  } else if (image) {
    return (
      <animated.div style={cropAni} className={Styles.cropdiv}>
        <ImageCropper
          crop={crop}
          image={image}
          setCrop={setCrop}
          onCropComplete={onCropComplete}
          generateDownload={generateDownload}
          setImage={setImage}
          croppedArea={croppedArea}
        />
      </animated.div>
    );
  } else {
    return (
      <animated.div style={floatDown} className={Styles.editprofileMain}>
                  <span
            className={Styles.backbut}
            style={{ fontSize: "50px", color: "blue", cursor: "pointer" }}
            onClick={edit_it}
          >
            <i
              styles={{ color: "Dodgerblue", cursor: "pointer" }}
              className="fa fa-arrow-circle-left"
            ></i>
          </span>
          {pic ? (
            <animated.img
           
            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calcXY(x, y) })}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.to(perspective) }}
              className={Styles.editimg}
              src={pic ? pic : process.env.PUBLIC_URL + "/userImage.png"}
              alt=""
            />
          ) : null}
      <animated.div  style={floatDown} className={Styles.Forms}>
      <form
          onSubmit={(e) => save_it(e)}
          className={Styles.editprofile}
          style={floatDown}
        >
        


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
            Choose Image
          </button>

          <label className={Styles.editlabel}>Email</label>
          <input
             disabled={true}
            onChange={(e) => setnewemail(e.target.value)}
            value={newemail}
          />
          <label className={Styles.editlabel}>User Name</label>
          <input
          disabled={true}
            onChange={(e) => setnewusername(e.target.value)}
            value={newusername}
          />
          <label className={Styles.editlabel}>Bio</label>
          <input onChange={(e) => setnewbio(e.target.value)} value={newbio} />
          <button type="submit" className={Styles.savebut}>
            save
          </button>
        </form>
      </animated.div>
      </animated.div>
    );
  }
};
export default Editprofile;

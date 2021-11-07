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
const URL = process.env.REACT_APP_URL;
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
    from: { y: "-100%" },
    y: "-50%",
    x: "-50%",

    config: { mass: 10, tension: 10, friction: 1, duration: 200 },
  });

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
  } else {
    return (
      <div className={Styles.editprofileMain}>
        <animated.form
          onSubmit={(e) => save_it(e)}
          className={Styles.editprofile}
          style={floatDown}
        >
        
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
            Choose Image
          </button>

          <label className={Styles.editlabel}>Email</label>
          <input
            onChange={(e) => setnewemail(e.target.value)}
            value={newemail}
          />
          <label className={Styles.editlabel}>User Name</label>
          <input
            onChange={(e) => setnewusername(e.target.value)}
            value={newusername}
          />
          <label className={Styles.editlabel}>Bio</label>
          <input onChange={(e) => setnewbio(e.target.value)} value={newbio} />
          <button type="submit" className={Styles.savebut}>
            save
          </button>
        </animated.form>
      </div>
    );
  }
};
export default Editprofile;

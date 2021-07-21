import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import axios from "axios";
import { useAlert } from "react-alert";
import { useState } from "react";
import {useSpring,animated} from "react-spring";
import Styles from "./Editprofile.module.css";
const URL = process.env.REACT_APP_URL;
const Editprofile = ({ edit_it, setprofpichandle }) => {
  const Alert = useAlert();
  const dispatch = useDispatch();
  const { username, email, profilepic, _id, bio } = useSelector(
    (state) => state.user
  );

  const [newemail, setnewemail] = useState(email);
  const [newusername, setnewusername] = useState(username);
  const [loading, setloading] = useState(false);
  const [selectedFile,setSelectedFile]=useState(null);
  const [pic,setPic]=useState(profilepic);
  const [newbio, setnewbio] = useState(bio);
  const save_it = async (e) => {
    setloading(true);
    try {
      const data=new FormData(e.target);
      data.append('file',selectedFile);
      const res = await axios.patch(`${URL}/upload/updateuser`,data, 
    { params:{
        email: newemail,
        username: newusername,
        _id: _id,
        profilepic: pic,
        bio: newbio,
      }});
      if (res) {
        console.log("fromclient");
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

      console.log("H");
      Alert.show("Bio word limit 80 ");
      setTimeout(() => {
        setloading(false);
        edit_it();
      }, 50);
    }
  }
  const selectedFileHandle=(e)=>{
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    setPic(global.URL.createObjectURL(e.target.files[0]));
  }
  const floatDown = useSpring({
    
    from: { y:"-100%"},
   y: "-50%",x:"-50%" ,
   
    config: { mass: 10, tension: 10, friction: 1,duration:200 },
  });
  if (loading) {
    return (
      <div>
        <div className={Styles.loader}></div>
      </div>
    );
  } else {
    return (
  <>
      <animated.form onSubmit={(e)=>save_it(e)} className={Styles.editprofile} style={floatDown}>
        <button className={Styles.backbut} onClick={edit_it}>
          BACK
        </button>
        <img className={Styles.editimg} width="50px" height="50px" src={pic?pic:process.env.PUBLIC_URL+'/userImage.png'} />
         <input  type="file" onChange={(e)=>selectedFileHandle(e)}  />
        <input onChange={(e) => setnewemail(e.target.value)} value={newemail} />
        <input
          onChange={(e) => setnewusername(e.target.value)}
          value={newusername}
        />
        <input onChange={(e) => setnewbio(e.target.value)} value={newbio} />
        <button type="submit" className={Styles.savebut} >
          save
        </button>
      </animated.form>
      </>
    );
  }
};
export default Editprofile;

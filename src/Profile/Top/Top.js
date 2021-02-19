import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import Editprofile from "./Editprofile";
import Topprofile from "./Topprofile";

const URL = process.env.REACT_APP_URL;
const Top = () => {
  let {
    username,
    name,
    profilepic,
    email,
    postsnumber,
    followerscount,
    followingcount,
    bio,
  } = useSelector((state) => {
    console.log(state);
    return state.user;
  });

  const [file, setfile] = useState(null);
  const [img, setimg] = useState(null);
  const [edit, setedit] = useState(false);
   const [profpic,setprofpic]=useState(profilepic);
  const dispatch = useDispatch();
  const choosefilehandle = (e) => {
    setfile(e.base64);
  };

  const edit_it = () => {
    setedit(!edit);
  };
  const upload_it = async () => {
    try {
      const res = await axios.post(`${URL}/upload/image`, {
        base64: file,
      });
      setimg(res.data.img);
    } catch (err) {
      console.log(err);
    }
  };
  const logouthandle = () => {
    axios
      .get(`${URL}/auth/logout`, { withCredentials: true })
      .then((res) => {
        dispatch({ type: "access", payload: false });
      })
      .catch((err) => console.log(err));
  };
  const setprofpichandle=(pic)=>{
setprofpic(pic);
  }
 
  

  return (
    <>
      {edit ? (
        <Editprofile  setprofpichandle={setprofpichandle} edit_it={edit_it} />
      ) : (
        <Topprofile
          name={name}
          edit_it={edit_it}
          profpic={profpic}
         
          logouthandle={logouthandle}
          img={img}
          username={username}
          bio={bio}
          postsnumber={postsnumber}
          followerscount={followerscount}
          followingcount={followingcount}
          choosefilehandle={choosefilehandle}
          upload_it={upload_it}
        />
      )}
    </>
  );
};

export default Top;

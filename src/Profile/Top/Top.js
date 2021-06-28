import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Addpost from "./post/Addpost";
import { useEffect, useState } from "react";
import FileBase64 from "react-file-base64";
import Editprofile from "./Editprofile";
import Topprofile from "./Topprofile";

const URL = process.env.REACT_APP_URL;

const Top = ({
  setposthand,
  setshowfollowershandle,
  setshowfollowinghandle,
}) => {
  let {
    username,
    name,
    profilepic,
    email,

    bio,
  } = useSelector((state) => {
    console.log(state);
    return state.user;
  });
  const { postcount } = useSelector((state) => state.count);

  const [img, setimg] = useState(null);
  const [edit, setedit] = useState(false);
  const [post, setpost] = useState(false);
  const [isUnmounted,setIsUnmounted]=useState(false);
  const [profpic, setprofpic] = useState(profilepic);
  const dispatch = useDispatch();

  const edit_it = () => {
    setedit(!edit);
  };
  useEffect(() => {
    if(!isUnmounted)
    {

    }
    return () => {
      setIsUnmounted(true);
    }
  }, [edit])
  const logouthandle = () => {
    axios
      .get(`${URL}/auth/logout`, { withCredentials: true })
      .then((res) => {
        dispatch({ type: "access", payload: false });
      })
      .catch((err) => console.log(err));
  };
  const setprofpichandle = (pic) => {
    setprofpic(pic);
  };
  const setposthandle = () => {
    setpost(!post);
    setposthand(true);
  };


  return (
    <>
      {!post ? (
        edit ? (
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
            postsnumber={postcount}
            setposthandle={setposthandle}
            setshowfollowershandle={setshowfollowershandle}
            setshowfollowinghandle={setshowfollowinghandle}
          />
        )
      ) : (
        <Addpost setposthandle={setposthandle} />
      )}
    </>
  );
};

export default Top;

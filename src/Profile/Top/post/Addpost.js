import FileBase64 from "react-file-base64";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatecountforpost } from "../../../reduces/actions/countAction";
import axios from "axios";
import Styles from "./Addpost.module.css";
const URL = process.env.REACT_APP_URL;
const Addpost = ({ setposthandle }) => {
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("");

  const { username, proffilepic } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { postcount } = useSelector((state) => state.count);
  const savehandle = async () => {
    setloading(!loading);
    try {
      const res = await axios.post(`${URL}/post/uploadpost`, {
        username: username,
        picture: pic,
        desc: desc,
      });
      setloading(!loading);
      setposthandle(false);
    } catch (err) {
      console.log(err);
    }
    dispatch(updatecountforpost(username, postcount));
  };
  if (loading) {
    return (
      <div>
        <div className={Styles.loader}></div>
      </div>
    );
  }
  return (
    <div className={Styles.maindiv}>
      <button onClick={() => setposthandle(false)}>Back</button>
      <img src={pic} width="100px" height="100px" alt="Please choose" />
      <div className={Styles.choosebut}><FileBase64  multiple={false} onDone={(e) => setpic(e.base64)} /></div>
      <textarea
        type="name"
        value={desc}
        onChange={(e) => setdesc(e.target.value.substr(0, 100))}
        placeholder="    Write Something 😜   "
      />
      <button onClick={savehandle}>save</button>
    </div>
  );
};

export default Addpost;

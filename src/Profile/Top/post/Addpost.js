import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatecountforpost } from "../../../reduces/actions/countAction";
import axios from "axios";
import Styles from "./Addpost.module.css";
import { useSpring,animated } from "react-spring";
import { useAlert } from "react-alert";
import {resetUserPosts,resetFeedPosts} from "../../../reduces/actions/userAction";
const URL = process.env.REACT_APP_URL;
const Addpost = ({ setposthandle }) => {
  const [pic, setpic] = useState(null);
  const [desc, setdesc] = useState("");
  const ALert=useAlert();
  const { username } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const [selectedFile,setSelectedFile]=useState(null);
  const dispatch = useDispatch();
  const { postcount } = useSelector((state) => state.count);
  const savehandle = async (e) => {
    e.preventDefault();
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
        params:{username:username,desc:desc}
      });
      setloading(!loading);

      dispatch(resetFeedPosts());
      dispatch(resetUserPosts());
      setposthandle(false);
      window.location.reload("/main");
    } catch (err) {
      console.log(err);
    }
    dispatch(updatecountforpost(username, postcount));
  };
  
  const handleSelectedFile=(e)=>{
   e.preventDefault();

   setSelectedFile(e.target.files[0]);
   setpic(global.URL.createObjectURL(e.target.files[0]));
  }


  const Popup = useSpring({
    
    from: { y:"-70%",x:"5%" ,transform:"scale(0.2)"},
   y: "-50%",x:"-50%",transform:"scale(1)",
   
    config: { mass: 10, tension: 10, friction: 1,duration:100 },
  });
  if (loading) {
    return (
      <div>
        <div className={Styles.loader}></div>
      </div>
    );
  }
  return (
<>
     <animated.form className={Styles.maindiv} style={Popup} onSubmit={savehandle}>
     <button onClick={() => setposthandle(false)}>Back</button>
      <img src={pic}  alt="Please choose" />
      <div className={Styles.choosebut}><input type="file" onChange={(e)=>handleSelectedFile(e)} /></div>
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

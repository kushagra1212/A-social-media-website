import FileBase64 from "react-file-base64";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updatecountforpost} from '../../../reduces/actions/countAction'
import axios from "axios";
const URL = process.env.REACT_APP_URL;
const Addpost = ({ setposthandle }) => {

  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("");
 
  const { username, proffilepic } = useSelector((state) => state.user);
const [loading,setloading]=useState(false);
const dispatch=useDispatch();
const {postcount}=useSelector(state=>state.count);
const savehandle = async () => {
  
      setloading(!loading);
    try{
        const res=await axios.post(`${URL}/post/uploadpost`, {
            username: username,
            picture: pic,
            desc: desc,
          });
      


    }catch(err)
    {
        console.log(err);
    }
    dispatch(updatecountforpost(username,postcount))

   

    setloading(!loading);
    setposthandle();
  }
  if(loading)
  {
      return(<div>
          loading....
      </div>)
  }
  return (
    <div>
      <img src={pic} width="100px" height="100px" />
      <FileBase64 multiple={false} onDone={(e) => setpic(e.base64)} />
      <textarea
        type="name"
        value={desc}
        onChange={(e) => setdesc(e.target.value.substr(0, 100))}
      />
      <button onClick={savehandle}>save</button>
    </div>
  );
};

export default Addpost;

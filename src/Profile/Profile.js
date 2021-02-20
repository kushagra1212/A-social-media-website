import { useDispatch, useSelector} from "react-redux";
import Top from './Top/Top'

import Userposts from '../posts/Userposts'
import Container from './Container/Container'
import { useEffect, useState } from "react";

const Profile = () => {
  
 const [post,setpost]=useState(false);
 const posts=useSelector(state=>state.userposts);
const setposthand=()=>{
  setpost(!post);
}


  return (
    <div>
      <Top    setposthand={setposthand}   />
      {post?null:<><Container posts={posts} /> <Userposts   /> </>}
     
     
    </div>
  );
};

export default Profile;

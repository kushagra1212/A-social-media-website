import { useSelector} from "react-redux";
import Top from './Top/Top'
import {returnpost} from './Top/Top.js'

import Container from './Container/Container'
import { useState } from "react";

const Profile = () => {
 const [post,setpost]=useState(false);
 const posts=useSelector(state=>state.userposts);
const setposthand=()=>{
  setpost(!post);
}
  return (
    <div>
      <Top    setposthand={setposthand}   />
      {post?null:<Container posts={posts} />}
     
     
    </div>
  );
};

export default Profile;

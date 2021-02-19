import Styles from "./Content.module.css";
import propic from "./images/pic2.jpg";

import sharepic from "./images/share.png";
import { useState } from "react";
const Contentmain = () => {
  const [liked, setlike] = useState(false);
  const [likecount,setlikecount]=useState(0);
 const [images,setimages]=useState([])
  const likefunction=()=>{
    liked?setlikecount(likecount):setlikecount(likecount+1);
    setlike(true);
  }
  const unlikefunction=()=>{
!liked || likecount==0?setlikecount(likecount):setlikecount(likecount-1);
setlike(false);
  }
  return (
    <>
      <div className={Styles.maincontent}>
       {images.map((image,key)=>(
            <div key={key} className={Styles.singlecontainer}>
            <div className={Styles.topdiv}>
              <img src={propic} />
              <h5>Nature world</h5>
            </div>
            <button onDoubleClick={likefunction}  className={Styles.imgdiv}>
              <img src={image} width="100%" height="200px" />
            </button>
            <div className={Styles.bottomdiv}>
            {liked ? <span  onClick={unlikefunction}   >💖 {likecount}</span  > : <span  onClick={likefunction}  >🤍 {likecount}</span>}
              
              <span>💬 5</span>
             
              <img src={sharepic} width="4.5%" height="2%" />
            </div>
          </div>
        
       ))}
       
      </div>
    </>
  );
};
export default Contentmain;

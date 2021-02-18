import Styles from "./Content.module.css";
import propic from "./images/pic2.jpg";
import pic1 from "./images/pic1.jpg";
import sharepic from "./images/share.png";
import { useState } from "react";
const Contentmain = () => {
  const [liked, setlike] = useState(false);
  const [likecount,setlikecount]=useState(null);
  return (
    <>
      <div className={Styles.maincontent}>
        <div className={Styles.singlecontainer}>
          <div className={Styles.topdiv}>
            <img src={propic} />
            <h5>Nature world</h5>
          </div>
          <button onDoubleClick={()=>{ likecount?setlikecount(likecount):setlikecount(likecount+1);setlike(true);}}  className={Styles.imgdiv}>
            <img src={pic1} width="100%" height="200px" />
          </button>
          <div className={Styles.bottomdiv}>
          {liked ? <span>💖 {likecount}</span> : <span >🤍 {likecount}</span>}
            
            <span>💬 5</span>
           
            <img src={sharepic} width="4.5%" height="2%" />
          </div>
        </div>
      
       
      </div>
    </>
  );
};
export default Contentmain;

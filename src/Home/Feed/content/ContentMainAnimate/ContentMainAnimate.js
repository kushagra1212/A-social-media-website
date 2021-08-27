import Styles from "./ContentMainAnimate.module.css";
const ContentMainAnimate = () => {
  let posts=[{},{},{},{}];
  return (
    <div className={Styles.maincontent} id="infiniteScroll">
      <>
        {posts.map((post,id) => (
          <div key={id} className={Styles.singlecontainer}>
            <div className={Styles.topdiv}>
            
                <img alt="" />
           
              <div className={Styles.topcap}> </div>
            </div>
            <button className={Styles.imgdiv}></button>
            <div className={Styles.bottomdiv}>
              
            </div>
            <div className={Styles.caption}></div>
          </div>
        ))}
      </>
    </div>
  );
};
export default ContentMainAnimate;

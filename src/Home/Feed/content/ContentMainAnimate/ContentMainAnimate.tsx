import Styles from './ContentMainAnimate.module.css';
import ContentLoader from 'react-content-loader';
const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width="100%"
    height="100vh"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {' '}
    <rect x="0" y="0" rx="0" ry="3" width="100%" height="100%" />
  </ContentLoader>
);
const ContentMainAnimate = () => {
  let posts = [{}, {}, {}, {}];
  return (
    <div className={Styles.maincontent} id="infiniteScroll">
      {posts.map((post, id) => (
        <div key={id} className={Styles.singlecontainer}>
          <div className={Styles.topdiv}>
            <img alt="" />

            <div className={Styles.topcap}> </div>
          </div>
          <MyLoader />
          <div className={Styles.bottomdiv}></div>
          <div className={Styles.caption}></div>
        </div>
      ))}
    </div>
  );
};
export default ContentMainAnimate;

import Styles from "./Container.module.css";
import { useState, Suspense, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Showdetailedpost from "./Showdetailedpost/Showdetailedpost";
import { useDispatch, useSelector } from "react-redux";
import { SuspenseImg } from "../../Home/Feed/content/SuspenceImage/SuspenceImg";
import { getpostsforfeed } from "../../methods/getpostsforfeed";
import { updateLikesArray } from "../../reduces/actions/userAction";
import {getcount} from "../../methods/getcount";
import ContentLoader from "react-content-loader";
let heightofAni = window.screen.width >= 768 ? "45vh" : "20vh";
let widthofAni = window.screen.width >= 768 ? "100%" : "100%";
let heightofAniT = window.screen.width >= 768 ? "95vh" : "45vh";
let widthofAniT = window.screen.width >= 768 ? "100%" : "100%";
const MyLoaderGrid = (props) => (
  <ContentLoader
    speed={1}
    width={widthofAni}
    height={heightofAni}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {" "}
    <rect x="0" y="0" rx="1" ry="3" width="100%" height="100%" />
  </ContentLoader>
);
const MyLoaderTable = (props) => (
  <ContentLoader
    speed={1}
    width={widthofAniT}
    height={heightofAniT}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {" "}
    <rect x="0" y="0" rx="1" ry="3" width="100%" height="100%" />
  </ContentLoader>
);
const Container = ({ toDelete, username }) => {
  const [grid, setGrid] = useState(true);
  const dispatch=useDispatch();
  const [showDetailedPost, setShowDetailedPost] = useState(false);
  const [post, setPost] = useState([]);
  
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [postCount,setPostCount]=useState(null);
  const gridHandler = (bool) => {
    setGrid(bool);
  };
  const setShowDetailedPostHandler = (bool) => {
    setShowDetailedPost(bool);
  };
  const setPostHandler = (post) => {
    setPost(post);
    setShowDetailedPostHandler(true);
  };
  const unique = (array) => {
    let isvisited = {};
    let newarray = [];

    array.forEach((ele) => {
      if (!isvisited[ele.picture]) {
        newarray.push(ele);
        isvisited[ele.picture] = true;
      }
    });
    return newarray;
  };
  const call_func = async () => {

    if (!isUnmounted) {
      let lastCount;
      if (posts) lastCount = posts.length;
      else lastCount = 0;
      let temp_array;
      try{
        temp_array= await getpostsforfeed(username, lastCount, 5);
        temp_array.forEach((ele) => {
          ele.likes.forEach((ele2) => {
            dispatch(updateLikesArray(ele2.username, ele._id));
          });
        });
        let newArray=[...posts, ...temp_array]
        newArray=unique(newArray);
        setPosts(newArray);
       if(newArray.length===postCount)
       setHasMore(false);
      }catch(err){
        setHasMore(false);
        console.log(err);
      }
    }

  };

  useState(() => {
console.log(username);
  getcount(username).then(res=>{
    if(res.postcount===0)
    setHasMore(false)
    call_func();
    setPostCount(res.postcount);
   });

 


  


  
  }, [username]);



  if (showDetailedPost)
    return (
      <Showdetailedpost
        setShowDetailedPostHandler={setShowDetailedPostHandler}
        toDelete={toDelete}
        post={post}
      />
    );

  return (
    <>
      <div className={Styles.topButtons}>
        <button
          disabled={grid ? true : false}
          onClick={() => gridHandler(true)}
        >
          {" "}
          <img
            width="30px"
            height="30px"
            src="https://img.icons8.com/ios-glyphs/60/000000/grid-2.png"
            alt=""
          />
        </button>
        <button
          onClick={() => gridHandler(false)}
          disabled={grid ? false : true}
        >
          {" "}
          <img
            width="30px"
            height="30px"
            src="https://img.icons8.com/material-outlined/60/000000/ingredients-list.png"
            alt=""
          />
        </button>
        {postCount===0 ?<div className={Styles.noposts} > No Posts</div>:null} 
      </div>
     
      <InfiniteScroll
        className={Styles.infi}
        dataLength={posts.length}
        next={call_func}
        hasMore={hasMore}
        loader={<div style={{ width:"10em",
          marginTop: "10%",
          height: "10em"}} ></div>}
        endMessage={
          <p
            className={Styles.infiP}
          >
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div
          style={grid ? {} : { flexDirection: "column", alignItems: "center" }}
          className={grid?Styles.maindiv:Styles.table}
        >
          {posts.map((post, id) => {
                return (
         <div key={id} className={grid?Styles.boxgrid:Styles.box} >
              <div className={Styles.test}  onClick={() => setPostHandler(post)} ><h1 style={{color:"white"}}>View</h1></div>
                    <Suspense  fallback={grid?<MyLoaderGrid/>:<MyLoaderTable/>}>
                    <SuspenseImg
           
                     
                      src={post.picture}
                    />
                               
                  </Suspense>

                </div>
                );
              })
            }
               
        </div>
      
      </InfiniteScroll>

    </>
  );
};
export default Container;

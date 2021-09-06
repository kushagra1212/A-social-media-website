import Styles from "./Container.module.css";
import {useEffect,useState,Suspense} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import Showdetailedpost from "./Showdetailedpost/Showdetailedpost";
import VerticalLoader from "../../Animation/Loader/loader/VerticalLoader";

import { SuspenseImg } from "../../Home/Feed/content/SuspenceImage/SuspenceImg";
import { getpostsforfeed } from "../../methods/getpostsforfeed";
const Container = ({toDelete,username}) => {
  const [grid,setGrid]=useState(true);
  const [showDetailedPost,setShowDetailedPost]=useState(false);
  const [post,setPost]=useState([]);
  //const posts = useSelector((state) => state.userposts);
  const [posts,setPosts]=useState([]);
  const [hasMore,setHasMore]=useState(true);
  const [isUnmounted,setIsUnmounted]=useState(false);
 
 // const [isUnmounted,setIsUnmounted]=useState(false);

  
  const gridHandler=(bool)=>{
    setGrid(bool);
  }
  const setShowDetailedPostHandler=(bool)=>{
    setShowDetailedPost(bool);
  }
  const setPostHandler=(post)=>{
    setPost(post);
  
    setShowDetailedPostHandler(true);
  }  
  const call_func=async()=>{
    if(!isUnmounted){
      let lastCount;
    if(posts)
       lastCount=posts.length;
    else
      lastCount=0;
    let temp_array=await getpostsforfeed(username,lastCount,6);
 
    setPosts(prev=>[...prev,...temp_array]);
      
 
      if(temp_array.length<6 && !isUnmounted)
      {
        setHasMore(false);
       
      } 
    }
    
  }
  useState(()=>{
 
      call_func();
 
    return ()=>{
      setIsUnmounted(true);
    }
  
  },[]);
  useState(()=>{
    return ()=>{
      setIsUnmounted(true);
    }
  })
 
  if(showDetailedPost)
    return(<Showdetailedpost setShowDetailedPostHandler={setShowDetailedPostHandler} toDelete={toDelete} post={post}  />);
 
  return (
   <>   
    <div className={Styles.topButtons} >
   <button disabled={grid?true:false} onClick={()=>gridHandler(true)}   > <img width="30px" height="30px"  src="https://img.icons8.com/ios-glyphs/60/000000/grid-2.png" alt=""/></button>
   <button  onClick={()=>gridHandler(false)} disabled={grid?false:true}     > <img  width="30px" height="30px" src="https://img.icons8.com/material-outlined/60/000000/ingredients-list.png" alt=""/></button>
    </div>

    <InfiniteScroll
  
  className={Styles.infi}
          dataLength={posts.length}
          next={call_func}
          hasMore={hasMore}
          loader={<div className={Styles.loader}></div>}
          endMessage={
            <p
             className={Styles.infiP}
              style={{
                textAlign: "center",
                backgroundColor: "black",
                color: "white",
                width: "100%",
                height: "30px",
                marginTop: "1%",
                marginBottom: "25%",
                position: "relative",
              }}
            >
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
            <div style={grid?{}:{flexDirection:"column",alignItems:"center"}}  className={Styles.maindiv}>
    
              
      {posts.length > 0
        ? posts.map((post,id) => {
            return (
              <Suspense   key={id} fallback={null} >
                  <SuspenseImg  className={Styles.image}   onClick={()=>setPostHandler(post)}  src={post.picture}  />
                  </Suspense> 
            )
          })
        : null}
                   
                  </div>

        </InfiniteScroll>


    
    
    
  
    </>
  );
};
export default Container;

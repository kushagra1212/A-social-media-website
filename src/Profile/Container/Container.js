
import Styles from "./Container.module.css";
import {useEffect,useState,Suspense} from 'react'
import Showdetailedpost from "./Showdetailedpost/Showdetailedpost";
import Loader from "../../Animation/Loader/Loader";
import { SuspenseImg } from "../../Home/Feed/content/SuspenceImage/SuspenceImg";
const Container = ({ posts }) => {
  const [grid,setGrid]=useState(true);
  const [showDetailedPost,setShowDetailedPost]=useState(false);
  const [post,setPost]=useState(null);
 // const [isUnmounted,setIsUnmounted]=useState(false);
  useEffect(()=>{
 
    posts.sort((a,b)=>{
    
      return(new Date(a.createdAt)-new Date(b.createdAt));
    });

  },[posts])
  
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
  if(showDetailedPost)
    return(<Showdetailedpost setShowDetailedPostHandler={setShowDetailedPostHandler} post={post}  />);
  
  return (
   <>   
    <div className={Styles.topButtons}       >
   <button disabled={grid?true:false} onClick={()=>gridHandler(true)}   > <img width="30px" height="30px"  src="https://img.icons8.com/ios-glyphs/60/000000/grid-2.png"/></button>
   <button  onClick={()=>gridHandler(false)} disabled={grid?false:true}     > <img  width="30px" height="30px" src="https://img.icons8.com/material-outlined/60/000000/ingredients-list.png"/></button>
    </div>
    <div style={grid?{}:{flexDirection:"column",alignItems:"center"}}  className={Styles.maindiv}>
   
      {posts.length > 0
        ? posts.map((post,id) => {
            return (
         
                <Suspense key={id} fallback={<Loader/>} >
                  <SuspenseImg className={Styles.post} className={Styles.image}     key={post._id} onClick={()=>setPostHandler(post)}  src={post.picture}  />
                </Suspense>
              
            
            )
          })
        : null}
   
    </div></>
  );
};
export default Container;

import Styles from "./Content.module.css";
import InfiniteScroll from 'react-infinite-scroll-component'
import { getpostsforfeed } from "../../../methods/getpostsforfeed";
import sharepic from "./images/share.png";
import { useEffect, useState } from "react";
import getuser from "../../../methods/getuser";
import { useSelector } from "react-redux";
import getitem from "../../../methods/getitem";
import updatelikes from "../../../methods/updatelikes";
import deletelike from "../../../methods/deletelike";
import Comments from './comments/Comments'
const Contentmain = () => {
  const { _id, profilepic, username } = useSelector((state) => {console.log(state.user.username); return state.user});
  const [hasMore,sethasmore]=useState(true);
  
  const [array,setarray]=useState([])
  const [start,setstart]=useState(false);
  const [lastcount,setlastcount]=useState(0);
  
  const [showcomments,setshowcomments]=useState(false);
  const { access } = useSelector((state) => state.signinReducer);

  const [posts, setposts] = useState([]);

  const [loading, setloading] = useState(true);

  const likefunction = (post,key) => {
    setstart(true);
   
    post.liked = true;
    let newArray=[...array];
    
  //  let index=array.findIndex(ele=>ele.key==key);
 
    if(key>=0)
    {
      newArray[key]={...newArray[key],liked:true,length:newArray[key].length+1};
      setarray(newArray);
      console.log(newArray);
    }
    

   
  

    updatelikes({ username: username, id: post._id });
  };
  const unlikefunction = (post,key) => {

    setstart(false);
   // let index=array.findIndex(ele=>ele.key==key);
    let newArray=[...array];
  
     if(key>=0)
     {
      newArray[key]={...newArray[key],liked:false,length:newArray[key].length-1};
     
      setarray(newArray);
      console.log(newArray);
     }
    deletelike({ username: username, id: post._id });
  };
  const getothers = (post1) => {
    let post2 = [];
  if(username)
  {
    getitem(username).then((item) =>
    item?.following?.map((dat) => {
      getpostsforfeed(dat.username,lastcount)
        .then((post) => {
          post2 = post;
          getuser(dat.username).then((ele) =>
          post2.map((elee) => {

            elee["pic"] = ele.profilepic;       
          
          })
        );
          let newArray=[];
             
          let newpost=[...post1,...post2];
         if(newpost.length==0) sethasmore(false);
          newpost.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
          
         
        
        
          
          newpost.forEach(ele=>{ 
            
                   
                   newArray.push({liked:ele.likes.find(elee=>elee.username==username),length:ele.likes.length});
                  
           
               

          })
          newpost=[...posts,...newpost];
          setposts(newpost);
          setarray([...array,...newArray]);
          console.log([...array,...newArray],"final array")
          console.log(newpost);
          setloading(false);
          setlastcount(lastcount+1);
        })
        .catch((err) => console.log(err));

    })
  );
  }else{
    console.log("")
  }
  };
  let post1 = [];
  const call_func = async () => {
  
    if (username) {
      try {
        const res = await getpostsforfeed(username,lastcount);
       if(res)
       { post1 = res;
         getothers(post1);
       
       
        post1.map((ele) => {
          ele["pic"] = profilepic;
        });

        console.log(post1, "own");
       }
      } catch (err) {
        console.log(err);
      }
    }
  
  };
const setcommentsfunc=({val,post})=>{
setshowcomments({val:val,post:post});
}
useEffect(()=>{

  call_func();

},[])
 


  if (loading == true) {
    return  (<div className={Styles.loader}></div>);
  } else if (posts.length == 0) {
    return (
      <div className={Styles.maincontent}>
        Seems like you are not following any one , please follow others to see
        their posts
      </div>
    );
  } 
  else if(showcomments.val===true)
  {
    return(
      <>
      <Comments username={username} showcomments={showcomments}  setcommentsfunc={setcommentsfunc}   />
      </>
    )
  }
  
  
  
  else if(array.length!=undefined){
    return (
      <>
        <div className={Styles.maincontent}>
          <InfiniteScroll
            dataLength={posts.length}
            next={call_func}
            hasMore={hasMore}
            loader={<div  className={Styles.loader} ></div>}
            endMessage={
              <p style={{ textAlign: 'center',backgroundColor:"black",color:"white",width:"100%",height:"30px",marginTop:"1%",marginBottom:"5%",position:"relative" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
           
         
          >
          {posts.map((post, key) => (
            <div key={key} className={Styles.singlecontainer}>
              <div className={Styles.topdiv}>
                <img src={post.pic} />

                <h5>{post.username}</h5>
              </div>
              <button onDoubleClick={likefunction} className={Styles.imgdiv}>
                <img src={post.picture} width="100%" height="200px" />
              </button>
              <div className={Styles.bottomdiv}>
             {console.log(array[key]?.liked,"checker")}
                { ((post.likes.find(ele=>ele.username==username)) && array[key]?.liked) || array[key]?.liked ? (
                  <span onClick={() => unlikefunction(post,key)}>
                    💖 { array[key]?.length  }
                 
                  </span>
                ) : (
                  <span onClick={() => likefunction(post,key)}>🤍 { array[key]?.length }</span>
                )} 
                <span onClick={()=>setcommentsfunc({val:true,post:post})}      >💬 {post?.comments?.length}</span>

                <img src={sharepic} width="4.5%" height="2%" />
              </div>
              <div className={Styles.caption}  >{post.desc}
              </div>
            </div>
          ))}
          </InfiniteScroll>

        </div>
      </>
    );
  }else{
    return <div className={Styles.loader}></div>
  }
};
export default Contentmain;

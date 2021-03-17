import Styles from "./Content.module.css";

import { getpostsforfeed } from "../../../methods/getpostsforfeed";
import sharepic from "./images/share.png";
import { useEffect, useState } from "react";
import getuser from "../../../methods/getuser";
import { useSelector } from "react-redux";
import getitem from "../../../methods/getitem";
import updatelikes from "../../../methods/updatelikes";
import deletelike from "../../../methods/deletelike";
const Contentmain = () => {
  const { _id, profilepic, username } = useSelector((state) => {console.log(state.user.username); return state.user});
  const [liked, setlike] = useState(false);
  const [likecount, setlikecount] = useState(0);
  const [array,setarray]=useState([])
  const [start,setstart]=useState(true);
  const { access } = useSelector((state) => state.signinReducer);

  const [posts, setposts] = useState([
    { username: "", picture: "", pic: null },
  ]);

  const [loading, setloading] = useState(true);

  const likefunction = (post,key) => {
    setstart(false);
    setlike(true);
    post.liked = true;
    let newArray=[...array];
    
    let index=array.findIndex(ele=>ele.key==key);
    if(index>=0)
    {
      newArray[index]={...newArray[index],liked:true};
      setarray(newArray);
      console.log(newArray);
    }
    

   
  

    updatelikes({ username: username, id: post._id });
  };
  const unlikefunction = (post,key) => {
    setlike(false);
    setstart(false);
    let index=array.findIndex(ele=>ele.key==key);
    let newArray=[...array];
  
     if(index>=0)
     {
      newArray[index]={...newArray[index],liked:false};
     
      setarray(newArray);
      console.log(newArray);
     }
    deletelike({ username: username, id: post._id });
  };
  const getothers = () => {
    let post2 = [];
  if(username)
  {
    getitem(username).then((item) =>
    item?.following?.map((dat) => {
      getpostsforfeed(dat.username)
        .then((post) => {
          post2 = post;
          getuser(dat.username).then((ele) =>
            post2.map((elee) => {
              elee["pic"] = ele.profilepic;
              setposts([...post1, ...post2]);
              let newArray=[];
              for(var i=0;i<post1.length+post2.length;i++)
              {
                
                newArray=[...newArray,{key:i,liked:false}];
              }
              setarray(newArray);
              setloading(false);
            })
          );
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
    console.log(post1, "start");
    if (username) {
      try {
        const res = await getpostsforfeed(username);
       if(res)
       {
         getothers();
        post1 = res;
       
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

 
useEffect(()=>{

  call_func();
setstart(true);
},[])

  if (loading == true) {
    return <div className={Styles.maincontent}> fetching posts....</div>;
  } else if (posts.length == 0) {
    return (
      <div className={Styles.maincontent}>
        Seems like you are not following any one , please follow others to see
        their posts
      </div>
    );
  } else if(array.length!=undefined){
    return (
      <>
        <div className={Styles.maincontent}>
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
             {console.log(array,"checker")}
                { (start && post.likes.find(ele=>ele.username==username)) || array[key].liked? (
                  <span onClick={() => unlikefunction(post,key)}>
                    💖 {post.likes.length + array[key].liked?1:0 }
                  </span>
                ) : (
                  <span onClick={() => likefunction(post,key)}>🤍 {post.likes.length + array[key].liked?0:0  }</span>
                )} 
                <span>💬 5</span>

                <img src={sharepic} width="4.5%" height="2%" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }else{
    return <div>Loading...</div>
  }
};
export default Contentmain;

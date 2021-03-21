import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {getpostsforfeed} from '../methods/getpostsforfeed';
import InfiniteScroll from 'react-infinite-scroll-component'
const Like=()=>{
    const {username}=useSelector(state=>state.user);
    const [posts,setposts]=useState([]);
    const [hasMore,sethasmore]=useState(true);
    const [last,setlast]=useState(0);
    const getposts=async()=>{
        getpostsforfeed(username,last,2).then(res=>{
           if(res.length>0)
           {
            let arr=[...posts,...res];
            setposts(arr);
            setlast(last+1);
            console.log(res);
           }else{
               sethasmore(false);
           }

        }).catch(err=>console.log(err));
    }
    useEffect(()=>{
         getposts();
    },[])
    return(
        <div  style={{scrollBehavior:"smooth",overflow:"scroll",overflowX:"-moz-hidden-unscrollable",height:"100%"}}             >
           <InfiniteScroll
           hasMore={hasMore}
           dataLength={posts.length}
           next={getposts}
           loader={<div        >Loading...</div>}
           endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
           
           


           >
                   {posts.map((post,id)=>{
             return (
                 <div style={{width:"100%",height:"50px"}}     key={id} >
                    <img  src={post.picture} width="50px" height="50px" style={{position:"absolute"}} />
                    {post.likes.map((like,id)=>{
                        return(
                            <div key={id} style={{width:"100%",left:"20%",position:"relative"}} >
                                {like.username} liked your post
                                </div>
                        )
                    })}
                     </div>
             )
         })}
         <button  onClick={getposts}  >LOAD MORE</button>

           </InfiniteScroll>
        </div>
    )
}

export default Like;
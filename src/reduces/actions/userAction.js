import axios from 'axios';
const URL =process.env.REACT_APP_URL;
const setuser=(user)=>{
  
    return{
        type:"SET_USER",
        payload:user
    }
}
const getuserfor=()=>{
    return{
        type:"GET_USER"
    }
}
export const addfeedposts=(posts,array,otheruser,username)=>{
    return({type:"ADD_FEED_POSTS",payload:{posts:posts,count:3,array:array,otheruser:otheruser,username:username}});
}

export const addposts=(posts)=>{
return({type:"ADD_POSTS",payload:posts})
}
export const updatepost=(post)=>{
    return {type:"UPDATE_POST",payload:{post:post}};
}
export const populateLike=(posts,lastcount)=>{
    return ({type:"POPULATE_IT",payload:{posts:posts,lastcount:lastcount}});
}
export const getuser=(id)=>{
    return async(dispatch)=>{
      
      const res=await axios.get(`${URL}/upload/getuser?id=${id}`);
     
      if(res) {dispatch(setuser(res.data)); 
      }
      else console.log("errr");
    }
}
export const resetFeedPosts=()=>{
    return{type:"RESET_FEED_POSTS"};
}
export const resetUserPosts=()=>{
    return {type:"RESET_USER_POSTS"};
}
export const updateLikesArray=(username,key)=>{
   return {type:"UPDATE_LIKES_ARRAY",payload:{username:username,postID:key}};
}
export const updateUnlikesArray=(unlikesArray)=>{
    return {type:"UPDATE_UNLIKES_ARRAY",payload:{unlikesArray:unlikesArray}};
}
export const access_Action=(access)=>{

        return {type:'access',payload:access};
 
}


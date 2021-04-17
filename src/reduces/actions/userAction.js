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
export const addfeedposts=(posts,lastcount,array,lastcount2)=>{
    return({type:"ADD_FEED_POSTS",payload:{posts:posts,lastcount:lastcount,array:array,lastcount2:lastcount2}});
}

export const addposts=(posts)=>{
return({type:"ADD_POSTS",payload:posts})
}
export const getuser=(id)=>{
    return async(dispatch)=>{
      
      const res=await axios.get(`${URL}/upload/getuser?id=${id}`);
     
      if(res) {dispatch(setuser(res.data)); 
      }
      else console.log("errr");
    }
}
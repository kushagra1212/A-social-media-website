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
export const updateusercount=(data)=>{
    return( {type:"UPDATE_USER_COUNT",payload:data})
    
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
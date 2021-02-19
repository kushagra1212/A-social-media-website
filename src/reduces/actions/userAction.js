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
export const getuser=(id)=>{
    return async(dispatch)=>{
      
      const res=await axios.get(`${URL}/upload/getuser?id=${id}`);
     
      if(res) {dispatch(setuser(res.data)); 
      }
      else console.log("errr");
    }
}
 import axios from 'axios';
 import {Stories_uploaded} from '../reduces/actions/StoriesAction';
 const URL=process.env.REACT_APP_URL;

 export const uploadstories=async(username,base64,dispatch)=>{
   
    if(username)
    {
        try{
            
        const res=await axios.post(`${URL}/stroies/uploadimage`,{
            username:username,
            base64:base64
        });
        if(res.data)
        { 
          dispatch(Stories_uploaded(res.data));
        } 
        }catch(err)
        {
            console.log(err);
        }
    }  


 }
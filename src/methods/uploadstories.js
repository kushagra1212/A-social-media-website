 import axios from 'axios';
import {UPLOAD_STORIES,GET_STORIES} from '../reduces/actions/StoriesAction';
 const URL=process.env.REACT_APP_URL;


 export const uploadstories=(username,picture,dispatch)=>{
 
    if(username)
    {
   
       axios.post(`${URL}/stories/uploadstories`,{
               username:username,picture:picture
           }).then(res=>{
             
      
            if(res.data)
            {
            console.log(res.data);
            dispatch(UPLOAD_STORIES(res.data));
   
            }else{
                console.log("ERROR")
            }
           });
    }
 }
 export const getstories=async(username,dispatch)=>{
     try{
        const res=await axios.get(`${URL}/stories/getstories?username=${username}`);
        if(res.data)
        {
          console.log(res.data);
          dispatch(GET_STORIES(res.data));
        }
     }catch(err)
     {
         console.log(err);
     }
 }



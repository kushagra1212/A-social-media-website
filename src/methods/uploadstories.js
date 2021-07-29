 import axios from 'axios';
import {UPLOAD_STORIES,GET_STORIES,GET_STORIES_FROM_OTHERS} from '../reduces/actions/StoriesAction';
 const URL=process.env.REACT_APP_URL;


 export const uploadstories=(username,picture,dispatch)=>{
 
    if(username)
    {
   
       axios.post(`${URL}/stories/uploadstories`,{
               username:username,picture:picture
           }).then(res=>{
             
      
            if(res.data)
            {
      
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
       
          dispatch(GET_STORIES(res.data));
        }
     }catch(err)
     {
         console.log(err);
     }
 }
 export const getstoriesFromOthers=async(username,dispatch)=>{
    try{
       const res=await axios.get(`${URL}/stories/getstories?username=${username}`);
       if(res.data)
       {
        
        if(res.data.length>=1)   await dispatch(GET_STORIES_FROM_OTHERS(username,res.data));
       }
    }catch(err)
    {
        console.log(err);
    }
}



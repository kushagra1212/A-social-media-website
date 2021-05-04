 import axios from 'axios';
 import {Stories_uploaded,update_stories} from '../reduces/actions/StoriesAction';
 const URL=process.env.REACT_APP_URL;

 export const uploadstories=async(username,dispatch)=>{
   
    if(username)
    {
        try{
            
        const res=await axios.post(`${URL}/stories/uploadimage`,{
            username:username
        });
        if(res.data)
        { console.log(res.data);
          dispatch(Stories_uploaded(res.data));
        } 
        }catch(err)
        {
            console.log(err);
        }
    }  
 }
 export const updatestories=async(_id,picture,dispatch)=>{
     if(_id)
     {
         try{
            const res=await axios.patch(`${URL}/stories/updatestories`,{
                _id:_id,picture:picture
            });
            if(res.data)
            {
                console.log(res.data);
                dispatch(update_stories(res.data));
   
            }else{
                console.log("ERROR")
            }
         }catch(err)
         {
             console.log(err);
         }
     }
 }
 export const getstarted=async(username)=>{
     try{
        const res=await axios.get(`${URL}/stories/getstarted?username=${username}`);
        if(res.data)
        {
            console.log("FROM GETSTARTED",res.data)
            return res.data;
        }else{
            return {started:false};
        }
     }catch(err)
     {
         console.log(err);
     }
 }



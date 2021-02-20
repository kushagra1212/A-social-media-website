import axios from 'axios';
import count from '../count';
const URL=process.env.REACT_APP_URL;
export const setusername=(username)=>{
    return(
        {
            type:"SET_USERNAME",
            payload:username
        }
    )
}


export const getusername=(username)=>{
    return async(dispatch)=>{
         try{
            const res =await axios.post(`${URL}/count/setcount`,{
                username:username
            });
            if(res.data)
            {
                 dispatch(setusername(res.data.username));
                            }
         }catch(err)
         {
             console.log(err);
         }

    }
}
const updatepostcount=(postcount)=>{
    return({
        type:"UPDATE_POST_COUNT",
        payload:postcount
    })
}

export const updatecountforpost=(username,postcount)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.patch(`${URL}/count/updatepostcount`,{
                username:username,postcount:postcount+1
            });
            if(res.data)
            {
              
                dispatch(updatepostcount(res.data.postcount));
            }
            
        }catch(err)
        {
            console.log(err);
        }

    }
}


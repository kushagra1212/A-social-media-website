import axios from 'axios';

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
const updatefollowerscount=(followerscount)=>{
    return({
        type:'UPDATE_FOLLOWERS_COUNT',
        payload:followerscount
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
const updatefollowingcount=(followingcount)=>{
    return(
        {
            type:'UPDATE_FOLLOWING_COUNT',
            payload:followingcount
        }
    )
}
export const updatefollowerandfollowing=(username,usernameofsender)=>{
 
    return async(dispatch)=>{
        try{
            const res=await axios.patch(`${URL}/item/updatefollowerandfollowing`,{
                username:username,
                usernameofsender:usernameofsender
            });
          
            if(res.data)
            {
                
                dispatch(updatefollowingcount(res.data.followingcount));
            }
        }catch(err)
        {
            console.log(err);
        }
    }
}
export const getfollowingcount=(username)=>{
    return async(dispatch)=>{
        try{
            const res=await axios.patch(`${URL}/count/updatefollowingcount`,{
                username:username
            })
      
            if(res.data)
            {
                dispatch(updatefollowingcount(res.data.followingcount));
            }

        }catch(err)
        {
            console.log(err);
        }
    }
}

export const getfollowerscount=(username)=>{
    return async(dispatch)=>{
      try{

        const res=await axios.patch(`${URL}/count/updatefollowerscount`,{
            username:username
        });
        if(res.data)
        {
            dispatch(updatefollowerscount(res.data.followerscount));
        }
      }catch(err)
      {
          console.log(err);
      }
    }
}

export const getpostscount=(username)=>{
    return async(dispatch)=>{
        try{
            
        const res=await axios.get(`${URL}/count/getpostcount?username=${username}`);
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
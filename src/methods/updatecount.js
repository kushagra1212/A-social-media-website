import axios from 'axios';
import { updateusercount } from '../reduces/actions/userAction';
const URL=process.env.REACT_APP_URL;
export const updatecount=async(postcount,followerscount,followingcount,_id,dispatch)=>{
       
    try{
        const res =await axios.patch(`${URL}/upload/updateusercount`,{
            postcount:postcount,followerscount:followerscount,followingcount:followingcount,id:_id
        });
        if(res.data){
           
           dispatch(updateusercount(res.data));;
           console.log("UPDATED")

        }

    }catch(err)
    {
        console.log(err);
    } 
   }
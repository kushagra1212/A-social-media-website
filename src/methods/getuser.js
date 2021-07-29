import axios from 'axios'
const URL=process.env.REACT_APP_URL;

const getuser=async(username)=>{
try{
    const res=await axios.get(`${URL}/users/getuser?username=${username}`);
     if(res.data)
     {
     
         return res.data;
     }else{
         return({msg:"NOt Found"});
     }

}catch(err)
{
    console.log(err);

}

}
export default getuser;
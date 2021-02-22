import axios from 'axios'
const URL=process.env.REACT_APP_URL;
const verifiesusers=async(setfollowingfunc,username,usernameofsender)=>{
    try{

       const res=await axios.get(`${URL}/item/verifiesusers?username=${username}&usernameofsender=${usernameofsender}`);
       if(res.data)
       {
           if(res.data.found) setfollowingfunc(res.data.found);

       }
    }catch(err)
    {
        console.log(err);
    }
 }
 export default verifiesusers;
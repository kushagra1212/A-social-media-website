import axios from 'axios';
const URL=process.env.REACT_APP_URL;
const updatelikes=async({username,id})=>
{
   
    try{
        const res=await axios.patch(`${URL}/post/updatelikes?username=${username}&id=${id}`);
     if(res.data)
     {
       
     }else{
         console.log("error occoured")
    }
    }catch(err)
    {
        console.log(err);
    }
}
export default updatelikes;
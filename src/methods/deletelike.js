import axios from 'axios';
const URL=process.env.REACT_APP_URL;
const deletelike=async({username,id})=>{
   try{
        const res=await axios.delete(`${URL}/post/deletelike?username=${username}&id=${id}`);
        if(res.data)
        {
            
        }
     
   }catch(err)
   {
       console.log(err);
   }

}
export default deletelike;
import axios from "axios";
const URL =process.env.REACT_APP_URL;
const deletePost=async(id,picture)=>{
    
    try{
        
    const res=await axios.delete(`${URL}/post/deleteuserpost`,{
        data:{
            id,picture
        }   
    });

    }catch(err)
    {
        console.log(err);
    }

}

export default deletePost;
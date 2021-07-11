import axios from 'axios';
const URL=process.env.REACT_APP_URL;
const addcomment=async(id,username,comment,profilePicture)=>{
 try{
    const res=await axios.patch(`${URL}/post/addcomment`,{
     id:id,
     username:username,
     comment:comment,
     profilePicture:profilePicture
   
    });
    if(res.data)
    {
        console.log(res.data);
        return res.data;
    }else{
        console.log("error in getting post after adding comments")
    }
 }catch(err)
 {
     console.log(err);
 }
 
}
export default addcomment;
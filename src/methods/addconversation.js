import axios from 'axios';
const URL=process.env.REACT_APP_URL;

const addconversation=async(members)=>{
     console.log(members);
    try{
            
     const res=await axios.post(`${URL}/messenger/conversation`, {
       members
     });
     if(res.data)
     return res.data;
    }catch(err){
            console.log(err);
    }


}

export default addconversation;
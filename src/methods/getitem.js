import userEvent from '@testing-library/user-event';
import axios from 'axios';


const URL=process.env.REACT_APP_URL;
const getitem=async(username)=>{
try{
    const res=await axios.get(`${URL}/item/getitem?username=${username}`);
if(res.data)
{
    
    return res.data;
}else{
    return {msg:"not found"}
}
}catch(err)
{
    console.log(err);
}


}
export default getitem;
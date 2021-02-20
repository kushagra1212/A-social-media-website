import {addposts} from '../reduces/actions/userAction';
import axios from 'axios'
const URL=process.env.REACT_APP_URL;
export const getposts=async(_id,setpostcount,dispatch)=>{
    try{
     
        const posts= await axios.get(`${URL}/post/getpost?id=${_id}`);
       setpostcount(posts.data.length);
      console.log(posts.data.length);
        dispatch(addposts(posts.data))

    }catch(err)
           {
              
               console.log(err);
           } 
}
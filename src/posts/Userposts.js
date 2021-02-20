import axios from 'axios'
import { useEffect ,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {getposts} from '../methods/getposts';
import {updatecount} from '../methods/updatecount'
const URL =process.env.REACT_APP_URL;
 const Userposts=()=>{
    const dispatch=useDispatch();
    const {_id,postsnumber,followingcount,followerscount}=useSelector(state=>state.user);
 const [loading,setloading]=useState(false);
    const [postcount,setpostcount]=useState(0);
   
    
    useEffect(()=>{
        setloading(!loading);
        getposts(_id,setpostcount,dispatch);
    
       
    },[])
    useEffect(()=>{
        setloading(!loading);
        updatecount(postcount,followerscount,followingcount,_id,dispatch);
     
    },[])
   if(loading)
   {
       return(<div>Loading...</div>)
   }
    return null;
}
export default Userposts;


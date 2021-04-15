import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {addfeedposts} from '../reduces/actions/userAction' 

const Feedposts=(newpost,dispatch)=>{
    
 
   
        dispatch(addfeedposts(newpost));

    return null;

}


export default Feedposts;
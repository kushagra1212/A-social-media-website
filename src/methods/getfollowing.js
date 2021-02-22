import {getfollowingcount} from '../reduces/actions/countAction'
 const getfollowing=(username,dispatch)=>{
   dispatch(getfollowingcount(username));
}
export default getfollowing;
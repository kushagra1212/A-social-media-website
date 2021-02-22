import {getfollowerscount} from '../reduces/actions/countAction';

const getfollowers=(username,dispatch)=>{
    dispatch(getfollowerscount(username));
}
export default getfollowers;
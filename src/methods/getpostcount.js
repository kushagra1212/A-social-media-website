import {getpostscount} from '../reduces/actions/countAction'
const getpostcount=(username,dispatch)=>{
    dispatch(getpostscount(username))
}
export default getpostcount;
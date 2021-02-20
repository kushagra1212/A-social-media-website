let initial={username:"",postcount:0,followerscount:0,followingcount:0}
const count=(state=initial,action)=>
{
    switch(action.type)
    {
        case "SET_USERNAME":
            state.username=action.payload;
            return state;
            
        case "UPDATE_POST_COUNT":
            state.postcount=action.payload;
            return state;
        case "UPDATE_FOLLOWERS_COUNT":
            state.followerscount=action.payload;
            return state;
        case "UPDATE_FOLLOWING_COUNT":
            state.followingcount=action.payload;
            return state;
        default:
            return state;


    }
}
export default count;
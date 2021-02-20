let initial={_id:"",profilepic:"",email:"",username:"",name:"",postsnumber:0,followerscount:0,followingcount:0,bio:""}
const user=(state=initial,action)=>{
    switch(action.type)
    {
        case "GET_USER":
            return (state);
        case "SET_USER":
            state._id=action.payload._id; 
            state.profilepic=action.payload.profilepic;
            state.email=action.payload.email;
            state.username=action.payload.username;
            state.name=action.payload.name;
            state.followerscount=action.payload.followerscount;
            state.followingcount=action.payload.followingcount;
            state.postsnumber=action.payload.postsnumber;
            state.bio=action.payload.bio;
            return state;
        case "UPDATE_USER":
            const {email,username,profilepic,bio}=action.payload;
            state.email=email;
            state.username=username;
            state.bio=bio;
            state.profilepic=profilepic;
            return state;
        case "UPDATE_USER_COUNT":
            state.followerscount=action.payload.followerscount;
            state.followingcount=action.payload.followingcount;
            state.postsnumber=action.payload.postsnumber;
            return state;
        
        default:
            return (state);


    }
}
export default user;
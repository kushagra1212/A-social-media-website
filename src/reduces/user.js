let initial={_id:"",profilepic:"",email:"",username:"",name:"",postsnumber:0,bio:"",following_users:new Array()}
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
        case "SET_FOLLOWING_USERS":
            state.following_users=[...state.following_users,...action.payload.following];
            return state;
       
        
        default:
            return (state);


    }
}
export default user;
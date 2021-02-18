

const signinReducer =(state={signup:false,access:false},action)=>
{
    switch(action.type)
{
    case "signup":
        state.signup=action.payload;
        return(
           state
        )
    case "access":
        state.access=action.payload;
        return state;
    default:
        return(state);
      
    

}


}
export default signinReducer;
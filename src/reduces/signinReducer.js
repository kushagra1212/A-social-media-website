

const signinReducer =(state={signup:false,access:false},action)=>
{
    switch(action.type)
{
    case "signup":
        
        return {...state,signup:action.payload}
    case "access":
        
        return {...state,access:action.payload};
    default:
        return state;

}


}
export default signinReducer;
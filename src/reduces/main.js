const initialstate={profile:false,home:true,like:false,search:false}

const main=(state=initialstate,action)=>{
switch(action.type)
{
    case "SHOWPROFILE":
       state.home=false;
       state.like=false;
       state.profile=false;
        state.profile=action.payload;
        return(state);
    case "SHOWHOME":
        state.like=false;
        state.profile=false;
         state.search=false;
        state.home=action.payload;
        return(state);
    case "SHOWLIKE":
        state.profile=false;
        state.search=false;
       state.home=false;
        state.like=action.payload;
        return(state);
    case "SHOWSEARCH":
        state.profile=false;
        state.like=false;
       state.home=false;
        state.search=action.payload;
        return(state);

    default:
        return(state)
}
}

export default main;
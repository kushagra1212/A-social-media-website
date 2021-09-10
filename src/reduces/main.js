const initialstate={profile:false,home:true,like:false,search:false,message:false}

const main=(state=initialstate,action)=>{
switch(action.type)
{
    case "SHOWPROFILE":
        return {...state,home:false,like:false,search:false,message:false,box:false,profile:action.payload};
    case "SHOWHOME":
        return {...state,like:false,profile:false,search:false,box:false,message:false,home:action.payload};
    case "SHOWLIKE":
      
        return {...state,profile:false,search:false,message:false,box:false,home:false,like:action.payload};
    case "SHOWSEARCH":
        return {...state,profile:false,like:false,home:false,message:false,box:false,search:action.payload};
    case "SHOWMESSAGE":
        
       return {...state,profile:false,like:false,home:false,box:false,search:false,message:action.payload}


    default:
        return(state)
}

}

export default main;
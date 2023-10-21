let initialstate={box:Boolean,conversationID:null,user:null,socket:null,userPicture:null};
const MessageReducer=(state=initialstate,action)=>{
        
        switch(action.type){

                case "SHOWBOX":
                   return {...state,box:action.payload};
                case "SETCONVERSATIONID":
                    return {...state,conversationID:action.payload};
                case "SETUSERCONVERSATION":
                    return {...state,user:action.payload};
                case "SETSOCKET":
                    return {...state,socket:action.payload}
                case "SETUSERPICTURE":
                    return {...state,userPicture:action.payload.userPicture};
                default:
                        return state;
        }
     
}

export default MessageReducer;

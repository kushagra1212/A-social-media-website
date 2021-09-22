export const setconversationID=(conversationID)=>{
        
        return {type:"SETCONVERSATIONID",payload:{conversationID:conversationID}};
}

export const setsocket=(socket)=>{
        return {type:"SETSOCKET",payload:socket};
}
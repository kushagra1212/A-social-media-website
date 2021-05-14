const Stories=(state={show_user_stories:false,show_webcam:false,documents:[]},action)=>{
    switch(action.type)
    {
        case "SHOW_USER_STORIES":
        
         return {...state,show_user_stories:action.payload.show_user_stories};
        case "SHOW_WEBCAM":
            return {...state,show_webcam:action.payload.show_webcam};
        case "UPLOAD_STORIES":
        state.documents.push(action.payload.document)   
        return state;
        case "GET_STORIES":
            state.documents=action.payload.documents;
            return state;
        
         default:
             return state;
    }
}
export default Stories;
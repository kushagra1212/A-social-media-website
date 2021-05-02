const Stories=(state={show_user_stories:false,show_webcam:false,picture:new String()},action)=>{
    switch(action.type)
    {
        case "SHOW_USER_STORIES":
        
         return {...state,show_user_stories:action.payload.show_user_stories};
        case "SHOW_WEBCAM":
            return {...state,show_webcam:action.payload.show_webcam};
        case "IMAGE_UPLOADED":
            return{...state,picture:action.payload.picture};
         default:
             return state;
    }
}
export default Stories;
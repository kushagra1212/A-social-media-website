const Stories=(state={show_user_stories:false,show_webcam:false,picture:Array,started:false,_id:null},action)=>{
    switch(action.type)
    {
        case "SHOW_USER_STORIES":
        
         return {...state,show_user_stories:action.payload.show_user_stories};
        case "SHOW_WEBCAM":
            return {...state,show_webcam:action.payload.show_webcam};
        case "STORIES_UPLOADED":
            return{...state,started:action.payload.started,_id:action.payload._id};
        case "UPDATE_STORIES":
            state.picture.push({picturee:action.payload.picture});
            return state;
         default:
             return state;
    }
}
export default Stories;
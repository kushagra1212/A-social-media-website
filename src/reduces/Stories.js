const Stories=(state={show_user_stories:false,back:false},action)=>{
    switch(action.type)
    {
        case "SHOW_USER_STORIES":
         state.show_user_stories=action.payload.show_user_stories;
         return state;
         default:
             return state;
    }
}
export default Stories;
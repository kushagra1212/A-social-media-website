
export const show_user_stories_handle=(flag)=>{
  return ({type:"SHOW_USER_STORIES",payload:{show_user_stories:flag}});
}
export const show_webcam_handle=(flag)=>{
  return {type:"SHOW_WEBCAM",payload:{show_webcam:flag}};
}
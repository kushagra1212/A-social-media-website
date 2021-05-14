
export const show_user_stories_handle=(flag)=>{
  return ({type:"SHOW_USER_STORIES",payload:{show_user_stories:flag}});
}
export const show_webcam_handle=(flag)=>{
  return {type:"SHOW_WEBCAM",payload:{show_webcam:flag}};
}

export const UPLOAD_STORIES=(document)=>{
  return {type:"UPLOAD_STORIES",payload:{document:document}};
}

export const GET_STORIES=(documents)=>{
  return {type:"GET_STORIES",payload:{documents:documents}};
}
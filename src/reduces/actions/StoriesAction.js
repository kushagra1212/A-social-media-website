
export const show_user_stories_handle=(flag)=>{
  return ({type:"SHOW_USER_STORIES",payload:{show_user_stories:flag}});
}
export const show_others_stories_handle=(flag,key)=>{
  return ({type:"SHOW_OTHERS_STORIES",payload:{flag:flag,key:key}});
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
export const GET_STORIES_FROM_OTHERS=(username,document)=>{
  return {type:"GET_STORIES_FROM_OTHERS",payload:{story:{username:username,stories:document}}};
}
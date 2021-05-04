
export const show_user_stories_handle=(flag)=>{
  return ({type:"SHOW_USER_STORIES",payload:{show_user_stories:flag}});
}
export const show_webcam_handle=(flag)=>{
  return {type:"SHOW_WEBCAM",payload:{show_webcam:flag}};
}

export const Stories_uploaded=(data)=>{
  return {type:"STORIES_UPLOADED",payload:{started:true,_id:data._id}};
}
export const update_stories=(data)=>{
  return {type:"UPDATE_STORIES",payload:{picture:data.picture}};
}
export const stories_started=(started,picture)=>{
  return {type:"STARTED",payload:{started:started,picture:picture}};
}
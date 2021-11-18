export const addLatestPosts=(posts,array)=>{
    return({type:"ADD_LATEST_POSTS",payload:{posts:posts,array:array}});
}
export const updateLatestPost=(post)=>{
    return {type:"UPDATE_LATEST_POST",payload:{post:post}};
}
export const resetLatestPosts=(post)=>{
    return{type:"RESET_LATEST_POSTS",payload:{post:post}};
}
export const updateLatestLikesArray=(username,key)=>{
   return {type:"UPDATE_LATEST_LIKES_ARRAY",payload:{username:username,postID:key}};
}
export const updateLatestUnlikesArray=(unlikesArray)=>{
    return {type:"UPDATE_LATEST_UNLIKES_ARRAY",payload:{unlikesArray:unlikesArray}};
}
export const updateLastCount=(lastcount)=>{
    return {type:"UPDATE_LAST_COUNT",payload:{lastcount:lastcount}};
}
export const setScrollPositionHandler=(scrollPosition)=>{
    return {type:"SET_SCROLL_POSITION",payload:{scrollPosition:scrollPosition}}
}
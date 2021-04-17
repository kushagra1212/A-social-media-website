 const feedposts=(state={posts:new Array(),lastcount:new Number(),array:new Array(),lastcount2:new Number},action)=>{
    switch(action.type)
    {
        case "ADD_FEED_POSTS":
            state.posts=action.payload.posts;
            state.lastcount+=action.payload.lastcount;
            state.array=action.payload.array;
            state.lastcount2+=action.payload.lastcount2;
            return state;
        case "GET_FEED_POSTS":
            return state;
    }
    return state;

}

export default feedposts;
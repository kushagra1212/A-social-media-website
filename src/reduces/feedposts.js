 const feedposts=(posts=[],action)=>{
    switch(action.type)
    {
        case "ADD_FEED_POSTS":
            posts=action.payload;
            return posts;
        case "GET_FEED_POSTS":
            return posts;
    }
    return posts;

}

export default feedposts;
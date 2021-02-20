const userposts=(posts=[],action)=>{
    switch(action.type)
    {
        case "ADD_POSTS":
            posts=action.payload
            return (posts);
        case "GET_POSTS":
            return posts;
        default:
            return posts;
    }

}

export default userposts;
let initial = {
  _id: '',
  profilepic: '',
  email: '',
  username: '',
  name: '',
  postsnumber: 0,
  bio: '',
  following_users: new Array(),
};
const user = (state = initial, action) => {
  switch (action.type) {
    case 'GET_USER':
      return state;
    case 'SET_USER':
      return {
        ...state,
        _id: action.payload._id,
        profilepic: action.payload.profilepic,
        email: action.payload.email,
        username: action.payload.username,
        name: action.payload.name,
        postsnumber: action.payload.postsnumber,
        bio: action.payload.bio,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        profilepic: action.payload.profilepic,
        bio: action.payload.bio,
      };
    case 'SET_FOLLOWING_USERS':
      return {
        ...state,
        following_users: [
          ...state.following_users,
          ...action.payload.following,
        ],
      };

    default:
      return state;
  }
};
export default user;

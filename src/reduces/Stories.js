const Stories = (
  state = {
    show_user_stories: false,
    show_others_stories: { flag: false, key: -1 },
    show_webcam: false,
    documents: [],
    othersStories: [],
    loading: true,
  },
  action
) => {
  switch (action.type) {
    case "SHOW_USER_STORIES":
      return { ...state, show_user_stories: action.payload.show_user_stories };
    case "SHOW_WEBCAM":
      return { ...state, show_webcam: action.payload.show_webcam };
    case "UPLOAD_STORIES":
      return {
        ...state,
        documents: [...state.documents, action.payload.document],
      };
    case "GET_STORIES":
      return { ...state, documents: action.payload.documents };
    case "GET_STORIES_FROM_OTHERS":
      let otherstoriesTemp = state.othersStories;

      let found = otherstoriesTemp.some(
        (element) => element.username === action.payload.story.username
      );
      if (found) {
        return { ...state, loading: false };
      }

      return {
        ...state,
        othersStories: [...state.othersStories, action.payload.story],
        loading: false,
      };
    case "SHOW_OTHERS_STORIES":
      let flag = action.payload.flag;
      let key = action.payload.key;

      return { ...state, show_others_stories: { flag: flag, key: key } };

    default:
      return state;
  }
};
export default Stories;

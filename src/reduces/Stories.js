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
      state.documents.push(action.payload.document);
      return state;
    case "GET_STORIES":
      state.documents = action.payload.documents;
      return state;
    case "GET_STORIES_FROM_OTHERS":
      state.othersStories.push(action.payload.story);
      state.loading = false;
      return state;
    case "SHOW_OTHERS_STORIES":
      let flag = action.payload.show_others_stories;
      let key = action.payload.key;

      return { ...state, show_others_stories: { flag: flag, key: key } };

    default:
      return state;
  }
};
export default Stories;

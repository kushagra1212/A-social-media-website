import { updatefollowerandfollowing } from "../reduces/actions/countAction";

export const setfollowers = async (username, usernameofsender, dispatch) => {
  dispatch(updatefollowerandfollowing(username, usernameofsender));
};

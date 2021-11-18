import { removefollowerandfollowing, updatefollowerandfollowing } from "../reduces/actions/countAction";

export const setfollowers = async (username, usernameofsender, dispatch) => {
  dispatch(updatefollowerandfollowing(username, usernameofsender));
};
export const removefollowers = async (username, usernameofsender, dispatch) => {
  dispatch(removefollowerandfollowing(username, usernameofsender));
};

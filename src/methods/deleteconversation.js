import axiosInstance from '../Errors/httpInterceptor';

const URL = process.env.REACT_APP_URL;

const deleteconversation = async (members) => {
  try {
    const res = await axiosInstance.patch(
      `${URL}/messenger/deleteconversation`,
      {
        members,
      }
    );

    // console.log(res.data);
    if (res.data) return res.data;
  } catch (err) {
    console.log(err);
  }
};
export default deleteconversation;

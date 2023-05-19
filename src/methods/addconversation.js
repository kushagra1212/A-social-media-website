import axiosInstance from '../Errors/httpInterceptor';

const URL = process.env.REACT_APP_URL;

const addconversation = async (members) => {
  // console.log(members);
  try {
    const res = await axiosInstance.post(`${URL}/messenger/conversation`, {
      members,
    });
    if (res.data) return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default addconversation;

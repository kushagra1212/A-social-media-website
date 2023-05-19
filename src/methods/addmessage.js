import axiosInstance from '../Errors/httpInterceptor';

const URL = process.env.REACT_APP_URL;
const addmessage = async (Message) => {
  try {
    const res = await axiosInstance.post(`${URL}/messenger/message`, Message);

    if (res.data) return res.data;
    // else console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export default addmessage;

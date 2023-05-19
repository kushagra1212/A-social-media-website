import axiosInstance from '../Errors/httpInterceptor';

const URL = process.env.REACT_APP_URL;

const getSuggestion = async (username) => {
  const res = await axiosInstance.get(`${URL}/users/suggestuser/${username}`);
  return res?.data;
};

export default getSuggestion;

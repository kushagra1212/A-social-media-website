import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const URL = API_END_POINT;

const getSuggestion = async (username) => {
  const res = await axiosInstance.get(`${URL}/users/suggestuser/${username}`);
  return res?.data;
};

export default getSuggestion;

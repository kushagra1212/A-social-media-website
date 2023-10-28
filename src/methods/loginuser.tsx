import axiosInstance from '../Errors/httpInterceptor';
import { API_END_POINT } from '../utils/constants/env';

const loginUserHandler = async ({ username, password }) => {
  const res = await axiosInstance.post(
    `${API_END_POINT}/auth/signin`,
    {
      username: username,
      password: password,
    },
    {
      withCredentials: true,
    },
  );

  return res;
};

export default loginUserHandler;

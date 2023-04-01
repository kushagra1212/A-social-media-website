import axios from 'axios';
const URL = process.env.REACT_APP_URL;

const getSuggestion = async (username) => {
  const res = await axios.get(`${URL}/users/suggestuser/${username}`);
  return res?.data;
};

export default getSuggestion;

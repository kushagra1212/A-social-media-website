import axios from "axios";
const URL = process.env.REACT_APP_URL;
const getconversations = async (username) => {
  const conversations = await axios.get(
    `${URL}/messenger/conversation?username=${username}`
  );
  return conversations.data;
};

export default getconversations;

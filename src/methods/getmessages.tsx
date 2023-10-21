import axios from 'axios';
import { API_END_POINT } from '../utils/constants/env';
const URL = API_END_POINT;
const getmessages = async (conversationID) => {
  try {
    const messages = await axios.get(`${URL}/messenger/message/${conversationID.conversationID}`);

    return messages.data;
  } catch (err) {
    console.log(err);
  }
};

export default getmessages;

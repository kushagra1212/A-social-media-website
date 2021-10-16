import axios from "axios";
const URL = process.env.REACT_APP_URL;
const getmessages = async (conversationID) => {
  try {
    const messages = await axios.get(
      `${URL}/messenger/message/${conversationID.conversationID}`
    );

    return messages.data;
  } catch (err) {
    console.log(err);
  }
};

export default getmessages;

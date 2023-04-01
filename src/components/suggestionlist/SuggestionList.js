import { useState, useEffect } from 'react';
import getusers from '../../methods/getusers';
import Styles from './SuggestionList.module.css';
import { useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader';
import isconnection from '../../methods/isconnection';
import { setfollowers } from '../../methods/setfollowers';
import { useDispatch } from 'react-redux';
import addconversation from '../../methods/addconversation';
import getconversations from '../../methods/getconversations';
import { addSuggestions } from '../../reduces/actions/SuggestionsAction';
const MyLoaderPC = (props) => (
  <ContentLoader
    speed={3}
    width={250}
    height={510}
    viewBox="0 0 250 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {' '}
    <rect x="15" y="70" rx="0" ry="3" width="140" height="20" />
    <rect x="15" y="0" rx="10" ry="10" width="60" height="60" />
    <rect x="140" y="5" rx="0" ry="3" width="100" height="30" />
  </ContentLoader>
);
const MyLoaderPhone = (props) => (
  <ContentLoader
    speed={3}
    width={'100%'}
    height={170}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {' '}
    <rect x="15" y="20" rx="10" ry="10" width="100" height="100" />
    <rect x="15" y="135" rx="1" ry="1" width="100" height="25" />
  </ContentLoader>
);

const SuggestionList = ({ setShowProfileHandler, setUserSearchHandler }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);
  const { suggestion } = useSelector((state) => state.Suggestions);
  const checkUsers = async (Users) => {
    let newArray = [];

    for (let user of Users) {
      let currentusername = user.username;
      const found = await isconnection(currentusername, username);
      if (!found && username !== currentusername)
        newArray.push({ user: user, following: false });
    }

    dispatch(addSuggestions(newArray));
    setLoading(false);
  };

  useEffect(() => {
    if (username !== '') {
      if (suggestion.length >= 1) {
        setLoading(false);
        return;
      }
      getusers()
        .then((res) => {
          checkUsers(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [username, suggestion]);

  const handleAdd = async (user) => {
    setfollowers(user.username, username, dispatch);
    let exists = false;

    const conver = await getconversations(username);

    conver.forEach((element) => {
      if (element.members.includes(user.username)) {
        exists = true;
      }
    });
    if (!exists) addconversation([username, user.username]);

    let index = suggestion.findIndex((item) => item.user._id === user._id);

    let u = suggestion;
    u[index].following = true;
    dispatch(addSuggestions(u));
  };
  if (loading)
    return (
      <>
        {window.screen.width >= 778 ? (
          <div className={Styles.skeletondiv}>
            {' '}
            <MyLoaderPC /> <MyLoaderPC /> <MyLoaderPC />
          </div>
        ) : (
          <div className={Styles.skeletondivphone}>
            {' '}
            <MyLoaderPhone /> <MyLoaderPhone /> <MyLoaderPhone />
          </div>
        )}
      </>
    );
  else
    return (
      <>
        <div className={Styles.maindiv}>
          {suggestion.length > 0 &&
            suggestion.map((user) => {
              return (
                <div key={user.user._id} className={Styles.listitem}>
                  <div className={Styles.listhead}>
                    <img
                      width="70px"
                      height="70px"
                      className={Styles.listimg}
                      alt=""
                      src={
                        user.user.profilepic
                          ? user.user.profilepic
                          : process.env.PUBLIC_URL + '/userImage.png'
                      }
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        let x = user.user.username;
                        setUserSearchHandler(x);

                        setShowProfileHandler(true);
                      }}
                    />
                    <button
                      onClick={() => handleAdd(user.user)}
                      className={Styles.listbut}
                      styles={
                        user.following ? { backgroundColor: 'black' } : {}
                      }
                    >
                      {user.following ? 'following' : 'follow'}
                    </button>
                  </div>
                  <h6>@{user.user.username}</h6>
                </div>
              );
            })}
        </div>
      </>
    );
};
export default SuggestionList;

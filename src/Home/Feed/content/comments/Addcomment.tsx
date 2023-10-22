import { useState } from 'react';
import Styles from './Addcomment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAd, faPlus } from '@fortawesome/free-solid-svg-icons';
const Addcomment = ({ addCommentFunc }) => {
  const [comment, setcomment] = useState('');
  const add_comment_handle = () => {
    if (comment !== '') {
      addCommentFunc(comment);
      setcomment('');
    }
  };
  return (
    <div className={Styles.maindiv}>
      <input
        className={Styles.comment_input}
        onKeyDown={(event) => (event.key === 'Enter' ? add_comment_handle() : null)}
        placeholder="Write a Comment"
        type="text"
        value={comment}
        onChange={(e) => setcomment(e.target.value)}
      />
      <FontAwesomeIcon
        style={comment === '' ? { display: 'none' } : { opacity: 1, display: 'block' }}
        onClick={add_comment_handle}
        icon={faPlus}
        cursor={'pointer'}
        className={Styles.addIcon}
      />
    </div>
  );
};
export default Addcomment;

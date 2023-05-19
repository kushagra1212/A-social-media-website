import styles from './LimitReached.module.css';
import { useHistory } from 'react-router';
const LimitReached = ({ match }) => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <p>To many requests, please try again later</p>
    </div>
  );
};
export default LimitReached;

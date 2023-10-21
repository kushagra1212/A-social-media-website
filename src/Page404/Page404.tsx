import styles from './Page404.module.css';
import { useNavigate } from 'react-router-dom';
const Page404 = () => {
  const history = useNavigate();

  return (
    <div className={styles.maindiv}>
      <img src={`404error.gif`} alt="" width="60%" height="100%" />

      <button
        className={styles.homebut}
        onClick={() => {
          history('/feed', { replace: true });
        }}
      >
        Go Home
      </button>
    </div>
  );
};
export default Page404;

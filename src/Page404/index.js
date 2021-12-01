import styles from "./Page404.module.css";
import { useHistory } from "react-router";
const Page404 = () => {
  const history = useHistory();
 
  return (
    <div className={styles.maindiv}>
      <img
        src={`${process.env.PUBLIC_URL}/404error.gif`}
        alt=""
        width="60%"
        height="100%"
      />
      
      <button className={styles.homebut} onClick={() => history.replace("/")}>
        Go Home
      </button>
    </div>
  );
};
export default Page404;

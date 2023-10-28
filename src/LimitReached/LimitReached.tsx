import styles from "./LimitReached.module.css";
const LimitReached = () => {
  return (
    <div className={styles.container}>
      <p>To many requests, please try again later</p>
    </div>
  );
};
export default LimitReached;

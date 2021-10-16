import Styles from "./Loader.module.css";
const Loader = ({ width = 1, height = 1, fontSize = 25 }) => {
  return (
    <div
      className={Styles.loader}
      style={{
        width: `${width}em`,
        height: `${height}em`,
        fontSize: `${fontSize}px`,
      }}
    ></div>
  );
};

export default Loader;

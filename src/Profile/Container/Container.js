
import Styles from "./Container.module.css";

import Userposts from "../../posts/Userposts";
const Container = ({ posts }) => {
  return (
    <div className={Styles.maindiv}>
      {posts.length > 0
        ? posts.map((dat, id) => {
            return <img key={id} src={dat.picture} />;
          })
        : null}
      <Userposts />
    </div>
  );
};
export default Container;


import { useSelector } from "react-redux";
import { useState } from "react";

import Picture from "../Picture/Picture";
const Othersstories = () => {

  const {  othersStories } = useSelector(
    (state) => state.Stories
  );
 
  const { username } = useSelector((state) => state.user);
  const [showpictures, setshowpictures] = useState(true);
  const set_picture_handle = (ans) => {
    setshowpictures(ans);
  };
  return (
    <>
      {othersStories.map((element, id) => {
        if (element.username !== username) {
          return (
            <Picture
              other={true}
              key={id}
              documents={element.stories}
              set_picture_handle={set_picture_handle}
            />
          );
        } else {
          return null;
        }
      })}
    </>
  );
};
export default Othersstories;

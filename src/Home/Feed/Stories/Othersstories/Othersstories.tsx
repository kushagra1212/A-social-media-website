import { useSelector } from 'react-redux';
import { useState } from 'react';

import Picture from '../Picture/Picture';
const Othersstories = () => {
  const { show_others_stories } = useSelector((state) => state.Stories);

  const { username } = useSelector((state) => state.user);
  const [showpictures, setshowpictures] = useState(true);
  const set_picture_handle = (ans) => {
    setshowpictures(ans);
  };
  return (
    <Picture
      other={true}
      key={show_others_stories.element._id}
      documents={show_others_stories.element.stories}
      set_picture_handle={set_picture_handle}
    />
  );
};
export default Othersstories;

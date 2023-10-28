import { useEffect, useState } from 'react';
import Content from './content/Content';
import Contentmain from './content/Contentmain';
import Styles from './Feed.module.css';
import Stories from './Stories/Stories';
const Feed = () => {
  const [go, setgo] = useState(false);
  const [isUnmounted, setUnmounted] = useState(false);
  useEffect(() => {
    if (!isUnmounted) {
      setgo(true);
    }
    return () => setUnmounted(true);
  }, []);
  return null;
};
export default Feed;

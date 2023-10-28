import Styles from './Userstories.module.css';
import {
  show_user_stories_handle,
  show_webcam_handle,
} from '../../../../reduces/actions/StoriesAction';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import ImageCropper from '../../../../Profile/Top/ImageCroper/ImageCropper';
import Webcamcapture from '../Webcam/Webcamcapture';
import Picture from '../Picture/Picture';
import { uploadstories } from '../../../../methods/uploadstories';
import { data_URL_to_file } from '../../../../methods/data_URL_to_file';
import { getCroppedImg } from '../../../../methods/createcrop';
import { useAlert } from 'react-alert';
import firebase from '@firebase/app-compat';
import NormalLoader from '../../../../Animation/Loader/loader/NormalLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowLeft, faCamera } from '@fortawesome/free-solid-svg-icons';
import Responsive from '../../../../components/responsive/Responsive';

const Userstories = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const [pic, setPic] = useState(null);
  const { show_webcam, show_others_stories } = useSelector((state) => state.Stories);
  const { username, profilepic } = useSelector((state) => state.user);
  const { documents } = useSelector((state) => state.Stories);
  const [showpictures, setshowpictures] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setloading] = useState(false);
  const Refinput = useRef();
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [showChoosebut, setShowChoosebut] = useState(true);
  const [fileName, setfileName] = useState('');

  const set_picture_handle = (ans) => {
    setshowpictures(ans);
  };

  const selectedFileHandle = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    setfileName(e.target.files[0].name);
    reader.addEventListener('load', () => {
      setImage(reader.result);
    });
  };

  const openChoosefile = () => {
    Refinput.current.click();
  };

  const handleUpdateItemImage = (sfile) => {
    setloading(!loading);
    const storage = firebase.storage();

    const uploadTask = storage.ref(`stories/${fileName}`).put(sfile);
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('stories')
          .child(fileName)
          .getDownloadURL()
          .then((ul) => {
            uploadstories(username, ul, profilepic, dispatch)
              .then((res) => {
                setloading(false);
                setSelectedFile(null);
                Alert.success('Story Added');
                dispatch(show_user_stories_handle(false));
              })
              .catch((err) => {
                console.log(err);
                dispatch(show_user_stories_handle(false));
              });
          });
      },
    );
  };

  const generateDownload = async (imageSrc, crop) => {
    if (!crop || !imageSrc) {
      return;
    }

    setloading(true);
    const canvas = await getCroppedImg(imageSrc, crop);
    let dataURL = canvas.toDataURL('image/jpeg', 0.4);
    const sfile = await data_URL_to_file(dataURL, fileName);
    setPic(dataURL);
    setImage(null);
    handleUpdateItemImage(sfile);
  };

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const save_button_handle = () => {
    setloading(true);
  };

  if (documents.length >= 1 && showpictures)
    return <Picture other={false} documents={documents} set_picture_handle={set_picture_handle} />;

  if (show_webcam)
    return (
      <div className={Styles.cameradiv}>
        <div
          className={Styles.backarrow}
          onClick={() => {
            dispatch(show_webcam_handle(false));
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2x" color="white" />
        </div>
        <Webcamcapture />
      </div>
    );
  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          zIndex: '100',
          position: 'fixed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        <NormalLoader />
      </div>
    );
  } else if (image) {
    return (
      <div className={Styles.cropdiv}>
        <ImageCropper
          crop={crop}
          image={image}
          setCrop={setCrop}
          onCropComplete={onCropComplete}
          generateDownload={generateDownload}
          setImage={setImage}
          croppedArea={croppedArea}
        />
      </div>
    );
  }

  return (
    <>
      <div className={Styles.maindiv}>
        <div
          className={Styles.backarrow}
          onClick={() => {
            dispatch(show_user_stories_handle(false));
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="2x" color="white" />
        </div>
        {pic ? (
          <>
            <img className={Styles.editimg} src={pic ? pic : '/userImage.png'} alt="" />

            <button className={Styles.savebut} onClick={save_button_handle}>
              Add to Stories
            </button>
          </>
        ) : null}

        <input
          style={{ display: 'none' }}
          type="file"
          ref={Refinput}
          onChange={selectedFileHandle}
        />

        {showChoosebut ? (
          <button className={Styles.choosebutton} type="button" onClick={openChoosefile}>
            Add Photo
          </button>
        ) : null}

        <Responsive displayIn={['Laptop']}>
          <FontAwesomeIcon
            className={Styles.camera}
            onClick={() => dispatch(show_webcam_handle(true))}
            icon={faCamera}
            color="white"
            size="2x"
          />
        </Responsive>

        <Responsive displayIn={['Mobile', 'MobilePortrait', 'Tablet']}>
          <img style={{ marginLeft: '50vw' }} alt="" src={'/stories.gif'} />
        </Responsive>
      </div>
      <Responsive displayIn={['Laptop']}>
        <img style={{ marginLeft: '50vw' }} alt="" src={'/stories.gif'} />
      </Responsive>
    </>
  );
};
export default Userstories;

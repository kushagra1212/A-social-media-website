import Cropper from "react-easy-crop";
import { useState } from "react";
import Styles from "./ImageCropper.module.css"
const ImageCropper=({crop,image,setCrop,onCropComplete,generateDownload,setImage,croppedArea,})=>{
  const[zoom, setZoom] = useState(1);

      return (<>
                <div className={Styles.cropper}>
                  <Cropper
                    image={image}
                    crop={crop}
                    aspect={1}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
            
            </div>
              <button className={Styles.cropbut} type="button" onClick={()=>generateDownload(image,croppedArea)}    > Crop</button>
              <button className={Styles.reselect} onClick={()=>setImage(null)} >Reselect</button>
          
              </>)
}

export default ImageCropper;
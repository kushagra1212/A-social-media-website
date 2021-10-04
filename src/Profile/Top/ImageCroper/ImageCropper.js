import Cropper from "react-easy-crop";
import Styles from "./ImageCropper.module.css"
const ImageCropper=({crop,image,setCrop,onCropComplete,generateDownload,setImage,croppedArea})=>{
        return (<>
                <div className={Styles.cropper}>
                  <Cropper
                    image={image}
                    crop={crop}
                    aspect={1}
                    onCropChange={setCrop}
            
                    onCropComplete={onCropComplete}
                  />
            
            </div>
              <button className={Styles.cropbut} type="button" onClick={()=>generateDownload(image,croppedArea)}    > Crop</button>
              <button className={Styles.reselect} onClick={()=>setImage(null)} >Reselect</button>
          
              </>)
}

export default ImageCropper;
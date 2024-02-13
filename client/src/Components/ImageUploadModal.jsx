import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// eslint-disable-next-line react/prop-types
function ImageCropComponent({ handleSubmit, handleImageChange }) {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 50,
    y: 50,
    width: 50,
    height: 50,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageLoaded = (image) => {
    console.log("Image loaded:", image);
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = (cropArea, pixelCrop) => {
    console.log("Crop complete:", cropArea, pixelCrop);
    setCroppedImage(cropArea);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.onerror = (err) => {
        console.error("Error reading the file:", err);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected.");
    }
  };

  const handleCropImage = () => {
    const canvas = document.createElement("canvas");
    const image = new Image();
    image.src = imageSrc;
    const ctx = canvas.getContext("2d");

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = croppedImage.width * scaleX;
    canvas.height = croppedImage.height * scaleY;

    ctx.drawImage(
      image,
      croppedImage.x * scaleX,
      croppedImage.y * scaleY,
      croppedImage.width * scaleX,
      croppedImage.height * scaleY,
      0,
      0,
      croppedImage.width * scaleX,
      croppedImage.height * scaleY
    );

    canvas.toBlob((blob) => {
      const croppedImage = new File([blob], `cropped_image_${imageIndex}.jpg`, {
        type: "image/jpeg",
      });
      handleImageChange(croppedImage, imageIndex);
      setCroppedImage(croppedImage);
    }, "image/jpeg");
  };

  return (
    <div className="w-full h-full bg-gray-400 p-4 px-12 rounded-md">
      {[...Array(4)].map((_, index) => (
        <input
          key={index}
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            handleFileChange(e);
            setImageIndex(index);
          }}
          className="block my-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
        />
      ))}
      {imageSrc && (
        <ReactCrop
          src={imageSrc}
          crop={crop}
          onImageLoaded={handleImageLoaded}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
        >
          <img src={imageSrc} alt="" />
        </ReactCrop>
      )}
      <a onClick={handleCropImage}>Crop Image</a>
      <a onClick={() => handleSubmit(false)}>upload images</a>
    </div>
  );
}

export default ImageCropComponent;

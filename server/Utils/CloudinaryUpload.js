// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");

// cloudinary.config({
//   cloud_name: "dxsgpowto",
//   api_key: "758563728588285",
//   api_secret: "Tkfzwo06QXVhhFu1oMVcE4pL7dM",
// });

// const uploadToCloudinary = (filePath) => {
//   var mainFolderName = "main";
//   var filePathOnCloudinary = mainFolderName + "/" + filePath;

//   return cloudinary.uploader
//     .upload(filePath, { public_id: filePathOnCloudinary })
//     .then((result) => {
//       console.log("images uploaded :", result);
//       fs.unlinkSync(filePath);

//       return {
//         message: "Success",
//         url: result.url,
//       };
//     })
//     .catch((error) => {
//       fs.unlinkSync(filePath);
//       return { message: "Fail" };
//     });
// };

// module.exports = uploadToCloudinary;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dxsgpowto",
  api_key: "758563728588285",
  api_secret: "Tkfzwo06QXVhhFu1oMVcE4pL7dM",
});

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "products" }, // Store images in "products" folder
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else {
          resolve({ message: "Success", url: result.secure_url });
        }
      }
    );
    uploadStream.end(file.buffer);
  });
};

module.exports = uploadToCloudinary;

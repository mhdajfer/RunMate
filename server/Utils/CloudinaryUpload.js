const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "dxsgpowto",
  api_key: "758563728588285",
  api_secret: "Tkfzwo06QXVhhFu1oMVcE4pL7dM",
});

const uploadToCloudinary = (filePath) => {
  var mainFolderName = "main";
  var filePathOnCloudinary = mainFolderName + "/" + filePath;

  return cloudinary.uploader
    .upload(filePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      fs.unlinkSync(filePath);

      return {
        message: "Success",
        url: result.url,
      };
    })
    .catch((error) => {
      fs.unlinkSync(filePath);
      return { message: "Fail" };
    });
};

module.exports = uploadToCloudinary;

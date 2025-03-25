const cloudinary = require("cloudinary").v2;

// Configure cloudinary
cloudinary.config({
  cloud_name: "dxsgpowto",
  api_key: "758563728588285",
  api_secret: "Tkfzwo06QXVhhFu1oMVcE4pL7dM",
});

const uploadToCloudinary = async (file) => {
  try {
    // Handle both multer file object and direct file path
    const fileToUpload = file.path || file.buffer;

    // If we have a buffer (from memory), we need to use upload_stream
    if (file.buffer) {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "RunMate" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(file.buffer);
      });
    }

    // If we have a path, use the regular upload
    return await cloudinary.uploader.upload(fileToUpload, {
      folder: "RunMate",
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};

module.exports = uploadToCloudinary;

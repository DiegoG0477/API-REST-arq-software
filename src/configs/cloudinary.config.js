require("dotenv").config();
const cloudinary = require("cloudinary");

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const uploadImage = async (filepath) => {
    console.log(process.env.CLOUDINARY_API_KEY)
    return await cloudinary.v2.uploader.upload(filepath, {
        folder: "eduplanet/thumbnails",
    });
};

const uploadPdf = async (filepath) => {
    return await cloudinary.v2.uploader.upload(filepath, {
        folder: "eduplanet/pdfs",
    });
}

const deleteImage = async (publicId) => {
    return await cloudinary.v2.uploader.destroy(publicId);
};

module.exports = {
    uploadImage,
    uploadPdf,
    deleteImage,
};

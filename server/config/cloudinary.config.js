const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// Storage for product images
const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // specify the folder in Cloudinary for products
        allowedFormats: ['jpg', 'png'],
    },
});

// Storage for avatar images
const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatar', // specify the folder in Cloudinary for avatars
        allowedFormats: ['jpg', 'png'],
    },
});
// Storage for avatar images
const blogStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blog', // specify the folder in Cloudinary for avatars
        allowedFormats: ['jpg', 'png'],
    },
});

// Create uploaders
const productUploader = multer({ storage: productStorage });
const avatarUploader = multer({ storage: avatarStorage });
const blogUploader = multer({ storage: blogStorage})

module.exports = { productUploader, avatarUploader, blogUploader };

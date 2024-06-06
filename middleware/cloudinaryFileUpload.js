const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

cloudinary.config({
  cloud_name: 'dn8qn0rvj',
  api_key: '311354829934642',
  api_secret: 'IDXqObaOM7r8FdN3uk5BJUeVEfw'
});

// Multer-Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => path.extname(file.originalname).slice(1),
    public_id: (req, file) => file.fieldname + '-' + Date.now()
  }
});

const parser = multer({ storage: storage });

module.exports = { parser };

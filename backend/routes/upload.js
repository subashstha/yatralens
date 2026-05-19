const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const { uploadImage, uploadMultiple, deleteImage } = require('../controllers/uploadController');

router.post('/single', protect, upload.single('image'), uploadImage);
router.post('/multiple', protect, upload.array('images', 10), uploadMultiple);
router.delete('/', protect, deleteImage);

module.exports = router;

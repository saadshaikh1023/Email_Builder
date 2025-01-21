import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  getEmailLayout,
  uploadImage,
  uploadEmailConfig,
  renderAndDownloadTemplate
} from '../controllers/emailController.js';

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

router.get('/getEmailLayout', getEmailLayout);
router.post('/uploadImage', upload.single('image'), uploadImage);
router.post('/uploadEmailConfig', uploadEmailConfig);
router.get('/renderAndDownloadTemplate/:id', renderAndDownloadTemplate);

export default router;
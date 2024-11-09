const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/multerConfig');

router.get('/me', authMiddleware, userController.getProfile);
router.put('/me', authMiddleware, upload.single('profile_picture'), userController.updateProfile);
router.delete('/me', authMiddleware, userController.deleteAccount);

module.exports = router;

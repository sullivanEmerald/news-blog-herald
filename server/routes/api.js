const express = require('express');
const router = express.Router();
const multerConfig = require('../middlewares/multer');
const newsController = require('../controllers/api');

router.post('/news', multerConfig.single('image'), newsController.createNews);

module.exports = router;

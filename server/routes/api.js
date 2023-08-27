const express = require('express');
const router = express.Router();
const multerConfig = require('../middlewares/multer');
const newsController = require('../controllers/api');

router.post('/news', multerConfig.single('image'), newsController.createNews);
router.put('/:id/news', newsController.updateLikes)
router.delete('/:id/remove', newsController.removePost)
router.get('/news/:id', newsController.getPost)
router.put('/blog/:id', newsController.updatePost)
router.get('/fetch/:id', newsController.fetchOnePost)

module.exports = router;

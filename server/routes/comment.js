const express =  require('express')
const router = express.Router()
const commentController  =  require('../controllers/comment')

router.post('/:id', commentController.postComment)
router.get('/news/:id', commentController.getComments)

module.exports = router
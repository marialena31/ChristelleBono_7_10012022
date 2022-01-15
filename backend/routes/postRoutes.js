const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth-middleware');
const multer = require('../middleware/multer-config');

router.get('/', auth, postCtrl.getAllPost);
router.get('/:id_post', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id_post', auth, postCtrl.modifyPost);
router.delete('/:id_post', auth, postCtrl.deletePost);
router.post('/:id_post/like', auth, postCtrl.likePost);
router.post('/:id_post/moderate', auth, postCtrl.moderatePost);

module.exports = router;
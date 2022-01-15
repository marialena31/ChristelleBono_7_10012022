const express = require('express');
const router = express.Router();

const counterCtrl = require('../controllers/counterCtrl');
const auth = require('../middleware/auth-middleware');

router.post('/likes', auth, counterCtrl.counterLike);
router.post('/dislikes', auth, counterCtrl.counterDislike);
router.post('/comments', auth, counterCtrl.counterComment);

module.exports = router;
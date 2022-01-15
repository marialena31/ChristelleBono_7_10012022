
//Call the  express for use
const express = require('express');

//Call the method router
const router = express.Router();

//Call the fils to have logic of user's routes
const userCtrl = require('../controllers/userCtrl');

const multer = require('../middleware/multer-config');


//Defined route signup with the methode post 
router.post('/signup', userCtrl.signup);

//Defined route login with the methode post 
router.post('/login', userCtrl.login);

//Defined route get one account with the method get
router.get('/accounts/:id_user', userCtrl.getOneAccount);

router.get('/accounts/:id_user', multer, userCtrl.modifyAccount);

//Export the methode router
module.exports = router;
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const withAuth = require('./middleware');

router.get('/',withAuth,userController.viewall); 
router.get('/search/:search',userController.find); 
router.delete('/:id',userController.delete);
router.get('/addSingleUser',userController.form);
router.post('/adduser',userController.create);
router.get('/edituser/:id',userController.edit);
router.post('/edituser/:id',userController.update);
router.get('/viewuser/:id',userController.view);
router.post("/login",userController.login);
router.get("/logout",userController.logout);

//router.get('/checkToken', userController.withAuth, userController.auth);


module.exports = router;
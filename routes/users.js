const express = require('express');
const router = express.Router();
const passport = require('passport')
const {
    catchAsync, isValidPassword,
    changePassword, isLoggedIn
} = require('../middleware')

const { 
    getLogin, postLogin, getLogout,
    getRegister, postRegister,
    getSettings, putSettings,
    getForgot, putForgot,
    getReset, putReset,
} = require('../controller/users');


// GET login /users/login
router.get('/login', getLogin);

// POST login /users/login
router.post('/login', catchAsync(postLogin)); 

// GET logout /users/logout
router.get('/logout', isLoggedIn, getLogout);

// GET register /users/register
router.get('/register', getRegister);

// POST register /users/register
router.post('/register', catchAsync(postRegister));

// GET profile /users/profile
router.get('/settings', isLoggedIn, getSettings);

// PUT profile /users/profile
router.put('/settings', 
    catchAsync(isValidPassword), 
    catchAsync(changePassword), 
    catchAsync(putSettings));

// GET forgot PW /users/forgot
router.get('/forgot', getForgot);

// PUT forgot PW /users/forgot
router.put('/forgot', catchAsync(putForgot));

// GET reset PW /users/reset
router.get('/reset/:token', catchAsync(getReset));

// PUT reset PWN /users/reser
router.put('/reset/:token', catchAsync(putReset));

module.exports = router;

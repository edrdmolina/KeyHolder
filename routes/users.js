const express = require('express');
const router = express.Router();
const passport = require('passport')
const {
    catchAsync, isValidPassword,
    changePassword,
} = require('../middleware')

const { 
    getLogin, postLogin,
    getRegister, postRegister,
    getSettings, putSettings,
} = require('../controller/users');


// GET login /users/login
router.get('/login', getLogin);

// POST login /users/login
router.post('/login', catchAsync(postLogin)); 

// GET register /users/register
router.get('/register', getRegister);

// POST register /users/register
router.post('/register', catchAsync(postRegister));

// GET profile /users/profile
router.get('/settings', getSettings);

// PUT profile /users/profile
router.put('/settings', 
    catchAsync(isValidPassword), 
    catchAsync(changePassword), 
    catchAsync(putSettings));

module.exports = router;

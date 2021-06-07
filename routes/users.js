const express = require('express');
const router = express.Router();
const passport = require('passport')

const { 
    getLogin, postLogin,
    getRegister, postRegister,
    getProfile, putProfile,
} = require('../controller/users');


// GET login /users/login
router.get('/login', getLogin);

// POST login /users/login
router.post('/login', postLogin); 

// GET register /users/register
router.get('/register', getRegister);

// POST register /users/register
router.post('/register', postRegister);

// GET profile /users/profile
router.get('/profile', getProfile);

// PUT profile /users/profile
router.put('/profile', putProfile);

module.exports = router;

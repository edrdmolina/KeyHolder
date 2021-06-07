const User = require('../models/user');


module.exports = {
    getLogin: (req, res, next) => {
        res.render('users/login');
    },
    postLogin: (req, res, next) => {
        res.send('post login form')
    },
    getRegister: (req, res, next) => {
        res.render('users/register');
    },
    postRegister: (req, res, next) => {
        res.send('post register form');
    },
    getProfile: (req, res, next) => {
        res.render('users/profile');
    },
    putProfile: (req, res, next) => {
        res.send('put profile form')
    }
    
}
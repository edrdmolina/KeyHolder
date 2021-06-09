const User = require('../models/user');
const util = require('util');


module.exports = {
    getLogin(req, res, next) {
        res.render('users/login');
    },
    async postLogin(req, res, next) {
        const { username, password } = req.body;
        const { user, error } = await User.authenticate()(username, password);
        if (!user && error) {
            req.flash('error', 'Username or password is incorrect.');
            return res.redirect('/users/login');
        }
        req.login(user, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/users/login');
            }
            req.flash('success', `Welcome back, ${username}!`);
            res.redirect('/key-manager');
        })
    },
    getRegister(req, res, next) {
        res.render('users/register');
    },
    async postRegister(req, res, next) {
        try {
            const { password, passwordConfirmation } = req.body;
            if (password !== passwordConfirmation) {
                res.flash('error', 'Passwords must match');
                return res.redirect('/users/register')
            }
            const user = await User.register(new User(req.body), req.body.password);
            req.login(user, err => {
                if(err) return next(err);
                req.flash('success', 'Welcome anonymous');
                delete req.session.returnTo;
                res.redirect('/key-manager');
            })
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('/users/register');
        }
    },
    getSettings(req, res, next) {
        res.render('users/settings');
    },
    async putSettings(req, res, next) {
        const { user } = res.locals;
        const { username, email } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;
        await user.save()
        const login = util.promisify(req.login.bind(req));
        await login(user);
        req.flash('success', 'You have succesffuly changed your user information.')
        res.redirect('/users/settings');
    }
    
}
const User = require('../models/user');

const middleware = {
    catchAsync: (fn) =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next);
        },
    isValidPassword: async (req, res, next) => {
        const { user } = await User.authenticate()(req.user.username, req.body.password);
        if(user) {
            res.locals.user = user;
            return next();
        } else {
            req.flash('error', 'Password is incorrect');
            return res.redirect('/users/settings')
        }
    },
    changePassword: async (req, res, next) => {
        const { newPassword, passwordConfirmation } = req.body;
        if (newPassword && !passwordConfirmation) {
            req.flash('error', 'Missing password confirmation.');
            return res.redirect('/users/settings');
        } else if (newPassword && passwordConfirmation) {
            const { user } = res.locals;
            if (newPassword === passwordConfirmation) {
                await user.setPassword(newPassword);
                next();
            } else {
                req.flash('error', 'New Password and Password Confirmation do not match.');
                return res.redirect('/users/settings');
            }
        } else {
            next();
        }
    },

}

module.exports = middleware;
const User = require('../models/user');
const util = require('util');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    getLogout(req, res, next) {
        req.logout();
        req.flash('success', 'You have logged out.');
        res.redirect('/')
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
    },
    getForgot(req, res, next) {
        res.render('users/forgot');
    },
    async putForgot(req, res, next) {
        // create token
        const token = crypto.randomBytes(20).toString('hex');
        // acquire email from form body
        const { email } = req.body;
        // find user with email
        const user = await User.findOne({ email });
        // if no user returned redirect with error
        if (!user) {
            req.flash('error', `No user found with email: ${email}`);
            return res.redirect('/users/forgot');
        } else {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000;
            await user.save()

            const msg = {
                to: user.email,
                from: 'KeyHolder Admin<edrdmolina11@gmail.com>',
                subject: 'KeyHolder App - Forgot / Reset Password',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
                Please click on the following link, or copy and paste it into your browser to complete the
                process: http://${req.headers.host}/users/reset/${token} If you did not request this, please ignore this email
                and your password will remain unchanged.`.replace(/                /g, ''),
            }
            await sgMail.send(msg);
            req.flash('success', `An email has been sent to ${email} with furthur instructions`);
            return res.redirect('/users/forgot');
        }
    },
    async getReset(req, res, next) {
        const { token } = req.params
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if(!user) {
            req.flash('error', 'Password reset token is invalid or has expired');
            res.redirect('/users/forgot');
        }
        res.render('users/reset', { token });
    },
    async putReset(req, res, next) {
        const { token } = req.params;
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if(!user) {
            req.flash('error', 'Password reset token is invalid or has expired');
            return res.redirect('/users/forgot');
        } else {
            const { password, passwordConfirmation } = req.body;
            if (password !== passwordConfirmation) {
                req.flash('error', 'Passwords do not match.');
                res.redirect(`/users/reset/${token}`);
            } else if (password === passwordConfirmation) {
                await user.setPassword(password);
                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;
                await user.save();
                const login = util.promisify(req.login.bind(req));
                await login(user);

                const msg = {
                    to: user.email,
                    from: 'KeyHolder Admin<edrdmolina11@gmail.com>',
                    subject: 'KeyHolder App - Forgot / Reset Password',
                    text: `This email is to confirm that the password of your account has been changed.
                    If you did not make this change please reply and notify us at once!`.replace(/                    /g, ''),
                }
                await sgMail.send(msg);
                req.flash('success', 'You have successfully reset your password.');
                res.redirect('/key-manager');
            }
        }
    }
}
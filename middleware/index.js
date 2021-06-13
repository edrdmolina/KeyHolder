const User = require('../models/user');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = process.env.CRYPTO_KEY;
const iv = crypto.randomBytes(16);

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
    isLoggedIn: (req, res, next) => {
        if(!req.isAuthenticated()) {
            req.flash('error', 'You must be logged in first.')
            res.redirect('/users/login');
        }
        next();
    },
    encrypt: (text) => {
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    },
    decrypt: (hash) => {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

        return decrpyted.toString();
    }

}

module.exports = middleware;
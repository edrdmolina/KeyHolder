const Keys = require('../models/key');

module.exports = {
    getLanding: (req, res, next) => {
        res.render('index');
    },
    getKeyManager: (req, res, next) => {
        res.render('keys/key-manager', { title: 'Manager' });
    },
    postKey: (req, res, next) => {
        res.send('Post key');
    },
    putKey: (req, res, next) => {
        res.send('Put key');
    },
    deleteKey: (req, res, next) => {
        res.send('Delete key');
    },
}
const Keys = require('../models/key');
const { encrypt, decrypt } = require('../middleware');

module.exports = {
    getLanding(req, res, next){
        res.render('index');
    },
    async getKeyManager(req, res, next) {
        const { id } = res.locals.currentUser;
        let encryptedKeys = await Keys.find({ user: { _id: id } })
            .populate('user')
            .exec()
        // encryptedKeys is an object
        // create new object and append objects into new object
        let keys = []
        
        encryptedKeys.forEach((encryptedKey, i) => {
            keys.push({
                title: decrypt(encryptedKey.title),
                key: decrypt(encryptedKey.key),
                _id: encryptedKey._id,
                user: {
                    _id: encryptedKey.user._id,
                    username: encryptedKey.user.username,
                    email: encryptedKey.user.email,
                },
            })
        })
        res.render('keys/key-manager', { title: 'Manager', keys });
    },
    async postKey(req, res, next) {
        let { title, key } = req.body;
        title = encrypt(title);
        key = encrypt(key);
        const newKey = new Keys({ title, key })
        newKey.user = req.user._id;
        await newKey.save();
        req.flash('success', 'New key added!')
        res.redirect('/key-manager');
    },
    async putKey(req, res, next) {
        const { id } = req.params;
        let { title, key } = req.body;
        // encrypt title and key
        title = encrypt(title);
        key = encrypt(key);
        const updatedKey = await Keys.findByIdAndUpdate(id, { title, key });
        await updatedKey.save()
        req.flash('success', 'Successfully updated key!');
        res.redirect('/key-manager');
    },
    async deleteKey(req, res, next) {
        const { id } = req.params;
        await Keys.findByIdAndDelete(id)
        req.flash('success', 'Deleted key!');
        res.redirect('/key-manager');
    },
}
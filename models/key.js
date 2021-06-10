const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeySchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Key', KeySchema);
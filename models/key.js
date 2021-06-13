const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeySchema = new Schema({
    title: {
        iv: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    key: {
        iv: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Key', KeySchema);

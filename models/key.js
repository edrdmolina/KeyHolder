const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeySchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Key', KeySchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const users = mongoose.model('Users', usersSchema);

module.exports = users;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, maxLength: 30},
    password: {type: String, required: true, maxLength: 50},
    email: {type: String, required: true, maxLength: 50},
    date: {type: Date}
})


module.exports = mongoose.model("User", UserSchema);
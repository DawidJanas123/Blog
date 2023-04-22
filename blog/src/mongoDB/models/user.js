const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, maxLength: 30},
    password: {type: String, required: true},
    email: {type: String, required: true, maxLength: 50},
    date: {type: String, require: true},
    tokens: [{
        token: {
            type: String, required: true
        }
    }]
}, {

    collection: 'credentials'
})

UserSchema.pre('save', async function (next) {

    const data = this;

    if (data.isModified('password')) {
        data.password = await bcrypt.hash(data.password, 8);
    }

    next();
})

UserSchema.methods.generateAuthToken = async function () {

    const data = this;

    const token = jwt.sign({_id: data.id.toString()}, "tokens")

    data.tokens = data.tokens.concat({token})

    await data.save()

    return token
}

UserSchema.statics.ifUserAlreadyExist = async (email) => {

    const user = await User.findOne({email}).exec();

    if (user) {
        throw new Error('You already have acc');
    }

}


UserSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email}).exec();

    if (!user) {
        throw new Error('Unable to Login')
    }
    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to Login');
    }

    return user
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
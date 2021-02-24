require('dotenv').config();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function randomNumber() {
    return Math.floor(Math.random() * 10);
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true,
        default: `${randomNumber()}${randomNumber()}${randomNumber()}${randomNumber()}`
    },
    date: { type: Date, default: Date.now },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// we use this NOT to send too much info in response
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEYWORD, { expiresIn: '10 days' });

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
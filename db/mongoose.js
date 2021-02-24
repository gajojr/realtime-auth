const mongoose = require('mongoose');
const User = require('./models/UserModel');

async function dbConnection() {
    await mongoose.connect('mongodb://localhost:27017/realtime-auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}

async function registerUser(userInfo) {
    const user = new User(userInfo);
    await user.save();

    const token = await user.generateAuthToken();

    return token;
}

module.exports = {
    dbConnection,
    registerUser
}
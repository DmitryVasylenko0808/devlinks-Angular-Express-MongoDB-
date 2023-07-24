const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        secondName: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        avatarFile: {
            type: String
        }
    }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
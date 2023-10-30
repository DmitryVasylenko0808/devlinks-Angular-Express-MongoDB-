const InternalError = require("../InternalError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserModel = require('../models/User')
const moveFile = require('../utils/moveFile');
const isValidFile = require("../utils/isValidFile");
class UsersController {
    static async register(req, res) {
        try {
            const user = await UserModel.findOne({ login: req.body.login });
            if (user) {
                return res.status(400).json({ success: false, errorMessages: ['This login is already exists'] });
            }

            const { password } = req.body;
            const hash = await bcrypt.hash(password, 5);

            let UAvatarFileName = null;
            if (req.files !== null) {
                if (!isValidFile(req.files.avatarFile)) {
                    return res.status(400).json({ success: false, errorMessages: ['Invalid format of the file'] });
                }

                UAvatarFileName = await moveFile(req.files.avatarFile, '../server/public/avatars');
            }
            const doc = new UserModel({
                login: req.body.login,
                passwordHash: hash,
                firstName: req.body.firstName,
                secondName: req.body.secondName,
                email: req.body.email,
                avatarFile: UAvatarFileName
            });
            await doc.save();

            res.status(201).json({ success: true });
        } catch (err) {
            InternalError.error(res, err);
        }
    }

    static async login(req, res) {
        try {
            const { login, password } = req.body;

            const user = await UserModel.findOne({ login });
            if (!user) {
                return res.status(404).json({ success: false, errorMessages: ['User is not found'] });
            }

            const isValidPass = await bcrypt.compare(password, user._doc.passwordHash);
            if (!isValidPass) {
                return res.status(403).json({ success: false, errorMessages: ['Invalid login or password'] });
            }

            const token = jwt.sign(
                {
                    _id: user._doc._id
                },
                config.SECRET_KEY,
                {
                    expiresIn: '24h'
                }
            );
            const { passwordHash, ...userData } = user._doc;

            res.json({ success: true, ...userData, token });
        } catch (err) {
            InternalError.error(res, err);
        }
    }

    static async getMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return res.status(404).json({ success: false, errorMessages: ['User is not found'] });
            }

            const { passwordHash, ...userData } = user._doc;

            res.json({ success: true, userData });
        } catch (err) {
            InternalError.error(res, err);
        }
    }

    static async saveMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId);
            if (!user) {
                return res.status(404).json({ success: false, errorMessages: ['User is not found'] });
            }

            let UAvatarFileName = user._doc.avatarFile;
            if (req.files !== null) {
                if (!isValidFile(req.files.avatarFile)) {
                    return res.status(400).json({ success: false, errorMessages: ['Invalid format of the file'] });
                }

                UAvatarFileName = await moveFile(req.files.avatarFile, '../server/public/avatars');
            }

            await UserModel.updateOne(
                { _id: req.userId },
                {
                    avatarFile: UAvatarFileName,
                    firstName: req.body.firstName,
                    secondName: req.body.secondName,
                    email: req.body.email
                }
            );

            const updatedUser = await UserModel.findById(req.userId);

            const { passwordHash, ...userData } = updatedUser._doc;
            res.json({ success: true, userData });

        } catch (err) {
            InternalError.error(res, err);
        }
    }
}

module.exports = UsersController;
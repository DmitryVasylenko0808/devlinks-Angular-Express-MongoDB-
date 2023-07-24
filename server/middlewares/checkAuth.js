const InternalError = require('../InternalError');
const jwt = require('jsonwebtoken');
const config = require('../config')
const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            try {
                const decoded = jwt.verify(token, config.SECRET_KEY);
                req.userId = decoded._id;

                next();
            } catch (err) {
                res.status(401).json({ success: false, errorMessages: ['Access denied'] });
            }
        }
        else {
            res.status(401).json({ success: false, errorMessages: ['Access denied'] });
        }
    } catch (err) {
        InternalError.error(res, err);
    }
}

module.exports = checkAuth;
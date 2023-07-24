class InternalError {
    static error(res, err, code = 500, message = 'Server error') {
        console.log(err);
        res.status(code).json({ success: false, errorMessages: [message] });
    }
}

module.exports = InternalError;
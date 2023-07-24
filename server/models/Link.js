const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        platform: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    }
);

const LinkModel = mongoose.model('Link', LinkSchema);

module.exports = LinkModel;
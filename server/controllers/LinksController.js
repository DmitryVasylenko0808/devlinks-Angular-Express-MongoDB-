const InternalError = require('../InternalError');
const LinksModel = require('../models/Link');
class LinksController {
    static async save(req, res) {
        try {
            await LinksModel.deleteMany({ user_id: req.userId });

            const links= req.body.links.map(link => {
                return new LinksModel({
                    platform: link.platform,
                    link: link.link,
                    user_id: req.userId
                });
            });

            await LinksModel.insertMany(links);

            res.json({ success: true, links });
        } catch (err) {
            InternalError.error(res, err);
        }
    }

    static async getAll(req, res) {
        try {
            const links = await LinksModel.find({ user_id: req.userId });
            if (links.length === 0) {
                return res.status(404).json({ success: false });
            }

            res.json({ success: true, links });
        } catch (err) {
            InternalError.error(res, err);
        }
    }
}

module.exports = LinksController;
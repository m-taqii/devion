const usageModel = require('../models/usage.models');
const jwt = require('jsonwebtoken');

const limitMiddleware = async (req, res, next) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        let identifier;

        // Extract token from headers first (priority), then cookies
        const tokenFromHeader = req.headers?.token || req.headers?.authorization?.split(' ')[1];
        const tokenFromCookie = req.cookies?.token;
        const token = tokenFromHeader || tokenFromCookie;

        if (token && token !== 'undefined' && token !== 'null') {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                req.user = user;
                identifier = user._id?.toString() || user.id?.toString();
            } catch (error) {
                console.log(error);
                return res.status(401).json({ message: 'Unauthorized' });
            }
        } else {
            identifier =
                req.headers['cf-connecting-ip'] ||
                req.headers['x-forwarded-for'] ||
                req.headers['x-real-ip'] ||
                req.ip;

            if (typeof identifier === "string" && identifier.includes(",")) {
                identifier = identifier.split(",")[0].trim();
            }
        }

        if (!identifier) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const usage = await usageModel.findOne({ identifier, date: today });

        if (req.user) {

            if (usage && usage.usage >= 50) {
                return res.status(429).json({ message: 'Too Many Requests' });
            }
        } else {
            if (usage && usage.usage >= 5) {
                return res.status(429).json({ message: 'Too Many Requests' });
            }
        }
        req.usageRecord = usage;
        req.identifier = identifier;
        req.today = today;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

module.exports = { limitMiddleware };
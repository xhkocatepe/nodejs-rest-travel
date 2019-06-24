let jwt = require('jsonwebtoken');
const config = require('./config/jwt.config.js');

module.exports.checkToken = (req, res, next) => {
    /** express headers are auto converted to lowercase */
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Invalid OAuth Request to the protected resource!"
        });
    }

    if (token.startsWith('Bearer ')) {
        /** get token without Bearer */
        token = token.slice(7, token.length);
    }
    /** token checks the status */
    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
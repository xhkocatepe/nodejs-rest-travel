var jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.config.js');

/** to get jwt details by genareted token */
module.exports.login = (req, res, next) => {
    /** payload Property Mapping */
    let sPassword = req.body.password;
    let sUsername = req.body.username;

    // For the given username fetch user from DB
    let sMockedUsername = 'bitaksi';
    let sMockedPassword = 'developer';

    if (sUsername && sPassword) {
        if (sUsername === sMockedUsername && sPassword === sMockedPassword) {
            let token = jwt.sign({ username: sUsername },
                jwtConfig.secret,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            res.status(200).json({
                success: true,
                message: 'Authentication successful!',
                access_token:token,
                token_type: "Bearer",
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }
};
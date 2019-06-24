/** express-validation library handles validation settings */
let jwtCtrl = require('../controllers/jwt.js');
let express = require('express');

let router = express.Router();

/** to send token to user login with this token*/
router.post('/token', jwtCtrl.login);

module.exports = router;
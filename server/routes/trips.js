/** express-validation library handles validation settings */
let tripCtrl = require('../controllers/trips/all-trips');
let minMaxDistCtrl = require('../controllers/trips/min-max-distance');
let vehicleModelYearsCtrl = require('../controllers/trips/vehicle-model-years');
let validate = require('express-validation');
let express = require('express');
let validations = require('./validation/trips');
let middleware = require('../../middleware')

let router = express.Router();

/** for taking 'trips' path then send to trip controller to get data 
 *  checks the incoming data is valid.
 */
router.get('/trips', middleware.checkToken, validate(validations.getTrips), tripCtrl.get);
router.get('/trips/minMaxTravelled', middleware.checkToken, validate(validations.getTrips),minMaxDistCtrl.get);
router.get('/trips/vehicleModelYears', middleware.checkToken, validate(validations.getTrips), vehicleModelYearsCtrl.get);

module.exports = router;
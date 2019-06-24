/** joi library imports for field validations in request payload */
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

var validation = {
    /* http GET Method path '/trips' */
    getTrips: {
        query: BaseJoi.object( {
            startDate: Joi.date().utc().format('YYYY/MM/DD HH:mm').raw(),
            endDate: Joi.date().min(Joi.ref('startDate')).format('YYYY/MM/DD HH:mm').raw(),
            radius: Joi.number().required(),
            pointLong: Joi.number().required(),
            pointLat: Joi.number().required(),
        })
    },
};

module.exports = validation;

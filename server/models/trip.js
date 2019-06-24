const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** trip Schema prototype decleration  */
var tripSchema = new Schema({
});

var Trip = mongoose.model("trip", tripSchema);

module.exports = Trip;

// {
//   "_id" : ObjectId("5cebab1fa2752d2aa3d25856"),
//   "distance_travelled" : 8459,
//   "driver_rating" : 5,
//   "rider_rating" : 5,
//   "start_zip_code" : null,
//   "end_zip_code" : "",
//   "charity_id" : null,
//   "requested_car_category" : "REGULAR",
//   "free_credit_used" : null,
//   "surge_factor" : 0,
//   "color" : "Gray",
//   "make" : "Bentley",
//   "model" : "Continental GT",
//   "year" : 2013,
//   "rating" : 5,
//   "Date" : "2016-06-04",
//   "PRCP" : 0.1,
//   "TMAX" : 86,
//   "TMIN" : 67,
//   "AWND" : 4.9,
//   "GustSpeed2" : 13,
//   "Fog" : 1,
//   "HeavyFog" : 0,
//   "Thunder" : 0,
//   "start" : {
//       "type" : "Point",
//       "coordinates" : [ 
//           -120.584894, 
//           38.73047246
//       ]
//   },
//   "end" : {
//       "type" : "Point",
//       "coordinates" : [ 
//           -120.76871207, 
//           38.99753737
//       ]
//   },
//   "complete_date" : ISODate("2016-06-04T05:27:32.000Z"),
//   "start_date" : ISODate("2016-06-04T05:18:49.000Z")
// }
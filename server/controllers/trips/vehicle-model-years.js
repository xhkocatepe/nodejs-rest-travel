/** trip Model from 'trips' Schema */
let TripModel = require('../../models/trip');
let CommonAggreate = require('../common-aggreate');

/** to get filtered trips  from client-side request */
module.exports.get = (req, res, next) => {
  /** query paramater Property Mapping  */

  /** [-97.62908873, 31.20752395] */
  let aCordinates = [req.query.pointLong, req.query.pointLat];
  /**  specify the distance in meters */
  let iMaxDistance = req.query.radius;

  /** Common Aggreate Operation Geo Spa */
  let aAggreate = [];
  let oCommonAggreation = new CommonAggreate({ aCordinates: aCordinates, iMaxDistance: iMaxDistance });
  let oGeoNearAggreate = oCommonAggreation.getGeoNearAggreate();
  /** get the aggreate using method. */
  let aVehicleModelYears = oCommonAggreation.getVehicleModelYears();

  aAggreate.push(oGeoNearAggreate);
  aAggreate = aAggreate.concat(aVehicleModelYears);

  /** aggreation with defined conditions common-aggreate.js  */
  TripModel.aggregate(aAggreate).then((trips) => {
    /** response data which is prepared for the client-side.*/
    let response = {
      "success": true,
      "trips": trips
    };

    res.json(response);
  }).catch((err) => {
    next(e)
  });
};
/** trip Model from 'trips' Schema */
let TripModel = require('../../models/trip');
let CommonAggreate = require('../common-aggreate');

/** to get trips from client-side request  */
module.exports.get = (req, res, next) => {
  /** query paramaters Property Mapping */

  /** YYYY/MM/DD HH:mm "2016/06/06 05:30" */ 
  let sStartDate = req.query.startDate || null;
  /** YYYY/MM/DD HH:mm "2016/06/06 05:50" */ 
  let sEndDate = req.query.endDate || null;
  /** [-97.62908873, 31.20752395] */ 
  let aCordinates = [req.query.pointLong, req.query.pointLat]; 
  /**  specify the distance in meters */
  let iMaxDistance = req.query.radius;

  /** common Aggreate Operation Geo Spa and Date */
  let aAggreate = [];
  let oCommonAggreation = new CommonAggreate({ aCordinates: aCordinates, iMaxDistance: iMaxDistance });
  let oGeoNearAggreate = oCommonAggreation.getGeoNearAggreate();

  aAggreate.push(oGeoNearAggreate);

  /** checks the both of date is entered by user. It can be entered only one of both.*/
  if(sStartDate || sEndDate){
    let aDateAggreate = oCommonAggreation.getDateAggrate({sStartDate : sStartDate , sEndDate :sEndDate});
    aAggreate = aAggreate.concat(aDateAggreate);
  }

  /** aggreation with defined conditions commong-aggreate */
  TripModel.aggregate(aAggreate).then((trips) => {
    /** response data which is prepared for the client-side */
    let response =
    {
      "success": true,
      "trips": trips
    };

    res.json(response);
  }).catch((err) => {
    next(e)
  });
};
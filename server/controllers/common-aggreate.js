/**
  * @param oGeoSpa information about the geo spatial.
  * @param oGeoSpa.aCordinates the 2dshphere cordinates of the geo.
  * @param oGeoSpa.iMaxDistance the radius of the geo.
  */
class commonAggreate {
    constructor(oGeoSpa) {
        this.oGeoSpa = oGeoSpa;
    }

    /** 
     * to get trips related to radius to use geo spatial 
     * near aggreate on 'case' db  
     */
    getGeoNearAggreate() {
        return {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: this.oGeoSpa.aCordinates
                },
                distanceField: "distance",
                maxDistance: this.oGeoSpa.iMaxDistance,
                spherical: true,
                key: "start",
                limit: 1000000
            }
        };
    }

    /** 
     * Calculate Date Aggreate given filtered values.
     * 
     * @param _oDateInfo.sStartDate star date of the trip.
     * @param _oDateInfo.sEndDate complete date of the trip. 
    */
    getDateAggrate(_oDateInfo) {

        var aDateAggreate = [];
        var oAddFields = {
            $addFields: {
            }
        };

        /** checks the start date is entered by user. */
        if (_oDateInfo.sStartDate) {

            oAddFields.$addFields.start_date_string = {
                $dateToString: {
                    format: "%Y/%m/%d %H:%M",
                    date: "$start_date",
                    timezone: "Europe/Istanbul"
                }
            };

            let oStartDateMatch = {
                $match: {
                    start_date_string: {
                        $gte: _oDateInfo.sStartDate
                    }
                }
            };

            aDateAggreate.push(oAddFields);
            aDateAggreate.push(oStartDateMatch);
        }
        /** checks the complete date is entered by user. */
        if (_oDateInfo.sEndDate) {

            oAddFields.$addFields.complete_date_string = {
                $dateToString: {
                    format: "%Y/%m/%d %H:%M",
                    date: "$complete_date",
                    timezone: "Europe/Istanbul"
                }
            };

            var oEndDateMatch = {
                $match: {
                    complete_date_string: {
                        $lte: _oDateInfo.sEndDate
                    }
                }
            };

            aDateAggreate.push(oAddFields);
            aDateAggreate.push(oEndDateMatch);
        }
        return aDateAggreate;
    }

    /** getting grouped data by vehicle model year throgh aggreate */
    getMinMaxDistTravelled() {
        return [
            {
                $match: { distance_travelled: { $exists: true, $ne: null } }
            },
            {   /** sort the nearest first */
                $sort: { "distance_travelled": 1 } 
            },
            {
                $group: {
                    _id: null,
                    minDistanceTravelled: { $first: "$$ROOT" },
                    maxDistanceTravelled: { $last: "$$ROOT" }
                }
            },
            // {
            //     $group: {
            //         _id: false,
            //         minDistanceTravelled: { $min: "$distance_travelled" },
            //         maxDistanceTravelled: { $max: "$distance_travelled" }
            //     }
            // },
            {
                $project: {
                    _id: false,
                    minDistanceTravelled: true,
                    maxDistanceTravelled: true
                }
            }];
    }

    /** getting grouped data by vehicle model year throgh aggreate */
    getVehicleModelYears() {
        return [
            {
                $group: { _id: "$year", numberOfTrips: { $sum: 1 } }
            },
            {
                $sort: { "_id": 1 }
            },
            {
                $project: {
                    _id: false,
                    year: "$_id",
                    numberOfTrips: true
                }
            }]
    }

}

module.exports = commonAggreate;
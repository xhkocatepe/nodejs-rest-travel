
# RESTFul API Node.js with MongoDB 


This repository delivers RESTFul API to make HTTP operations with certain filters by query then to get data over MongoDB. All endpoints validates the authentication tokens of the end users.

The project directory structuring is that:
* `config` folder includes DB and JWT configuration.
* `server/routes` handles that routing operation from the client side. 
* `server/routes/validation` handles validations in request payload or query.
* `server/models`folder consist of DB Schema and Model.
* `server/controllers` folder includes validated data and has functions to get data from DB.
* `server/tests/` folder includes various test scenarios.

## Installation
> **To access on Locally**:
1. Clone this repository
2. `cd` into the cloned copy and run `npm install`
3. Run `npm start`
4. Try it in a browser or a console doing a `POST` to `http://localhost:3000`

## Running

1. You can do `POST` on `http://localhost:3000/token` with the auth info. `body` should be like this:
User Info:

```
    {
        "username": "travel",
        "password": "developer"
    }
```

2. When you get the `access_token` after `POST` operation. You can reach the endpoint validation to add `Headers` auth parameters otherwise you cannot access.
 ```
    {
        "Authorization": "Bearer " + access_token
    }
 ```

## API EndPoints

* `GET` **`/trips`** clients can reach to query all trips filtered by parameters.

---**query parameters**:

```
	{
	    "pointLong": double
	    "pointLat": double
	    "radius": int  //meters
	    "endDate": dateString "YYYY/MM/DD HH:mm" (Optinal)
	    "startDate":dateString "YYYY/MM/DD HH:mm" (Optinal)
	}
	
```
 -- **response sample**:
 
 ```
 {
	 "success": true,
	    "trips": [
		{
		    "_id": "5cebab1fa2752d2aa3d25868",
		    "distance_travelled": 5872,
		    "driver_rating": 5,
		    "rider_rating": 5,
				.
				.
				.
		}
	    ]
}
```
* `GET`  **`trips/minMaxTravelled`** get the min and max distance travelled for the trips with the **trip** information. Additional, client choose to start point and a radius to be strictred area.

---**query parameters**:

```
	{
	    "pointLong": double
	    "pointLat": double
	    "radius": int  //meters
	}
	
```

-- **response sample**:
 
 ```
 	{
	    "success": true,
	    "trips": [
		{
		    "minDistanceTravelled": {
			"_id": "5cebab38a2752d2aa3d2b68b",
			"distance_travelled": 1,
			"driver_rating": 5,
			"rider_rating": 5,
					.
					.
					.
		    },
		    "maxDistanceTravelled": {
			"_id": "5cebab34a2752d2aa3d2a5cd",Mission Completed 👾
			"distance_travelled": 234592,
			"driver_rating": 5,
			"rider_rating": 5,

		    }
		}
	    ]
	}

```
	
* `GET` **`trips/vehicleModelYears`** Clients can access the number of trips with grouped by vehicle model year. It is the same above the trips which are started in a strictred region  by a point and a radius.

-- **query parameters**:
```
	{
	    "pointLong": double
	    "pointLat": double
	    "radius": int   //meters
	}
```

-- **response sample**:

```
	{
	    "success": true,
	    "trips": [
		{
		    "numberOfTrips": 303,
		    "year": 2001
		},
		{
		    "numberOfTrips": 89,
		    "year": 2002
		}
	    ]
	}
```

## Testing

To run tests  run  `npm test` with `mocha` and `chai` on local system. You can reach `server/tests/` folders consist of `jwt.test.js` and `trips.test.js`

## POSTMAN Files

You can download POSTMAN Saved files related to API Endpoint. There are 2 files to download.
1. `postman/travel-hakan.postman_collection.json` consists of 4 requests including Auth token request.
2. `postman/travel-env-hakan.postman_environment.json` consist of Environment Info. You do not need to copy and paste `access_token` because environment can handle automatically save other requests.


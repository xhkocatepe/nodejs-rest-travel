const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
const expressValidation = require('express-validation');

/** get all trip route path */
const tripRoute = require('./server/routes/trips');

/** trip route path */
const jwtRoute = require('./server/routes/jwt');

/** express Declaration */
const app = express();

/** parse application/json */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** connecting to the database */
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
});
mongoose.connection.on('connected', (client) => {
    console.log('Connected to database');
});
mongoose.connection.on('error', (err) => {
    throw new Error('Unable to connect to database.');
});

/** for handling routes */
app.use(tripRoute);
app.use(jwtRoute);

/** error Handling: Standart Error Object */
var oStaErr = {
    "success": false,
    "message": []
};

app.use((req, res, next) => {
    oStaErr.errors = [`Only handles defined path`];
    res.status(404).json(oStaErr);
});

app.use(function (err, req, res, next) {
    /* distinguish Errors from ValidationErrors */
    if (err instanceof expressValidation.ValidationError) {
        var oValErr = JSON.parse(err);
        oStaErr.errors = err.errors;
    } else {
        oStaErr.errors = [err.message];
    }
    res.status(err.status || 400).json(oStaErr);
});

/** listen for requests */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

module.exports = app;
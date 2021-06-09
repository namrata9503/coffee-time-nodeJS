var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var jsonPrices = require('./data/prices.json');
var jsonOrders = require('./data/orders.json');
var jsonPayments = require('./data/payments.json');

var _und = require('underscore');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
    res.json(jsonPrices);
});

var coffeePrices = require('./services/coffee-prices');

/**
 * Load controllers.
 */

var API = require('./controllers/api');

/**
 * Application routes.
 */

app.use('/api/prices', API.getPrices);
app.use('/api/orders', API.getOrders);
app.get('/api/userdetails?:user', API.userDetails);
app.get('/api/users', API.getUsers);

app.listen(port);
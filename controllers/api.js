var _ = require('lodash');
var validator = require('validator');
var path = require('path');

var userOrders = require('../services/user-order');
var userDetails = require('../services/user-details');
var coffeePrices = require('../services/coffee-prices');


const fs = require('fs');

exports.getPrices = function(req, res) {

    res.status(200).json(coffeePrices.getCoffeePrices());
};

exports.getOrders = function(req, res) {

    var orders_data = userOrders.getAllOrders();
    res.status(200).json(orders_data);
};

exports.getPayments = function(req, res) {
    var payment_data = _.uniq(
        _.flatten(payments.map((element) => ({ user: element.user, amount: element.amount })))
    );
    res.status(200).json(payment_data);
};

exports.userDetails = function(req, res) {
    const { user } = req.query;
    var details = userDetails.getUserDetails(user);
    res.status(200).json(details);

}
exports.getUsers = function(req, res) {
    var users = userDetails.getUniqueUser();
    res.status(200).json(users);
};
var _ = require('lodash');

var paymentData = require('../data/payments');

var usersOrders = require('../services/user-order');
var coffeePrices = require('../services/coffee-prices');

var underscore = '_';

exports.getUserDetails = function(user) {
    var totalPayedAmount = 0;

    // get users payment
    const usersPayment = paymentData.filter((element) => element.user === user);
    usersPayment.forEach((element) => {
        totalPayedAmount += element.amount;
    });

    // get users orders
    var userOrders = usersOrders.getUserOrders(user);

    // get all prices
    var coffeeCustomPrices = coffeePrices.mapCoffeePrices();

    // get cost of all ordres
    var costOfAllOrders = this.calculateOrderCost(userOrders, coffeeCustomPrices);

    // debt
    var owed = costOfAllOrders - totalPayedAmount;
    var creditScore = owed > 0 ? 10 : (owed / costOfAllOrders * -100).toFixed(2)

    var details = { 'user': user, 'totalPayedAmount': totalPayedAmount, 'costOfAllOrders': costOfAllOrders, 'owed': owed, 'creditSafeScore': creditScore, 'orders': userOrders };

    return details;
};

exports.calculateOrderCost = function(userOrders, coffeeCustomPrices) {
    var costOfAllOrders = 0;
    userOrders.forEach((element) => {
        var drinkName = element.drink.replace(/\s/g, '') + underscore + element.size;
        var currentOrderCost = coffeeCustomPrices.has(drinkName) ? coffeeCustomPrices.get(drinkName) : 0;
        costOfAllOrders += currentOrderCost;
    });

    return costOfAllOrders;
};

exports.getUniqueUser = function() {

    const unique_users = [...new Set(paymentData.map(item => item.user))];
    return unique_users;
}
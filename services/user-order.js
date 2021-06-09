var _ = require('lodash');
var ordersData = require('../data/orders');


exports.getAllOrders = function() {

    var orders_data = _.uniq(_.flatten(ordersData.map((element) => ({ user: element.user, drink: element.drink, size: element.size }))));
    return orders_data;
};

exports.getUserOrders = function(user) {

    var user_order = this.getAllOrders().filter((element) => element.user === user);
    return user_order;
};
var _ = require('lodash');
var pricesData = require('../data/prices');
var underscore = '_';

exports.getCoffeePrices = function() {

    var coffePrices = _.uniq(
        _.flatten(pricesData.map((element) => ({ drink_name: element.drink_name, prices: element.prices })))
    );
    return coffePrices;
};

exports.mapCoffeePrices = function() {

    var segregatedPrices = new Map();
    var coffePrices = this.getCoffeePrices();

    coffePrices.forEach(element => {

        var size = element.prices;

        var drinkName = element.drink_name.replace(/\s/g, "");

        Object.entries(size).forEach(function(item) {
            Object.keys(item).forEach(function(key) {

                var customName = drinkName + underscore + item[0];
                var price = item[1];
                segregatedPrices.set(customName, price)
            });
        });

    });
    return segregatedPrices;
};
"use strict";

var nanites = nanites || {};

nanites.fighter = function(spec){
    var that = {};

    var physics = spec.physics;

    that.updateUnit = function() {
        physics.accelerate(Physics.vector(1, 1));
    };

    return that;
};
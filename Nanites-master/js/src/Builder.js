"use strict";

var nanites = nanites || {};

nanites.builder = function(spec) {
    var that = {};

    var unitFactory = spec.builderFactory;
    var body = spec.body;
    var offsets = spec.offsets;
    var world = spec.world;
    var worldBounds = spec.worldBounds;
    var ticksBetweenSpawns = 50;
    var ticksUntilNextSpawn = ticksBetweenSpawns;

    function isRoomForNewUnit(newPosition) {
        var radius = 30;
        var isSpotOccupied =
                world.findOne({$at: newPosition}) ||
                world.findOne({$at: Physics.vector(0, radius).vadd(newPosition)}) ||
                world.findOne({$at: Physics.vector(0, -radius).vadd(newPosition)}) ||
                world.findOne({$at: Physics.vector(radius, 0).vadd(newPosition)}) ||
                world.findOne({$at: Physics.vector(-radius, 0).vadd(newPosition)});

        var fitsInsideWorld = Physics.aabb.contains(worldBounds, Physics.body("circle", {
            x: newPosition.x,
            y: newPosition.y,
            radius: radius
        }).aabb());

        return !isSpotOccupied && fitsInsideWorld;
    }

    that.updateUnit = function(){
        if (ticksUntilNextSpawn-- < 0){
            var index = nanites.random(0, offsets.length - 1)
            var offset = offsets[index];
            var newPosition = body.state.pos.clone();
            newPosition.vadd(offset);
            if (isRoomForNewUnit(newPosition)){
                unitFactory.createUnit(newPosition);
            }
            ticksUntilNextSpawn = ticksBetweenSpawns;
        }
    };

    return that;
};
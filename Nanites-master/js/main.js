"use strict";

var nanites = nanites || {};


nanites.random = function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

Physics({
        timestep: 1000.0 / 160
},
    function(world){

    var viewWidth = 900;
    var viewHeight = 600;

    var renderer = Physics.renderer('canvas', {
        el: "playfield",
        width: viewWidth,
        height: viewHeight,
        meta: false,
        styles: {
            'circle' : {
                strokeStyle: 'black',
                lineWidth: 1,
                fillStyle: 'blue',
                angleIndicator: 'blue'
            }
        }
    });

    world.add( renderer );

    world.on('step', function(){
        world.render();
    });

    var worldBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    world.add(Physics.behavior('edge-collision-detection', {
        aabb: worldBounds
    }));

    var units = [];
    var unitFactory = nanites.builderFactory({world: world, units: units, worldBounds: worldBounds});
    units.push(unitFactory.createUnit(Physics.vector(350, 350)));

    world.add( Physics.behavior('body-impulse-response') );
    world.add( Physics.behavior('body-collision-detection') );
    world.add( Physics.behavior('sweep-prune') );

        Physics.util.ticker.on(function( time, dt ){
        units.forEach(function(unit){
            unit.updateUnit();
        });
        document.getElementById("units").innerHTML = units.length.toString();
        world.step( time );
    });

    Physics.util.ticker.start();

});
"use strict";

var nanites = nanites || {};

describe("A builderFactory", function () {
    var builder;
    var physicsBody;
    var circle;
    var position;
    var world;

    var builderFactory;

    beforeEach(function() {
        builder = nanites.builder;
        nanites.builder = jasmine.createSpy('builder', nanites.builder);

        circle = {name: 'circle'};
        physicsBody = Physics.body;
        Physics.body = jasmine.createSpy('body', Physics.body).and.returnValue(circle);

        world = jasmine.createSpyObj('world', ['add']);

        position = Physics.vector(1, 2);

        builderFactory = nanites.builderFactory({world: world});
    });

    afterEach(function() {
        nanites.builder = builder;
        Physics.body = physicsBody;
    });

    it("should create builder at create position", function () {
        builderFactory.createUnit(position);

        expect(nanites.builder).toHaveBeenCalledWith(position);
    });

    it("should add a new circle body to the world at position", function () {
        builderFactory.createUnit(position);

        expect(Physics.body).toHaveBeenCalledWith("circle", {x: position.x, y: position.y, vx: 0, vy: 0, radius: 20})
        expect(world.add).toHaveBeenCalledWith(circle);
    });

});
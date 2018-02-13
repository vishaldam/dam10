"use strict";

var nanites = nanites || {};

describe("A builder", function () {
    it("should create a new unit in offset position", function () {
        var builderFactory = jasmine.createSpyObj('builderFactory', ['create'])
        var spec = {
            position: Physics.vector(0, 0),
            offsets: [Physics.vector(0, -10)],
            builderFactory: builderFactory
        };
        var builder = nanites.builder(spec);

        builder.updateUnit();

        expect(builderFactory.createUnit).toHaveBeenCalledWith({position: Physics.vector(0, -10)});
    });
});
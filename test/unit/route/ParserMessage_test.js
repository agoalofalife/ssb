const ParserMessage = require('./../../../route/ParserMessage');
const faker = require('faker');
const chai = require('chai');
const assert = require('assert');

class FakeMessageRouteTrue{
    static route(response, bool){
        return true;
    }
}
class FakeMessageRouteFalse{
    static route(response, bool){
        return false;
    }
}
const schemaWithoutRoutes = [
    {
        class:FakeMessageRouteTrue,
        routes:[],
    },
];
const schemaValidWithRoutes = [
    {
        class:FakeMessageRouteFalse,
        routes:[
            {
                class:FakeMessageRouteTrue,
                routes:[],
            },
        ],
    },
];
const responseSlack = {};

describe('ParserMessage', () => {
    describe('check parameters in constructor', () => {
        it('expected exception if first argument not array ', function () {
                chai.expect(() => {new ParserMessage(faker.random.word())}).to.throw('Expected first argument is array type!')
        });
        it('if property routes is empty, we call static route', function () {
            let parser = new ParserMessage(schemaWithoutRoutes);
            chai.expect(parser.run()).to.be.an.instanceof(FakeMessageRouteTrue);
        });
        it('if in schema exist routes, then we call route again', function () {
            let parser = new ParserMessage(schemaValidWithRoutes);
            chai.expect(parser.run()).to.be.an.instanceof(FakeMessageRouteTrue);
        });
    })
});
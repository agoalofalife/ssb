const ParserMessage = require('../../../src/route/ParserMessage');
const faker = require('faker');
const chai = require('chai');
const assert = require('assert');

class FakeMessageRouteTrue{
    static route(response, bool){
        return true;
    }
}
class FakeMessageRouteTrue2{
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
const schemaMultiValid = [
    {
        class:FakeMessageRouteFalse,
        routes:[
            {
                class:FakeMessageRouteTrue,
                routes:[],
            },
        ],
    },
    {
        class:FakeMessageRouteTrue,
        routes:[
            {
                class:FakeMessageRouteTrue,
                routes:[],
            },
        ],
    },
];
const schemaValidOnlyBaseMessage = [
    {
        class:FakeMessageRouteFalse,
        routes:[
            {
                class:FakeMessageRouteFalse,
                routes:[],
            },
        ],
    },
    {
        class:FakeMessageRouteTrue2,
        routes:[
            {
                class:FakeMessageRouteFalse,
                routes:[],
            },
        ],
    },
];
const responseSlack = {};

describe('ParserMessage', () => {
    describe('check parameters in constructor', () => {
        it('expected exception if first argument not array ', () => {
                chai.expect(() => {new ParserMessage(faker.random.word())}).to.throw('Expected first argument is array type!')
        });
        it('if class return true and routes length 0, then get instance class', async () => {
                let parser = new ParserMessage(schemaWithoutRoutes);
                chai.expect(await parser.run()).to.be.an.instanceof(FakeMessageRouteTrue);
        });
        it('if in schema exist routes, then we call route again', async () => {
            let parser = new ParserMessage(schemaMultiValid);
            chai.expect(await parser.run()).to.be.an.instanceof(FakeMessageRouteTrue);
        });
        it('if in scheme not valid rotues, expected undefined', async () => {
            let parser = new ParserMessage(schemaValidWithRoutes);
            assert.equal(await parser.run(), undefined)
        });
        it('if a match with the base type but no match with subtypes', async () => {
            let parser = new ParserMessage(schemaValidOnlyBaseMessage);
            chai.expect(await parser.run()).to.be.an.instanceof(FakeMessageRouteTrue2);
        });
    })
});
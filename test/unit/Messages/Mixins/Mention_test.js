const assert = require('assert');
const MixinMention = require('../../../../Messages/Mixins/Mention');
const mixin = require('../../../../helper').mixin;
const faker = require('faker');

let botId = faker.random.uuid();

let SlackBotFake = {
    getBotId: () => {
        return new Promise((resolve, reject) => {
                resolve(botId);
        });
    },
};

let classFakeMixinMention = mixin(MixinMention.prototype, ['constructor'])(class ChannelMessage {
    constructor(){
        this.base = SlackBotFake;
        this.response = {
            text:`<@${botId}>`
        }
    }
});

let mixinFake = new classFakeMixinMention();

describe('Mention', function() {
    describe('#patternMention', function() {
        it('expected regexp', async function() {
            let regexp = await mixinFake.patternMention();
            assert.equal(`<@${botId}>`, regexp);
        });
    });
    describe('#isMention', function() {
        it('expected regexp', async function() {
            let isMention = await mixinFake.isMention();
            assert.equal(isMention, true);
        });
    });
});
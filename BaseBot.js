const SlackBot = require('slackbots');
const Route = require('./Controllers/routes');

module.exports = class BaseBot extends SlackBot{
    /**
     *
     * @param params
     */
    constructor(params) {
        super(params);
        this.on('message', this.managerTypeMessages);

        // define property...
    }

    /**
     * return id bot
     * @return
     */
     async botId() {
        let user = await this.getUser(this.name);
        return user.id;
    }
    /**
     *
     * @param message object
     */
    async managerTypeMessages(message){
        let classMessage = Route(message, this);

        if(classMessage && classMessage !== null) {
            this.emit(classMessage.typeEvent, classMessage);
        }
    }

    conversation(){
        // this._api('conversation.create')
    }

    /**
     * Return list emoji list
     * @return {Promise<*>}
     */
     async emojiList(){
         return await this._api('emoji.list');
     }
};



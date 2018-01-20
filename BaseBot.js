require('dotenv').config();

const SlackBot = require('slackbots');
const {router} = require('./route/routes');
const RouteClass = require('./route/Route');
const Server = require('./Server/Server');
const Conversation = require('./Messages/Conversation');
const Command = require('./Messages/Command');
const _ = require('lodash');
const Cache = require('./Cache/Cache');
const BufferDriverCache = require('./Cache/Drivers/BufferDriverCache');

module.exports = class BaseBot extends SlackBot {
    /**
     *
     * @param params
     */
     constructor(params) {
        super(params);
        this.on('message', this.managerTypeMessages);

        // define property...
        this.botId = null;
        this.Route = new RouteClass();

        // server processes run listen..
        this.listenConversation(Server);
        this.listenCommands(Server);
    }

    /**
     * Get group by id which is private channel
     * @param {string} id
     * @returns {object}
     */
    async getGroupPrivateChannelById(id) {
        if (id === undefined) return id;
        let data = await this.getGroups();
        return _.find(data.groups, {id: id, is_mpim: false})
    }

    /**
     * Get group by id which is multi direct
     * @param {string} id
     * @returns {object}
     */
    async getGroupMultiDirectById(id) {
        if (id === undefined) return id;
        let data = await this.getGroups();
        return _.find(data.groups, {id: id, is_mpim: true})
    }

    /**
     * return id bot
     * @return
     */
    async getBotId() {
        return async function () {
            if (this.botId !== null) {
                return this.botId;
            } else {
                try {
                    let user = await this.getUser(this.name);
                    this.botId = user.id;
                    return user.id;
                } catch (err) {
                    console.log('Error name slack bot!'.error);
                    console.log('Check environment variable SLACK_BOT_NAME'.error);
                }
            }
        }.bind(this)();
    }

    /**
     *
     * @param message object
     */
    async managerTypeMessages(message) {
        // let classMessage = await (new Cache).route(message, (new BufferDriverCache), router, message, this);
        let classMessage = await router(message, this);
        // if route found
        if (classMessage && classMessage !== null) {

            let fnRoute = this.Route.route(classMessage, this);
            let fnRouteMention = await this.Route.routeMention(classMessage, this);

            this.emit(classMessage.typeEvent, fnRoute, fnRouteMention);
        }
    }

    /**
     * @link https://api.slack.com/internal-integrations
     */
    listenConversation(Server) {
        Server.instance.app.post('/conversation', (req, res) => {
            // todo hmmm...if key which 'payload' will changed ??
            let conversation = new Conversation(JSON.parse(req.body.payload), this);
            // todo most likely rewrite in each message interface
            if (conversation.verify() === false){
                return res.status(401);
            }
            let fnRoute = this.Route.route(conversation, this);

            this.emit(conversation.typeEvent, fnRoute, res);
        });
    }

    /**
     * @link https://api.slack.com/slash-commands
     */
    listenCommands(Server) {
        Server.instance.app.post('/commands', (req, res) => {
            let command = new Command(req.body, this);
            if (command.verify() === false){
                return res.status(401);
            }
            let fnRoute = this.Route.route(command, this);
            this.emit(command.typeEvent, fnRoute, res);
        });
    }
};
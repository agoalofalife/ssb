#!/usr/bin/env node
require('dotenv').config();
require('../setting/color');
require('console.table');

const util = require('util');
const program = require('commander');
const { version } = require('../helper');
const glob = require('glob');
const path = require('path');
const Server = require('../Server/Server');
const urlAuth = 'https://slack.com/api/oauth.access';
const axios = require('axios');
// TODO Create cli application for  the entire process of obtaining a token

program
    .version(version)
    .description('Work with server')
    .command('server')
    .option('-s, --start', 'Start server in waiting for redirect url')
    .action(function (options) {
        if (options.start) {
            Server.instance.app.get('/', (req, res) => {
                axios.get(urlAuth, {
                    params:{
                        client_id: process.env.SLACK_CLIENT_ID,
                        client_secret: process.env.SLACK_CLIENT_SECRET,
                        code: req.query.code,
                    }
                })
                .then(function (response) {
                    console.log(response.data, 'authorize');
                })
                .catch(function (error) {
                    console.log(error);
                });
            });
        }
    });

    program.command('show <what>')
    .description('Show information')
    .action(async function (what) {
        switch (what) {
            case 'events':
                let out = [];
                    let globPromise = util.promisify(glob);

                    let files = await globPromise(`${__dirname}/../Messages/**/*.js`, {
                        ignore: [path.resolve(`${__dirname}/../Messages/Mixins/*.js`), path.resolve(`${__dirname}/../Messages/MessageBase/Message.js`)]
                    });
                    files.forEach((file) => {
                        let truePath = path.resolve(process.cwd(), file);
                        let classMessage = require(truePath);
                        let objectMessage = (new classMessage);
                        let events = objectMessage.typeEvent;
                        let description = objectMessage.descriptionEvent;

                        out.push({
                            event:events.verbose,
                            description:description.verbose,
                        });
                    });
                return console.table('List events', out);
            default:
            return console.log('Not found something to show...'.warn)
        }
    });

program.parse(process.argv);

if (!program.args.length) program.help();
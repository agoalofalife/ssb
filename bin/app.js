#!/usr/bin/env node
require('dotenv').config();
require('../src/setting/color');
require('console.table');

const copy = require('fs-copy-file');
const program = require('commander');
const { version } = require('../src/helper');
const path = require('path');
const Server = require('../src/Server/Server');
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

program
    .version(version)
    .description('To create something')
    .command('create <what>')
    .action(function (what) {
        switch (what) {
            case 'env':
            return copy(path.resolve(`${__dirname}/../.env.example`), path.resolve(`${__dirname}/../.env`), (err) => {
                if (err) throw err;
                console.log('Success create .env file'.info);
            });
            default:
                return console.log('Not found something to create...'.warn)
        }
    });



program.command('show <what>')
    .description('Show information')
    .action(async function (what) {
        switch (what) {
            case 'events':
                let base = [];
                let sub = [];
                let listAccessRoutes = require('../src/route/schema');
                listAccessRoutes.forEach(route => {
                    let baseRoute = (new route.class);
                    base.push({
                            event:baseRoute.typeEvent.verbose,
                            description:baseRoute.descriptionEvent.verbose,
                        });
                    if (Array.isArray(route.routes) && route.routes.length > 0) {
                        sub.push({
                            event:'----------------------------------------------------------------'.input,
                            description:'----------------------------------------------------------------'.input,
                        });
                        route.routes.forEach(subRoute => {
                            let subRouteObject = (new subRoute.class(null, null, baseRoute));
                            sub.push({
                                event:subRouteObject.typeEvent.verbose,
                                description:subRouteObject.descriptionEvent.verbose,
                            });
                        });
                    }
                });
                base = base.concat(sub);
                return console.table('List events', base);
            default:
            return console.log('Not found something to show...'.warn)
        }
    });

program.parse(process.argv);

if (!program.args.length) program.help();
#!/usr/bin/env node
require('dotenv').config();

const program = require('commander');
const { version } = require('../helper');
const Server = require('../Server/Server').app;
const urlAuth = 'https://slack.com/api/oauth.access';
const axios = require('axios');
// TODO Create cli application for  the entire process of obtaining a token

program
    .version(version)
    .description('Console application')
    .command('server')
    .option('-s, --start', 'Start server in waiting for redirect url')
    .action(function (dir, cmd) {
        Server.get('/', (req, res) => {
            axios.get(urlAuth, {
                params:{
                    client_id:  process.env.SLACK_CLIENT_ID,
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
    });

program.parse(process.argv);

if (!program.args.length) program.help();
#!/usr/bin/env node
const program = require('commander');
const { version } = require('../helper');

program
    .version(version)
    .description('Console application')
    .option('-f, --foo', 'enable some foo')
    .option('-b, --bar', 'enable some bar')
    .option('-B, --baz', 'enable some baz')
    .parse(process.argv);

if (!program.args.length) program.help();
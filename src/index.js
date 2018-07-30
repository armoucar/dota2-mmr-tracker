#!/usr/bin/env node

const inquirer = require('inquirer');

const path = require('path')
const fs = require('fs-extra')
const STORAGE_PATH = path.join(__dirname, '..', 'data', 'storage.json')

if (!fs.existsSync(STORAGE_PATH)) {
    fs.ensureDirSync(path.join(__dirname, '..', 'data'));
    fs.writeJsonSync(STORAGE_PATH, { solo: [], party: []});
}

console.log('-- MMR Tracker --');

var questions = [
    {
        type: 'list',
        name: 'mode',
        message: 'Choose an option:',
        choices: ['Output', 'Input'],
        filter: value => value.toLowerCase()
    }
];

const modules = {
    input: require('./input'),
    output: require('./output')
}

inquirer.prompt(questions).then(answers => {
    modules[answers.mode]();
});
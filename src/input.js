const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')

const STORAGE_PATH = path.join(__dirname, '..', 'data', 'storage.json')
const data = fs.readJsonSync(STORAGE_PATH)
const output = require('./output')

var questions = [
    {
        type: 'list',
        name: 'type',
        message: 'What kind of match was played?',
        choices: ['Solo', 'Party'],
        filter: value => value.toLowerCase()
    },

    {
        type: 'input',
        name: 'mmr',
        message: 'What\'s your MMR now?',
        validate: value => !isNaN(parseInt(value)) || 'Please enter a number',
        filter: Number
    },

    {
        type: 'input',
        name: 'match_id',
        message: 'What\'s the last Match ID?',
        validate: value => !isNaN(parseInt(value)) || 'Please enter a number',
        filter: Number
    }
]

function start() {
    inquirer.prompt(questions).then(answers => {
        const matchDate = new Date()
        matchDate.setHours(matchDate.getHours() - 3);

        data[answers.type].push({
            mmr: answers.mmr,
            match_id: answers.match_id,
            ts: matchDate.toISOString()
        })

        fs.writeJsonSync(STORAGE_PATH, data)

        output({ type: answers.type })
    })
}

module.exports = start
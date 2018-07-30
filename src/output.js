const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

const STORAGE_PATH = path.join(__dirname, '..', 'data', 'storage.json')

var Table = require('easy-table')
Table.prototype.separator = ' | '

const diffFn = value => Table.padLeft(value < 0 ? chalk.red(value) : chalk.blue(value), 4)

var t = new Table()
t.total('Diff', { printer: diffFn })

const MATCHES_COUNTER = 10

var questions = [
    {
        type: 'list',
        name: 'type',
        message: 'What kind of match?',
        choices: ['Solo', 'Party'],
        filter: value => value.toLowerCase()
    },
]

function start(answers) {
    answers ?

        printData(answers) :

        inquirer
            .prompt(questions)
            .then(printData)
}

function printData(answers) {
    const data = fs.readJsonSync(STORAGE_PATH)

    let lastMedalRef

    data[answers.type].forEach(function (match, index, arr) {
        const diff = index > 0 ? (arr[index].mmr - arr[index - 1].mmr) : 0
        match.diff = diff
        match.ts = match.ts.substring(0, 16).replace(/t/gi, ' ')

        t.cell('ID', index + 1)
        t.cell('Match ID', match.match_id, Table.number())
        t.cell('Date', match.ts)
        t.cell('MMR', match.mmr, Table.number())
        t.cell('Diff', match.diff, diffFn)

        if (match.up_medal) {
            let mmrMedalDiff = '',
                matchesNeededToUp

            if (lastMedalRef) {
                matchesNeededToUp = index - arr.indexOf(lastMedalRef)
                mmrMedalDiff =` * - ${match.mmr - lastMedalRef.mmr} in ${matchesNeededToUp} matches`
            }

            t.cell('Medal', chalk.bold(mmrMedalDiff.length ? mmrMedalDiff : ' *'))
            lastMedalRef = match
        } else {
            t.cell('Medal', ' -')
        }

        t.newRow()
    })

    console.log(t.toString())
}

module.exports = start
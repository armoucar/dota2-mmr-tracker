const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

const STORAGE_PATH = path.join(__dirname, '..', 'data', 'storage.json')
const data = fs.readJsonSync(STORAGE_PATH)

var Table = require('easy-table')
Table.prototype.separator = ' | '

const diffFn = value => Table.padLeft(value < 0 ? chalk.red(value) : chalk.blue(value), 4)

var t = new Table()
t.total('Diff', { printer: diffFn })

const MATCHES_COUNTER = 10

data.solo.forEach(function (match, index, arr) {
    const diff = index > 0 ? (arr[index].mmr - arr[index - 1].mmr) : 0
    match.diff = diff
    match.ts = match.ts.substring(0, 16).replace(/t/gi, ' ')

    t.cell('ID', index + 1)
    t.cell('Date', match.ts)
    t.cell('MMR', match.mmr, Table.number())
    t.cell('Diff', match.diff, diffFn)

    t.newRow()
})

function start() {
    t.rows = t.rows.slice(-1 * MATCHES_COUNTER)
    console.log(t.toString())
}

module.exports = start
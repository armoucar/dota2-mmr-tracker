const fs = require('fs-extra')
const path = require('path')
const STORAGE_PATH = path.join(__dirname, '..', 'data', 'storage.json')
const data = fs.readJsonSync(STORAGE_PATH);

['solo', 'party'].forEach(function(type) {
    console.log(`---- ${type} ----`);

    // data[type].forEach(function (match, index, arr) {
    // });
})

// fs.writeJsonSync(STORAGE_PATH, data)
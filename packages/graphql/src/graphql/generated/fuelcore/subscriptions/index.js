const fs = require('fs');
const path = require('path');

module.exports.statusChange = fs.readFileSync(path.join(__dirname, 'statusChange.graphql'), 'utf8');
module.exports.submitAndAwait = fs.readFileSync(path.join(__dirname, 'submitAndAwait.graphql'), 'utf8');

const fs = require('fs');
const path = require('path');

module.exports.continueTx = fs.readFileSync(
  path.join(__dirname, 'continueTx.graphql'),
  'utf8',
);
module.exports.dryRun = fs.readFileSync(
  path.join(__dirname, 'dryRun.graphql'),
  'utf8',
);
module.exports.endSession = fs.readFileSync(
  path.join(__dirname, 'endSession.graphql'),
  'utf8',
);
module.exports.execute = fs.readFileSync(
  path.join(__dirname, 'execute.graphql'),
  'utf8',
);
module.exports.produceBlocks = fs.readFileSync(
  path.join(__dirname, 'produceBlocks.graphql'),
  'utf8',
);
module.exports.reset = fs.readFileSync(
  path.join(__dirname, 'reset.graphql'),
  'utf8',
);
module.exports.setBreakpoint = fs.readFileSync(
  path.join(__dirname, 'setBreakpoint.graphql'),
  'utf8',
);
module.exports.setSingleStepping = fs.readFileSync(
  path.join(__dirname, 'setSingleStepping.graphql'),
  'utf8',
);
module.exports.startSession = fs.readFileSync(
  path.join(__dirname, 'startSession.graphql'),
  'utf8',
);
module.exports.startTx = fs.readFileSync(
  path.join(__dirname, 'startTx.graphql'),
  'utf8',
);
module.exports.submit = fs.readFileSync(
  path.join(__dirname, 'submit.graphql'),
  'utf8',
);

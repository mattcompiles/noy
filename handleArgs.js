const { parseCommand, convertCommand } = require('./utils');
const { YARN, NPM } = require('./commands');

module.exports = (useYarn, args) => {
  const command = parseCommand(args);

  const type = useYarn ? YARN : NPM;

  return [type, convertCommand(type, command)];
};

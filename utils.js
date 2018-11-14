const partition = require('lodash.partition');
const isEqual = require('lodash.isequal');

const { commands, YARN, NPM } = require('./commands');

const parseCommand = args => {
  const [switches, rest] = partition(args, arg => {
    return arg.startsWith('-');
  });

  const [script, target] = rest;

  return {
    script,
    target,
    switches
  };
};

const renderCommand = ({ script, switches = [], target }) => [
  script,
  ...switches,
  ...(target ? [target] : [])
];

const normalizeCommand = ({ script, target, switches }) => ({
  script: script ? script : false,
  target: Boolean(target),
  switches
});

const convertCommand = (projectType, command) => {
  const normalizedCommand = normalizeCommand(command);

  const match = commands.find(c =>
    isEqual(normalizeCommand(c), normalizedCommand)
  );

  if (match && match.type !== projectType) {
    return renderCommand(match.convert(command));
  }

  return renderCommand(command);
};

module.exports = {
  parseCommand,
  convertCommand,
  NPM,
  YARN
};

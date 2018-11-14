const { NPM, YARN } = require('./commands');
const handleArgs = require('./handleArgs');

const expectedConversions = [
  {
    command: 'npm install my-dep',
    expected: 'yarn add my-dep'
  },
  {
    command: 'npm install --save-dev my-dep',
    expected: 'yarn add --dev my-dep'
  },
  {
    command: 'npm install -D my-dep',
    expected: 'yarn add --dev my-dep'
  },
  {
    command: 'npm install --save-optional my-dep',
    expected: 'yarn add --optional my-dep'
  },
  {
    command: 'yarn add my-dep',
    expected: 'npm install my-dep'
  },
  {
    command: 'yarn add -D my-dep',
    expected: 'npm install --save-dev my-dep'
  },
  {
    command: 'yarn add --dev my-dep',
    expected: 'npm install --save-dev my-dep'
  },
  {
    command: 'yarn add --dev my-dep',
    expected: 'npm install --save-dev my-dep'
  },
  {
    command: 'yarn',
    expected: 'npm install'
  }
].map(({ command, expected }) => {
  const [projectType, ...c] = command.split(' ');
  const [expectedType, ...ec] = expected.split(' ');
  return {
    name: command,
    useYarn: projectType === NPM,
    command: c,
    expected: [expectedType, ec]
  };
});

expectedConversions.forEach(({ name, useYarn, command, expected }) =>
  test(`should convert ${name}`, () => {
    expect(handleArgs(useYarn, command)).toEqual(expected);
  })
);

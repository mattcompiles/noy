const NPM = 'npm';
const YARN = 'yarn';

const createCommandAliases = (type, convert, commands) =>
  commands.map(command => ({
    ...command,
    type,
    convert
  }));

const commands = [
  ...createCommandAliases(NPM, ({ target }) => ({ script: 'add', target }), [
    { script: 'install', switches: [], target: true },
    { script: 'install', switches: ['-S'], target: true },
    { script: 'install', switches: ['--save'], target: true },
    { script: 'install', switches: ['-P'], target: true },
    { script: 'install', switches: ['--save-prod'], target: true }
  ]),
  ...createCommandAliases(
    NPM,
    ({ target }) => ({ script: 'add', switches: ['--dev'], target }),
    [
      { script: 'install', switches: ['-D'], target: true },
      { script: 'install', switches: ['--save-dev'], target: true }
    ]
  ),
  ...createCommandAliases(
    NPM,
    ({ target }) => ({ script: 'add', switches: ['--optional'], target }),
    [
      { script: 'install', switches: ['-O'], target: true },
      { script: 'install', switches: ['--save-optional'], target: true }
    ]
  ),
  ...createCommandAliases(
    NPM,
    ({ target }) => ({ script: 'add', switches: ['--exact'], target }),
    [
      { script: 'install', switches: ['-E'], target: true },
      { script: 'install', switches: ['--save-exact'], target: true }
    ]
  ),
  {
    script: false,
    switches: [],
    target: false,
    type: YARN,
    convert: () => ({ script: 'install' })
  },
  {
    script: 'add',
    switches: [],
    target: true,
    type: YARN,
    convert: ({ target }) => ({
      script: 'install',
      target
    })
  },
  ...createCommandAliases(
    YARN,
    ({ target }) => ({ script: 'install', switches: ['--save-dev'], target }),
    [
      { script: 'add', switches: ['-D'], target: true },
      { script: 'add', switches: ['--dev'], target: true }
    ]
  ),
  ...createCommandAliases(
    YARN,
    ({ target }) => ({
      script: 'install',
      switches: ['--save-optional'],
      target
    }),
    [
      { script: 'add', switches: ['-O'], target: true },
      { script: 'add', switches: ['--optional'], target: true }
    ]
  ),
  ...createCommandAliases(
    YARN,
    ({ target }) => ({
      script: 'install',
      switches: ['--save-exact'],
      target
    }),
    [
      { script: 'add', switches: ['-E'], target: true },
      { script: 'add', switches: ['--exact'], target: true }
    ]
  )
];

module.exports = {
  YARN,
  NPM,
  commands
};

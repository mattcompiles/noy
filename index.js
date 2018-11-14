#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const execa = require('execa');
const findRoot = require('find-root');

const handleArgs = require('./handleArgs');

const readFile = promisify(fs.readFile);
const fileExists = file =>
  new Promise(resolve => {
    fs.access(file, fs.constants.F_OK, err => {
      resolve(Boolean(!err));
    });
  });

const isInstalled = async bin => {
  const { failed } = execa('which', [bin], { reject: false });
  return !failed;
};

const isYarnProject = async packageRoot => {
  const packageJson = JSON.parse(
    await readFile(path.join(packageRoot, 'package.json'))
  );

  if (packageJson.engines && packageJson.engines.yarn) {
    return true;
  }

  return await fileExists(path.join(packageRoot, 'yarn.lock'));
};

(async () => {
  try {
    const haveYarn = await isInstalled('yarn');
    const haveNpm = await isInstalled('npm');

    const packageRoot = findRoot(process.cwd());
    const useYarn = await isYarnProject(packageRoot);

    if (useYarn && !haveYarn) {
      console.log('Yarn project detected but yarn is not installed');
      process.exit(1);
    } else if (!useYarn && !haveNpm) {
      console.log('NPM project detected but NPM is not installed');
      process.exit(1);
    }

    const [, , ...forwardArgs] = process.argv;

    execa(...handleArgs(useYarn, forwardArgs), { stdio: 'inherit' });
  } catch (e) {
    console.log(e);

    process.exit(1);
  }
})();

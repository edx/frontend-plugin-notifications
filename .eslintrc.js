const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('eslint');

// Add to list of files that can import devDependencies
const rule = config.rules['import/no-extraneous-dependencies'];
if (Array.isArray(rule) && rule[1]?.devDependencies) {
  const additionalDevDependencies = [
    '**/test-utils.js',
    '.eslintrc.js',
  ];
  rule[1].devDependencies = [...rule[1].devDependencies, ...additionalDevDependencies];
}

module.exports = config;

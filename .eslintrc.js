// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@openedx/frontend-build');

module.exports = createConfig(
  'eslint',
  {
    rules: {
      'react-hooks/exhaustive-deps': 'off',
    },
  },
);

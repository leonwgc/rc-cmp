module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
    amd: true
  },
  globals: {},
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'react/prop-types': 0,
    'no-unused-vars': 1,
    'react/jsx-no-target-blank': [0],
    'react/no-unknown-property': [0],
    'react/no-string-refs': [1],
    'react/display-name': 0,
    'no-useless-escape': [1],
    'react/no-find-dom-node': [1],
    'no-console': [1],
    'no-empty': [1]
  }
};

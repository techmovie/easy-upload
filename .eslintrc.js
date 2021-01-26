module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
    greasemonkey: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    $j: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-use-before-define': 0,
    semi: ['error', 'always']
  }
};

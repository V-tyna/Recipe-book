module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    indent: ['error', 2],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-debugger': 1,
    'class-methods-use-this': 0,
    'comma-dangle': 0,
    'dot-notation': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'keyword-spacing': 0,
    'no-empty-function': 0,
    'no-useless-constructor': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 0,
    'object-curly-newline': 0
  }
};

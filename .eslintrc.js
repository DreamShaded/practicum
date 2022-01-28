module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    'import',
    '@typescript-eslint',
  ],
  ignorePatterns: ['/dist/*', '.eslintrc.js', 'svgo.config.js'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }]
  },
};

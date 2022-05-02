module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['prettier', 'plugin:vue/essential', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'comma-dangle': ['error', 'only-multiline'],
    'func-names': ['error', 'never'],
    'no-param-reassign': ['error', { props: false }],
  },
};

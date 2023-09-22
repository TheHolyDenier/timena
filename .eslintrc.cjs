module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    "es2022": true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
  plugins: [],
  rules: {
    "require-await": "off",
    "no-console": ["error", { allow: ["info", "error"] }]
  },
};

module.exports = {
  extends: 'airbnb-base',
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }]
  }
};

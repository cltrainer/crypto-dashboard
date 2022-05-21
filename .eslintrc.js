const prettierrc = require('rc')('./prettier')

module.exports = {
  extends: ['react-app', 'react-app/jest'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'prettier/prettier': ['error', prettierrc]
    // 'prettier/prettier': ['error', { ...prettierrc, endOfLine: 'auto' }]
  }
}

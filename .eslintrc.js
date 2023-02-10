const path = require('path');

module.exports = {
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json') // The path to your tsconfig.json
    },
    plugins: ['@euberdeveloper'],
    extends: [
        'plugin:@euberdeveloper/typescript',
        'plugin:@euberdeveloper/prettier',
        'plugin:@euberdeveloper/unicorn'
    ],
    rules: {
        '@typescript-eslint/naming-convention': 'off',
        'unicorn/prefer-spread': 'off',
        'unicorn/import-index': 'off'
    }
};
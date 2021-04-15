const path = require('path');

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json') // The path to your tsconfig.json
    },
    plugins: ['@euberdeveloper', 'prettier'],
    extends: [
        'plugin:@euberdeveloper/typescript',
        'plugin:prettier/recommended'
    ],
    rules: {
        '@typescript-eslint/naming-convention': 'off'
    }
};
const path = require('path');

module.exports = {
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json') // The path to your tsconfig.json
    },
    plugins: ['@euberdeveloper'],
    extends: [
        'plugin:@euberdeveloper/typescript',
        'plugin:@euberdeveloper/prettier'
    ],
    rules: {
        '@typescript-eslint/naming-convention': 'off'
    }
};
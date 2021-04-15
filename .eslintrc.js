const path = require('path');

module.exports = {
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
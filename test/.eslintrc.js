module.exports = {
    env: {
        mocha: true
    },
    extends: [
        'plugin:@euberdeveloper/mocha'
    ],
    rules: {
        '@typescript-eslint/no-loop-func': 'off',
        '@typescript-eslint/no-invalid-this': 'off'
    }
};
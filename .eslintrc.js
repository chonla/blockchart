module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    parser: 'babel-eslint',
    extends: 'eslint:recommended',
    globals: {

    },
    rules: {
        'no-sequences': 'error',
        'semi': 'error',
        'eqeqeq': 'error'
    }
}
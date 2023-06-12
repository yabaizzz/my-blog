// const {defineConfig} = require('@vue/cli-service')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/my-project/'
        : '/',
    transpileDependencies: true,

    //是否开启eslint保存测验，有效值：true | false | 'error'
    lintOnSave: false

}

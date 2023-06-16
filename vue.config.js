// const {defineConfig} = require('@vue/cli-service')
const path = require('path')
const pxtorem = require('postcss-pxtorem');
module.exports = {
    publicPath: './',
    transpileDependencies: true,

    //是否开启eslint保存测验，有效值：true | false | 'error'
    lintOnSave: false,
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    // 在plugins外面加一层postcssOptions
                    plugins: [
                        pxtorem({
                            rootValue: 37.5,
                            propList: ['*'],
                        }),
                    ],
                },
            }
        },
    }
}



const {defineConfig} = require('@vue/cli-service')
const pxtorem = require('postcss-pxtorem');
module.exports = {
    publicPath: './',
    lintOnSave: false,
    transpileDependencies: true,
    css: {
        loaderOptions: {
            postcss: {
                postcssOptions: {
                    // 在plugins外面加一层postcssOptions
                    plugins: [
                        pxtorem({
                            rootValue: 32,
                            propList: ['*'],
                        }),
                    ],
                },
            },
        },
    },
    // rootValue: 换算的基数，例如：设置div高度 100px =》 1rem
    // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。
    // 目前我使用selectorBlackList字段，来过滤
    // 如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
    // selectorBlackList  : ['weui','mu'],

}








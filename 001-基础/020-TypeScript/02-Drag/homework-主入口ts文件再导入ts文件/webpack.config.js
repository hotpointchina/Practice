const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    // 生产模式导出
    mode:'production',
    // 生成关系映射，调整过程中可以定位问题
    devtool:'source-map',
    entry: {
        main: './src/main.ts'
    },
    output: {
        // 使用 node自带的 path 模块，解决 win 与 mac 的路径(正反斜杠)问题
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].js'
    },

    module: {
        rules:[
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },

    plugins: [
        // 将 html 文件也打包到 ./dist 
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./template/index.html"
        }),

        // 每次打包都将此前打包的内容清空，全部重新生成全部内容
        new CleanWebpackPlugin()
    ],

    // 若要在打包时将入口文件引入的 ts 等文件也一同打包，需添加扩展名
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },

    /*
        web-dev-server 配置
    */ 
    devServer: {
        hotOnly:true,
        hot:true,
        port:8080
    }
}
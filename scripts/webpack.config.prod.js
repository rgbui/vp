const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

var mode = process.argv.findIndex(x => x.indexOf('development') > -1) > -1 ? "dev" : 'pro';
/**
 * webpack url https://www.cnblogs.com/brandonhulala/p/6057378.html
 */

var outputDir = path.join(__dirname, "../../vp-serverless/vp-org/site");
module.exports = {
    mode: 'production',
    entry: "./app/main.ts",
    output: {
        path: outputDir,
        filename: "assert/js/bundle.js"
    },
    resolve: {
        extensions: [".vue", ".ts", ".js", ".less", ".css"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader"
        },
        //  使用vue-loader 加载 .vue 结尾的文件
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //     // 杩欓噷鍙互鎸囧畾涓�涓� publicPath
                    //     // 榛樿浣跨敤 webpackOptions.output涓殑publicPath
                    //     publicPath: '../'
                    // },
                },
                'css-loader',
            ],
        },
        {
            test: /\.less$/,
            use:
                [
                    {
                        loader: MiniCssExtractPlugin.loader,

                    },
                    'css-loader', 'less-loader'
                ],
        },
        {
            test: /svg\/[\w\-]+\.svg$/,
            loader: 'raw-loader'
        },
        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
        }]
    },
    externals: {

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../index.html"), // 婧愭ā鏉挎枃浠�
            filename: './index.html', // 杈撳嚭鏂囦欢銆愭敞鎰忥細杩欓噷鐨勬牴璺緞鏄痬odule.exports.output.path銆�
            showErrors: true,
            hash: true,
            inject: 'body',
            templateParameters: {
                
            }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: "assert/css/style.css" })
    ]
};
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

var mode = process.argv.findIndex(x => x.indexOf('development') > -1) > -1 ? "dev" : 'pro';
/**
 * webpack url https://www.cnblogs.com/brandonhulala/p/6057378.html
 */

const PUB_HOST = 'http://test-api.viewparse.com';
const DEV_HOST = 'http://test-api.viewparse.com';

module.exports = {
    mode: 'development',
    entry: "./app/main.ts",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "assert/js/bundle.js"
    },
    devServer: {
        //璁剧疆鍩烘湰鐩綍缁撴瀯
        contentBase: path.resolve(__dirname, 'dist'),
        //鏈嶅姟鍣ㄧ殑IP鍦板潃锛屽彲浠ヤ娇鐢↖P涔熷彲浠ヤ娇鐢╨ocalhost
        host: 'localhost',
        //鏈嶅姟绔帇缂╂槸鍚﹀紑鍚�
        compress: true,
        hot: true,
        port: 8080,
        open: true,
        historyApiFallback: {
            rewrites: [
                { from: /\.*/, to: '/index.html' }
            ]
        }
    },
    resolve: {
        extensions: ['.vue', ".ts", ".js", ".less", ".css"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { appendTsSuffixTo: [/\.vue$/] }
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
                    options: {
                        // 杩欓噷鍙互鎸囧畾涓�涓� publicPath
                        // 榛樿浣跨敤 webpackOptions.output涓殑publicPath
                        publicPath: '../../'
                    },
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
                        options: {
                            // 杩欓噷鍙互鎸囧畾涓�涓� publicPath
                            // 榛樿浣跨敤 webpackOptions.output涓殑publicPath
                            publicPath: '../../'
                        }
                    },
                    'css-loader',
                    'less-loader'
                ],
        },
        {
            test: /\.(jpe?g|png|gif|bmp|webp)$/,
            // 规则 limit给定的是图片的大小 如果我们给定图片的大小大于等于我们给定的limit 则不会被转为base64编码
            //反之会被转换name=[hash:8]-[name].[ext] 前面加hash值区分图片 名字原样输出
            loader: 'url-loader?limit=8192&name=assert/img/[hash:8].[name].[ext]'
        },
        {
            test: /\.(woff|eot|ttf)$/,
            // 规则 limit给定的是图片的大小 如果我们给定图片的大小大于等于我们给定的limit 则不会被转为base64编码
            //反之会被转换name=[hash:8]-[name].[ext] 前面加hash值区分图片 名字原样输出
            loader: 'url-loader?limit=8192&name=assert/fonts/[hash:8].[name].[ext]'
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
        new webpack.DefinePlugin({
            HOST: JSON.stringify(process.env.NODE_ENV === 'production' ? PUB_HOST : DEV_HOST)
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: "assert/css/style.css" })
    ]
};
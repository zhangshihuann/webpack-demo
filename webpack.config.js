var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanPlugin = require("clean-webpack-plugin")
var path = require('path')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: "./dist/assets/js/",
        //filename: "[name].[hash:8].js"
        filename: "[name].[chunkhash].js"
    },
    resolve: {
        extensions: ["js", "jsx"]
    },
    plugins: [
        new CleanPlugin(["dist"], {
            root: path.resolve(__dirname),
            verbose: true,
            dry: false,
            //exclude: ["dist/index.html"]
        }),
        function(){
            this.plugin("done", function(stats){
                require("fs").writeFileSync(
                    path.join(__dirname, "/dist/", "manifest.json"),
                    JSON.stringify(stats.toJson())
                )
            })
        },
        // js压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            exclude: "./dist/manifest.json"    
        }),
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, "/dist/", "index.html"),
            title: "webpack-plugin-demo",
            inject: "body",
            template: "./public/index.html",
            minify: {
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            }
        })    
    ] 
}

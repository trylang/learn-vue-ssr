const path = require('path');
const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),   // 输入：项目主文件（入口文件）
  output: {       // 输出
    filename: 'build.[hash:8].js',  // 输出的文件名
    path: path.join(__dirname, '../dist'),  // 输出路径
    publicPath: '/public/' // 基路径，如果router配置了mode为history，则webpack.config.client.js 中historyApiFallback也要配置基路径
  },
  module: {       // 配置加载资源
    rules: [    // 规则
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,  // 文件小于1024字节，转换成base64编码，写入文件里面
              // name: '[name]-[hash].[ext]' 原始配置
              name: 'resources/[path][name]-[hash].[ext]' // 按照src文件路径打包成独立的静态资源
            }
          }
        ]
      }
    ]
  },
};

module.exports = config;

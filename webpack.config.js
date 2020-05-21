/* 
使用commonjs模块化语法
向外暴露一个配置对象(属性名是一些特定名称的对象)
*/
const path = require('path')  // node内置
// __dirname:全局变量,当前文件所在目录的绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 构造函数
// 清除webpack打包
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 因为path.resolve(__dirname,'xxx')很常用,需要定义成一个函数
function resolve(dir) {
  // 返回指定目录的绝对路径(dir必须是项目根目录下的文件夹)
  return path.resolve(__dirname, dir)
}

// 引入vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  // 模式
  // mode:'development',
  // 入口
  /*
  此为完整写法,可简写为下方内容 
  entry: {
    main: './src/index.js'
  } */
  entry:'./src/index.js',
  // 出口
  output: {
    path: resolve('dist'),  // dist的绝对路径  所有打包生成文件的基础路径
    filename: 'static/js/[name].bundle.js'
  },
  // 模块打包器
  module: {
    rules: [
      // 内部配置loader模块加载器
      // vue单文件组件
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      // 处理es6转es5
      {
        test: /\.js$/,  // 匹配处理文件
        // exclude: /(node_modules|bower_components)/,  // 排除匹配的文件夹,include更常用
        include: [
          resolve('src') // 只对匹配的文件夹处理
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],  // 配置预设包(包含了多个ES6语法解析的插件plugin)
            plugins: [  // 配置预设包以外的插件包
            ]
          }
        }
      },
      // 处理css
      {
        test: /\.css$/,
        // css-loader: 将css打包到js中
        // style-loader: 将js中css转移到html的<style></style>
        // vue-style-loader是对style-loader的增强
        use: ['vue-style-loader','css-loader']  // loader处理从下向上,从右向左
      },
      // 处理图片
      {
        test:/\.png|gif|jpe?g|svg$/,
        loader: 'url-loader',  // url-loader内部需要用file-loader[file-loader不会对小图片进行base64处理]
        options: {
          limit: 5* 1024,  // 如果小于10k就进行base64处理,大于的话就生成一张图片
          name: 'static/img/[name].[hash:7].[ext]'  // 详读与output.path
        }
      }
    ]
  },
  // 插件
  plugins: [
    // 注意:是数组,不是对象
    // 插件实例对象
    new HtmlWebpackPlugin({
      template:'index.html' // 在执行命令所在目录下查找
    }),
    new CleanWebpackPlugin(), // 清除打包文件夹dist
    new VueLoaderPlugin(),  // 配置vue的插件
  ],

  // 开发服务器
  devServer: {
    port:8081, // 默认端口8080
    open:true, // 自动打开浏览器
    quiet:true //不做太多日志
  },
  // 引入模块的解析
  resolve:{
    extensions: ['.js', '.vue', '.json'],  // 指定哪些后缀的模块可以省略后缀名
    alias: {  // 路径别名(简写方式)
      /*
      1.简化模块路径的编写
      2.加快打包速度,提高效率
       */
      // 'vue$': 'vue/dist/vue.esm.js',  // 标识精准匹配
      '@': resolve('src'),
      '@comps': resolve('src/components')
    }
  },
}

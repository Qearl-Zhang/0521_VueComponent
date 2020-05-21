// 入口文件
/* 
// 注意:引入必须写在最上边
import './test.css'
import logo from './logo.jpg'

console.log('测试000001')
document.getElementById('root').innerHTML = '<h1>HELLO 007</h1>'

const a = ()=>{
  console.log('es6')
}

const image = new Image()
image.src = logo
document.getElementById('root').appendChild(image) */

/* 
在node_modules/vue/package.json中"main": "dist/vue.runtime.common.js",决定了import引入时会默认查找dist/vue.runtime.common.js,在webpack.config.js中设置alias别名后,精准匹配以.vue结尾的文件,引入时查找vue/dist/vue.esm.js

dist/vue.runtime.common.js是一个不带模板编译器的打包版本,如果不用render,只用template,就无法使用vue-template-complier,就无法编译template
*/
import Vue from "vue";  // 默认查找的是
import App from "./App.vue";

import HelloWorld from '@comps/HelloWorld.vue'


Vue.config.productionTip = false;

// 全局注册组件
// Vue.component('HelloWorld',HelloWorld)

new Vue({
  el: "#root",
  // render: h => h(App),
  render: function(createElement){
    return createElement(App)  // 根据组件生成组件所对应的标签,也就是返回<App/>
  } // 调用render函数得到它返回的组件标签对象
});
/* new Vue({
  el: "#root",
  components: {
    App
  },
  template: '<App/>'
}); */
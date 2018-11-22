#Flask+Vue快速打造个人网站(一)

> 记录一下起始日期2018/9/12/21:16

demo地址：<a href="http://oj.s001.xin">宅神的生活</a>

### 网站实现功能

> 作为练手项目，该项目主要练习前后端分离项目从开发到部署的流程

- 图片分类
- 图片展示
- 图片、视频后台上传
- 视频播放

### 前期准备

- 文件存储 ：七牛云

### 用到的库

前端

<img src="http://qiniu.s001.xin/tpi3q.jpg">

后端

- flask-admin 后台
- flask-restful API
- Flask-login  后台登录
- mysql
- Flask-migrate 数据库迁移

### 快速开始

对细节不感兴趣或者想直接撸代码的同学这边请：<a href="https://github.com/ZHAISHENKING/izone.git">后端</a>

<a href="https://github.com/ZHAISHENKING/izone-frontend.git">前端</a>	



别忘了**点赞**哦～

### 项目搭建

前端主要用了Vue-cli快速搭建项目，使用bootstrap-vue作为UI组件库

```bash
# npm安装失败一直是前端的痛，果断选了yarn
yarn add vue-cli
# 进入vue的GUI页面快速创建项目
vue ui
```

<img src="http://qiniu.s001.xin/4zsxd.jpg">

<img src="http://qiniu.s001.xin/dnypn.jpg">

预设选择`默认`

<img src="http://qiniu.s001.xin/k11iy.jpg">

右上角搜索插件并安装

- axios
- less
- qs
- store2
- css-loader
- less-loader
- vuex
- vue-template-compiler
- Bootstrap-vue
- vue-router

### 目录结构

<img src="http://qiniu.s001.xin/wyxeg.jpg" width="450">

`main.js`入口

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

# 引入ui库
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

```

`router.js`全局路由

```js
import Vue from 'vue'
import Router from 'vue-router'
# 所用到的组件注册
import Home from './views/Home.vue'
import About from './views/About'
import ImgCategory from './views/ImgCategory'
import ImgDetail from '@/components/ImgDetail.vue'
import Video from './views/Video'
import VideoDetail from '@/components/VideoDetail'

Vue.use(Router);

    const routes= [
        {path: '/', name: 'home', component: Home},
        {path: '/about', name: 'about', component: About},
        {path: '/img_category', name: 'category', component: ImgCategory},
        {path: '/photo', name: 'photo', component: ImgDetail},
        {path: '/video', name: 'video', component: Video},
        {path: '/iframe', name: 'video_show', component: VideoDetail},
    ];


    const router = new Router({
        mode: 'history',
        routes: routes
    });

# 各个模块留一个exprot可供其他模块调用
export default router

```

`configUrl.js`调用后端接口的地址前缀，方便生产环境与开发环境切换

```js
# type: http/https
const type = document.location.protocol;
const baseul = type + '//oj.s001.xin/api';
const baseui = type + '//127.0.0.1:5000/api';


export default {
    # 开发环境改成baseui就可以
    baseURL: baseul
}
```

`requestUrl.js`后端接口

```js
# 代替ajax
import axios from "axios";
# json格式转换
import qs from 'qs';
import baseURL from './configUrl.js';

# 请求头设置
function baseRequest(method, path, params, data, type) {
    method = method.toUpperCase() || 'GET';
    let url = '';
    let paramsobj = { params: params };
    if (type === 'msg') {
        url = baseURL.onbaseURL;
    } else {
        url = baseURL.baseURL;
    }
    axios.defaults.baseURL = url;
    if (method === 'POST') {
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        return axios.post(path, qs.stringify(data));
    } else if (method === 'GET') {
        return axios.get(path, paramsobj);
    } else {
        return axios.delete(path, qs.stringify(data));
    }
}

# 获取所有分类
export let get_category = function get_category(params){
    return baseRequest("GET", '/category/all/', params, '');
};
# 获取所有视频
export let get_all_video = function get_all_video(params){
    return baseRequest("GET", '/video/all/', params, '');
};
# 获取所有图片
export let get_all_img = function get_all_img(params){
    return baseRequest("GET", '/image/all/', params, '');
};
# 根据分类id获取图片
export let get_img = function get_all_img(params){
    return baseRequest("GET", '/image/'+params.id, params, '');
};
```

`vue.config.js`设置webpack参数

```js
# 写这个的目的是为webpack生产环境禁用端口检查
module.exports = {
    configureWebpack: {
        // other webpack options to merge in ...
    },
    // devServer Options don't belong into `configureWebpack`
    devServer: {
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
    },
};
```



**以上是主要的一些模块化js，请求接口的页面都大致一样，为了对初接触VUE的小伙伴更友好些，我用图片分类和跳转分类下所有图片页面进行讲解**

组件库: <a href="https://bootstrap-vue.js.org/docs/components/alert">Bootstrap-Vue</a>

<img src="http://qiniu.s001.xin/r8azu.jpg" width="400">

所有页面都在`src`目录下，`assets`目录放静态资源, `views`放一级视图

`components`目录放复用组件，比如header，footer等

----

在这里说下vue组件的语法

```vue
<!-页面由template、script、css三剑客组成-!>
<template>
	<!-template标签内只允许有一个大标签，将其余内容包起来-!>
	<div id="box">
        ...
    </div>
</template>

<script>
# 导入所需模块
import ...
# 可供调用模块
export default{
        name: '模块名',
        props: {
            # 属性
            msg: String
        },
        data(){
            # 初始化变量，将动态的数据通过方法、接口、事件赋值给变量渲染到页面
            return {
                msg: ''
            }
        },
        created(){
            # 周期函数 created、页面加载完成调用该方法
            this.Init();
        },
        methods: {
            # 变量赋值的方法
            Init(){
				
            },
            Click(i){
				this.msg = i;
            }
            
        }
    }
</script>

<style>样式</style>
```

<a href="https://cn.vuejs.org/v2/api/">VUE相关组件、周期函数了解更多</a>

`ImgCategory.vue`影集一级视图

```
写在代码前面对照着理解
script部分
首先导入接口，
data中定义空数组，拿到图片分类信息后填入数组中
页面加载完之后调用一次GetCate方法 填充数据
Detail方法用于事件点击，分类详情页面
```



```vue
<template>
  <b-container>
    <b-row align-h = “between>
        <!-专注数据，其余都是UI组件默认属性， 使用v-for遍历cateList中的数据-!>
      <b-col cols="4" v-for="i in cateList" :key="i.id">
          <!-这里的:title和上边的:key都是动态属性，填充数据，类似于php中的{{}}-!>
        <b-card :title="i.title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2">
            <!-@click点击事件、Detail为点击后调用的方法-!>
          <b-button variant="danger" @click="Detail(i.id)">Look</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
    import {
        get_category
    } from '../../requestUrl'
    export default {
        name: 'ImgCategory',
        data(){
            return {
                cateList: []
            }
        },
        created(){
            this.GetCate();
        },
        methods: {
            GetCate(){
                # 调用接口，该不需要传参，直接使用then获取后端数据
                get_category({}).then((data)=>{
                    let all = data.data;
                    if(all.code == 0){
                        if(all.data){
                            all.data.forEach((i)=>{
                                this.cateList.push({
                                    "title":i.title,
                                    "id": i.id
                                })
                            })
                        }
                    }
                })

            },
            Detail(id){
              this.$router.push('/photo?id='+ id);
            },
        }
    }
</script>

```

`ImgDetail`二级页面分类下所有图片

```
上个页面通过分类点击进入详情、详情页通过分类id获取id下所有图片
```

```vue
<template>
    <b-container fluid class="p-4 bg-dark">
        <b-row>
            <b-col v-for="i in imgList" :key="i.id">
                <b-img thumbnail fluid
                       :src="i.url"
                       alt="Thumbnail"
                       width="250"
                       height="250"
                       rounded
                       v-b-tooltip.hover :title="i.desc"
                >
                </b-img>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {get_img} from '../../requestUrl.js';
    export default {
        name: 'ImgDetail',
        props: {
            msg: String
        },
        data(){
            return {
                id: '',
                imgList:[]
            }
        },
        created(){
            this.ImgShow();

        },
        methods: {
            ImgShow(){
                # 解析url截取id，将id赋值给全局变量id
                let path = document.location.search;
                if(path){
                    this.id = decodeURIComponent(path.split('=')[1]);
                    this.GetAllImg(this.id)
                }
            },
            GetAllImg(id){
                # 通过id获取分类所属图片
                get_img({id:id}).then((data)=>{
                    let all = data.data;
                    if(all.code == 0){
                        if(all.data){
                            all.data.forEach((i)=>{
                                this.imgList.push({
                                    "desc":i.desc,
                                    "id": i.id,
                                    "url": i.image_url
                                })
                            })
                        }
                    }
                })
            }
        }
    }
</script>
```


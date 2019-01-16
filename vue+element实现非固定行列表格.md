# vue+element实现非固定行列表格

> 标题这么长说的什么意思呢，就是平时的表格都是一维的，变量只有行，列也就是属性prop是固定的，当需要行列都不固定的情况，就像乘法表，行列分别是`i`,`j`中间内容是`i*j`

<br>

实现：

Html

```html

<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.4.11/lib/index.js"></script>
<div id="app">
<template>
    <el-table :data="tableData" style="width: 100%">
        <div v-for="(item,key) in tableData[0]" :key="item.id">
          <el-table-column :label="key" :prop="key" width="180">
          </el-table-column>
        </div>
      
      
    </el-table>
  </template>
</div>
```

Script

```javascript
var Main = {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            id:1,
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            
          }, {
          	
            date: '2016-05-04',
            id:2,
            name: '王1虎',
            address: '上海市普陀区金沙江路 1517 弄',
            
          }, {
          	
            date: '2016-05-01',
            name: '王2虎',
            id:3,
            address: '上海市普陀区金沙江路 1519 弄',
            
          }, {
         
            date: '2016-05-03',
            name: '王3虎',
            id:4,
            address: '上海市普陀区金沙江路 1516 弄',
            
          },{
        
            date: '2016-05-03',
            id:5,
            name: '王4虎',
            address: '上海市普陀区金沙江路 1516 弄',
            
          }],
      
        }
      },
      
    }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
```

Css

```scss
@import url("//unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css");
```

<center><img src="http://qiniu.s001.xin/d12r1.jpg"></center>

**总结**

&emsp;&emsp;&emsp;&emsp;可以发现，数据层面还是照平常api来给，一维层面的数据，只是不知道key值有多少个，通过改变html的结构来渲染数据。

虽然不知道有多少个key，但一旦给了数据，每个字典里key的数量是相同的

所以，`v-for="(item,key) in tableData[0]"`取第一个字典的结构来遍历key，有多少个key，就有多少列。

`:label="key" :prop="key"`遍历了以后，`:label="key"`取的就是key对应的值，`:prop="key"`属性为key

插件规范

```
"""
Name
======

作者
----

该插件的作者信息

功能
----

描述插件的主要功能

截图
----

.. image:: /images/plugins/action.png

使用
----

描述插件的使用方法,  以及使用示例.

版本
----

描述插件的版本信息

API
---
.. autoclass:: XXX

"""
```


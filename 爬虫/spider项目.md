# spider

> 为练习方便 暂未对项目进行分类，后边如果做的多的话会进行资源整合

安装相关依赖模块

```pip install -r requirements.txt**
pip install -r requirements.txt
```

### 有道翻译`fanyi.py`

原文链接见<a href="http://www.tendcode.com/article/youdao-spider/">有道翻译sign破解</a>

目前只是中英文翻译   给出实例 返回结果

### 煎蛋网妹子图 `jiandan.py`

原文链接见<a href="http://www.tendcode.com/article/jiandan-meizi-spider-2/">煎蛋网爬虫</a>

原代码在输出的时候出现编码错误，经过笔者(就是我)的不懈努力 终于改好了

具体改动可对比代码

### qq音乐 `qqmusic.py`

这个重点讲一下，因为自己做的(傲娇)

翻了很多博客，就不贴地址了

- 创建了一个qqMusic类（方便管理，增强可读性）
- 定义两个方法*get_json*获取排行榜信息, *get_link*获取歌曲url
- 整个爬取过程实际上就是模拟浏览器get请求获取json文件

大家在爬的过程中也会发现源码ul中没有内容

一般人到这就换下一家了 ，

#### 但是

这才是重点，越难爬越有挑战才越有动力



#### 通过审查元素/F12的network直接点js抓包。

#### 可以发现所需要的内容都是在js返回的json文件中

<img src="http://qiniu.s001.xin/spider/qm/qqmusic.png">

那么你所要做的就是

#### 模拟request请求获取json文件

上图中查看headers你可以看到一些信息

1. headers请求头
2. params 请求数据（最下边）
3. url地址

有用的请求头包括`user-agent` `referer` 

params一些参数是固定不变的

### 但是

在获取音乐链接的时候通过换音乐对比请求 发现有两个参数是变化的

<img src="http://qiniu.s001.xin/spider/qm/1.png" width="450">

<img src="http://qiniu.s001.xin/spider/qm/2.png" width="450">



就是`songmid` `filename`

仔细对比songmid, filename发现

####filename的值也就比songmid多的前面的 C400

所以要解决的就只是 songmid

songmid在第一个函数获取的内容中就有。 **完美!**

然后模拟请求获取 `vkey值`

这里再说一下。 vkey值是针对于你获取的音乐的专属key值  没有这个key值取不到音乐

<img src="http://qiniu.s001.xin/spider/qm/vkey.png">

```Html
http://dl.stream.qqmusic.qq.com/C400004RXylR0adkY1.m4a?vkey=FFED438561F460E854B12428B698E9966EFF9EF576D20BA50E85F59AA204E5CE10338EEF9011DEC7B477E3B4BE2F4902A7B9A3659C8C5193
&guid=9384442260
&uin=0
&fromtag=66
```

最终拼接url

到这里markdown就结束了

----


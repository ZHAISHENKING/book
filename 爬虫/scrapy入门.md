# scrapy入门

<img src="https://scrapy.org/img/scrapylogo.png">

scrapy框架的组成

- 引擎

  爬虫所有行为都由引擎来支配，类似于人的行为都由大脑支配一样

  自动运行，无需关注，会自动组织所有的请求对象，分发给下载器

- 下载器

  从引擎处获取到请求对象后，请求数据

- spiders

  Spider类定义了`如何爬取`某个(或某些)网站。包括了爬取的动作(例如:是否跟进链接)以及如何从网页的内容中提取结构化数据(爬取item)。 换句话说，Spider就是您定义爬取的动作及分析某个网页(或者是有些网页)的地方。

- 调度器

  有自己的调度规则，无需关注

- 管道

  最终处理数据的管道，会预留接口供我们`处理数据`

  当Item在Spider中被收集之后，它将会被传递到Item Pipeline，一些组件会按照一定的顺序执行对Item的处理。

  每个item pipeline组件(有时称之为“Item Pipeline”)是实现了简单方法的Python类。他们接收到Item并通过它执行一些行为，同时也决定此Item是否继续通过pipeline，或是被丢弃而不再进行处理。

  以下是item pipeline的一些典型应用：

  1. 清理HTML数据
  2. 验证爬取的数据(检查item包含某些字段)
  3. 查重(并丢弃)
  4. 将爬取结果保存到数据库中

### 安装

```ruby
pip install scrapy
```

### 快速上手

```ruby
scrapy startproject 项目名
cd 项目名
scrapy genspider app名 '爬取的网址'
```

以项目名firstPorject，网址www.baidu.com为例

```ruby
# 例
scrapy startproject scrapyapp
cd scrapyapp
scrapy genspider baidu 'www.baidu.com'
```

此时的项目目录

<img src="http://qiniu.s001.xin/spider/ml.png" width="400px">

目录结构

- spiders

  由我们自己创建，是实现爬虫核心功能的文件

  注意，创建文件的路径不要搞错，应当在spiders文件夹内创建自定义的爬虫文件

- items.py

  定义数据结构的地方，是一个继承自scrapy.Item得类

- Middleware,py

  中间件

- pipelines.py

  管道文件

  里面只有一个类，用于处理下载数据的后续处理

- Settings.py

  配置文件
  比如：
  是否遵守robots协议
  User-Agent定义等

1. 进入`baidu.py`文件

```python
# -*- coding: utf-8 -*-
# baidu.py
import scrapy


class BaiduSpider(scrapy.Spider):
    # 用于运行爬虫的爬虫名称
    name = 'baidu'
    # 允许域名,只能爬取这个域名下的数据
    allowed_domains = ['www.baidu.com']
    # spider文件首次提交给引擎的url
    # 可以有多个url 可手动配置
    start_urls = ['http://www.baidu.com/']

    # 回调配置, 当下载器下载完一个请求对象的数据
    def parse(self, response):
        pass
```

修改回调配置

```python
# baidu.py

    def parse(self, response):
        items=[]
        # 解析当前的response数据
        # print(response.text)
        # 返回一个Selector对象列表
        title = response.xpath('//input[@id="su"]/@value')

        # extract、extract_first()方法可以直接对列表提取内容
        # extract_first() 如果被提取的selector列表为空，也不会报错
        name = title.extract()
        name1 = title.extract_first()
        print(name,name1)
        # 如果不写返回值不会报错, 但无法使用管道
        return items
```

2. 修改`settings.py`配置

```python
# ROBOTSTXT_OBEY改为False,表示不遵守网页robots.txt协议
ROBOTSTXT_OBEY = False
# UA肯定要配置，如果不配置，爬虫文件无法执行
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'

# 反爬速度限制,开启
DOWNLOAD_DELAY = 3
# 默认请求头。开启
DEFAULT_REQUEST_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en',
}
```

运行项目：

进入baidu.py所在目录

执行 

```python
$ scrapy crawl baidu
```

查看控制台输出
除了所需信息外，还有一些日志信息

如果只输出print信息,

执行

```python
$ scrapy crawl baidu --nolog
```

<img src="http://qiniu.s001.xin/spider/sp1.png" width="500">



### 日志

*日志级别*（从低到高）

- debug
- info
- warning
- error
- Critical

如果要执行

```ruby
$ scrapy crawl baidu
```

不想输出日志

在settings.py文件中

添加

```python
LOG_LEVEL = "DEBUG"
# 将日志信息存储到log.log中
LOG_FILE = "log.log"
```


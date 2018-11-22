# pyspider使用

### pyspider简介

> PySpider 是一个我个人认为非常方便并且功能强大的爬虫框架，支持多线程爬取、JS动态解析，提供了可操作界面、出错重试、定时爬取等等的功能，使用非常人性化

### 安装

```ruby
pip install pyspider
```

### 报错信息：

1. 25555端口被使用

   这是因为我之前先测试了phantomjs的使用 所以phantomjs已启动占用了25555端口

   Mac 用户可以使用 `lsof -i :25555 `查看pid

   然后 kill -s 9 [查看的pid] 来杀死进程

2. ImportError: pycurl: libcurl link-time ssl backend (openssl) is different from compile-time ssl backend (none/other)

   ```ruby
   pip uninstall pycurl
   
   export PYCURL_SSL_LIBRARY=openssl
   
   export LDFLAGS=-L/usr/local/opt/openssl/lib;export CPPFLAGS=-I/usr/local/opt/openssl/include;pip install pycurl --compile --no-cache-dir
   ```

###正常使用

启动5000端口

create

这里我们用医院的接口来做示范

```python
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# Created on 2017-03-15 16:22:50
# Project: 120_ask
from pyspider.libs.base_handler import *


class Handler(BaseHandler):
    crawl_config = {
    }
    @every(minutes=24 * 60)
    # 初始启动方法
    def on_start(self):
        self.crawl('http://tag.120ask.com/jibing/pinyin/a', callback=self.index_page)
    @config(age=10 * 24 * 60 * 60)
    
    # 主页
    def index_page(self, response):
        for each in response.doc('div.s_m1.m980 a').items():
            self.crawl(each.attr.href, callback=self.list_page)
	# 循环遍历出列表页
    def list_page(self, response):
        for each in response.doc('div.s_m2.m980 a').items():
            self.crawl(each.attr.href, callback=self.detail_page)
	# 详情页
    def detail_page(self, response):
        return {
            "url": response.url,
            "disease_name" : response.doc("div.LogoNav.m980.clears p a:nth-child(2)").text(),
            "guake" : [x.text() for x in response.doc("div.p_rbox3 div.p_sibox3b span").items()]
        }
```


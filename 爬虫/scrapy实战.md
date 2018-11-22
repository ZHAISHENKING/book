##scrapy实战

###糗事百科

1. 创建项目

```python
 scrapy startproject qiubaiproject
 cd qiubai
 scrapy genspider qsbk
```

Item.py

```python
# -*- coding: utf-8 -*-

import scrapy


class QiubaiprojectItem(scrapy.Item):
    # 统一了spider和管道之间数据格式的问题
    # 只关注业务逻辑,要保存什么数据，就要创建什么属性，属性的创建方法是统一的
    name = scrapy.Field()
    age = scrapy.Field()
    img_url = scrapy.Field()
```

Qiubai.py

```python
# -*- coding: utf-8 -*-
import scrapy


class Qiubai2Spider(scrapy.Spider):
    name = 'qiubai'
    allowed_domains = ['www.qiushibaike.com']
    start_urls = ['http://www.qiushibaike.com/']

    # 应该返回一个值，解析的所有数据，必须返回一个可以迭代的对象
    def parse(self, response):

        author_list = response.xpath('//div[starts-with(@class,"author")]')
        # print(author_list)

        items = []
        for author_node in author_list:
            # Selector对象可以继续使用xpath进行解析操作
            item = {
                'name' : author_node.xpath('.//h2/text()').extract_first().strip('\n'),
                'age' : author_node.xpath('./div/text()').extract_first(),
                'img_url' : 'http:' + author_node.xpath('.//img/@src').extract_first(),
            }
            # 字典的键必须跟items里面声明的键一致
            items.append(item)

        # 不写不会报错，意味着你没有把数据提交给引擎，引擎也不会提交给管道，数据就不会被管道保存
        return items
```

Pipelines.py

```python
# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json
# 管道就是一个对象，由piplines里面的类进行声明
# piplines里面可以声明多个管道类，每一个管道类可以负责处理一个业务逻辑
# 使用管道之前，必须进行settings里面的设置ITEM_PIPLINS


class QiubaiprojectPipeline(object):

    # 蜘蛛开始爬取的时候自动调用
    def open_spider(self, spider):
        self.fp = open('qiubai.json','w',encoding='utf-8')

    def close_spider(self, spider):
        self.fp.close()

    # 这是一个回调方法，是由引擎自动调用，引擎会把要存储的数据一个一个的通过item参数传递回来
    # spider就是回传数据给引擎的那个蜘蛛对象
    def process_item(self, item, spider):
        json_str = json.dumps(item,ensure_ascii=False)
        self.fp.write(json_str+'\n')
        return item

```

Settings.py(修改部分)

```python
# 添加
# DEBUG INFO WARNING ERROR CRITICAL
# 高于设置级别的日志信息都会打印出来
# 日志级别
LOG_LEVEL = 'DEBUG'
# 收集日志的日志文件，以.log结尾
LOG_FILE = 'qiubai.log'

# 修改
USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'

ROBOTSTXT_OBEY = False

DEFAULT_REQUEST_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  # 'Accept-Language': 'en',
}

# 数值越大，优先级越低
ITEM_PIPELINES = {
   'qiubaiproject.pipelines.QiubaiprojectPipeline': 300,
}
```

修改完毕后，运行

```ruby
$ scrapy crawl qiubai --nolog
```

效果图

<img src="http://qiniu.s001.xin/spider/sp2.png">
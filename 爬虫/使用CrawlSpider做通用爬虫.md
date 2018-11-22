### 使用CrawlSpider做通用爬虫

```python
from scrapy.linkextractors import LinkExtractor
LinkExtractor(
    # 允许 正则, 提取符合正则的链接
	allow=""
    # 排除 正则, 不提取符合正则的链接
    deny=""
    # 允许的域名
    allow_domains=""
    # 不允许的域名
    deny_domains=""
    # 提取符合xpath规则的链接
    restrict_xpaths=("")
    # 提取符合css规则的链接
    restrict_css=("")
)
```

示例:

```python
# -*- coding: utf-8 -*-
import scrapy
from scrapy.spiders import CrawlSpider,Rule
# 提取链接
from scrapy.linkextractors import LinkExtractor


class DsSpider(CrawlSpider):
    name = 'ds'
    allowed_domains = ['dushu.com']
    start_urls = ['http://www.dushu.com/book/1158.html']
    # 提取链接 可写正则
    rules = (
        Rule(LinkExtractor(allow=r'book/1158_\d+\.html', ), callback='parse_item', follow=False),
    )

    def parse_item(self, response):
        # 提取页面所有的书籍信息
        book_list = response.xpath('//h3').xpath('string(.)')
        for book in book_list:
            print(book.extract())
```


boss直聘

list页

|        字段        |          选择器           |
| :----------------: | :-----------------------: |
|    职位（job）     |        .job-title         |
|    薪资(money)     |           .red            |
|  公司名(company)   |    .company-text>h3>a     |
| 工作年限(workyear) |      .info-primary>p      |
|    学历(xueli)     |      .info-primary>p      |
|  公司规模(people)  |      .company-text>p      |
|  公司背景(rongzi)  |      .company-text>p      |
|  发布时间（time）  |      .info-publis>p       |
|    详情(detail)    | div.info-primary > h3 > a |

### 分布式爬虫

`settings.py`

```python
# settings.py
SCHEDULER = "scrapy_redis.scheduler.Scheduler"

DUPEFILTER_CLASS = "scrapy_redis.dupefilter.RFPDupeFilter"

DOWNLOAD_DELAY = 5
CONCURRENT_REQUESTS = 1

DOWNLOADER_MIDDLEWARES = {
   'boss.middlewares.BossDownloaderMiddleware': 543,
   'boss.middlewares.RandomUserAgentMiddleware': 125,
   'boss.middlewares.RandomProxyMiddleware': 345
}

ITEM_PIPELINES = {
   'scrapy_redis.pipelines.RedisPipeline': 400
}

REDIS_URL = 'redis://127.0.0.1:6379'
DUPEFILTER_CLASS = "scrapy_redis.dupefilter.RFPDupeFilter"
SCHEDULER = "scrapy_redis.scheduler.Scheduler"
SCHEDULER_PERSIST = True

RANDOM_UA_TYPE= 'random'
```

`middleware.py`

```python
class RandomUserAgentMiddleware(object):
    '''
    随机更换User-Agent
    '''

    def __init__(self, crawler):
        super(RandomUserAgentMiddleware, self).__init__()
        self.ua = UserAgent()
        self.ua_type = crawler.settings.get('RANDOM_UA_TYPE', 'random')

    @classmethod
    def from_crawler(cls, crawler):
        return cls(crawler)

    def process_request(self, request, spider):
        def get_ua():
            return getattr(self.ua, self.ua_type)

        request.headers.setdefault('User-Agent', get_ua())


class RandomProxyMiddleware(object):
    def process_request(self,request,spider):
        proxy = 'http://' + requests.get('http://zskin.xin:5010/get/').text
        request.meta['proxy'] = proxy
```


### get请求

```python
url = 'https://www.lagou.com'
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36"
}

# 发起请求
req = urllib.request.Request(url, headers=headers)
# with上下文管理读取内容
with urllib.request.urlopen(req) as response:
   html_doc = response.read()
```

### post请求

```python
from urllib import request
import urllib.parse

url = 'http://10.31.161.89:8000/users/'
values = {
    "username":"shire",
    "password":"qianfeng",
    "mobile":"15129087058"
}

# 对数据进行编码
data = urllib.parse.urlencode(values)
data = data.encode('utf-8')
# 获取返回的数据
req = request.Request(url, data=data)

request.urlopen(req)
```



###获取cookie

需要从http模块导入cookiejar

```python
from http import cookiejar
from urllib import request


def get_cookie():
    # 创建实例
    cookie = cookiejar.CookieJar()
    # 创建一个cookie处理器
    cookie_processor = request.HTTPCookieProcessor(cookie)
    """
    创建一个opener
    打开链接 获取保存在cookie中的数据
    """
    opener = request.build_opener(cookie_processor)
    response = opener.open('http://10.31.161.89:8000/xadmin/')
    print(cookie)


if __name__ == '__main__':
    get_cookie()
```

结果：

```python
<CookieJar[<Cookie csrftoken=I81BJcXzHVYo0tvL30lhJjN0f9AFoy6rx0J3G00Vh3BNrPtRd0YYzARRHQ9pwA7z for 10.31.161.89/>]>

```

###保存cookie

```python
def save_cookie():

    cookie = cookiejar.MozillaCookieJar('cookie.txt')
    cookie_processor = request.HTTPCookieProcessor(cookie)
    opener = request.build_opener(cookie_processor)
    response = opener.open('http://www.baidu.com')
    cookie.save()
```

通过比对可以发现 保存cookie修改了创建实例 使用了

```python
cookiejar.MozillaCookieJar('cookie.txt') 
```

最后 cookie.save()来保存数据

### 加载cookie

```python
# 创建实例
cookie = cookiejar.MozillaCookieJar()
# load
cookie.load('cookie.txt')
for item in cookie:
	print(item)
```

### 附件

<a href="http://docs.python-requests.org/zh_CN/latest/user/quickstart.html">快速上手request</a>
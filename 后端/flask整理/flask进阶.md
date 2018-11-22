在 Flask 中有两种上下文:程序上下文和请求上下文

请求：

- before_first_request:注册一个函数，在处理第一个请求之前运行。
- before_request:注册一个函数，在每次请求之前运行。
- after_request:注册一个函数，如果没有未处理的异常抛出，在每次请求之后运行。
- teardown_request:注册一个函数，即使有未处理的异常抛出，也在每次请求之后运行 

响应：

- response.set_cookie('answer', '42')： 设置cookie

密钥:

​	SECRET_KEY:	通用密钥 通常存储于环境变量 

Flask扩展

1. Flask-Script 命令行
2. Flask-Moment 本地化日期时间
3. Flask-WTF 处理表单 防止跨站请求伪造
4. Flask-Migrate 数据库迁移
5. Flask-Mail 电子邮件支持
6. Flask-Login 管理已登陆用户的用户会话
7. Werkzeug 计算密码散列值并进行核对
8. itsdangerous 生成并核对加密安全令牌
9. coverage 代码覆盖

数据库

- SQL 数据库擅于用高效且紧凑的形式存储结构化数据。这种数据库需要花费大量精力保证 

  数据的一致性。NoSQL 数据库放宽了对这种一致性的要求，从而获得性能上的优势。 

mongo连接判断

```python
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# 原本数据库连接超时是在10s以上，为了防止超时影响开发效率
# 使用serverSelectionTimeoutMS将时间限定为3s
# 3次连接不上，错误写入日志，连接失败
def connect(uri):
    count = 0
    while True:
        client = MongoClient(uri, serverSelectionTimeoutMS=3)
        try:
            client.admin.command("ping")
        except ConnectionFailure as e:
            log.error(e)
            count = count + 1
        else:
            break
        if count == 3:
            return False
    return True
```





### 大型应用：

`config.py`：程序配置

定义Config基类

配置类可以定义init_app()类方法

`Blueprint`：蓝图中创建应用程序

在蓝本中就不一样了，Flask 会为蓝本中的全部端点加上一个命名空间，这样就可以在不 

同的蓝本中使用相同的端点名定义视图函数，而不会产生冲突。命名空间就是蓝本的名字 (Blueprint 构造函数的第一个参数)，所以视图函数 index() 注册的端点名是 main.index， 

其 URL 使用 url_for('main.index') 获取。 

`Werkzeug`： 密码散列

将密码做为值传入 得出散列值存入数据库

```python
generate_password_hash(password, method=pbkdf2:sha1, salt_length=8) 
```

这个函数的参数是从数据库中取回的密码散列 值和用户输入的密码。返回值为 True 表明密码正确 

```Python
check_password_hash(hash, password)
```



### 应用编程接口

----

最近几年，Web 程序有种趋势，那就是业务逻辑被越来越多地移到了客户端一侧，开创出 了一种称为富互联网应用(Rich Internet Application，RIA)的架构。在RIA中，服务器的 主要功能(有时是唯一功能)是`为客户端提供数据存取服务`。在这种模式中，服务器变成 了 Web 服务或应用编程接口 

RESTFUL

- C-S 客户端与服务端之间
- 无状态：客户端发出的请求中必须包含所有必要的信息。服务器不能在两次请求之间保存客户端的任何状态
- 缓存：为了优化页面响应，可以允许缓存
- 接口统一：客户端访问服务器资源时使用的协议必须一致，定义良好，且已经标准化。REST Web 服务最常使用的统一接口是 HTTP 协议 
- 系统分层：在客户端和服务器之间可以按需插入代理服务器、缓存或网关，以提高性能、稳定性和 伸缩性。
- 按需代码：客户端可以选择从服务器上下载代码，在客户端的环境中执行

Flask 会特殊对待末端带有斜线的路由。如果客户端请求的 URL 的末 端没有斜线，而唯一匹配的路由末端有斜线，Flask 会自动响应一个重定向， 转向末端带斜线的 URL。反之则不会重定向。 



Post接收参数

参数；

```json
{
	"name":"adasds@163.com",
	"pwd":"dasdasdas"
}
```

接收

```python
request.get_json()
```



### 附

<img src="http://qiniu.s001.xin/flask/wtf_field.png" height="500px">

<img src="http://qiniu.s001.xin/flask/wtf_func.png">

<img src="http://qiniu.s001.xin/flask/sql_type.png">

<img src="http://qiniu.s001.xin/flask/sql_bool.png">

<img src="http://qiniu.s001.xin/flask/sql_orm.png">

<img src="http://qiniu.s001.xin/flask/sql_filter.png">

<img src="http://qiniu.s001.xin/flask/sql_search_func.png">

<img src="http://qiniu.s001.xin/flask/flask_login_user.png">

<img src="http://qiniu.s001.xin/flask/http_status.png">

<img src="http://qiniu.s001.xin/flask/api_status.png">

<img src="http://qiniu.s001.xin/flask/flask_auth.png">

<img src="http://qiniu.s001.xin/flask/flask_util.png">

### flask-restful中级用法

统一修改某个传入字段输出类型

> 需求： mongo传入id 输出ObjectId类型    传入时间戳 输出datetime类型

**输出字段**

----

Flask-RESTful 提供了一个简单的方式来控制在你的响应中实际呈现什么数据。使用 fields 模块，你可以使用在你的资源里的任意对象（ORM 模型、定制的类等等）并且 fields 让你格式化和过滤响应，因此您不必担心暴露内部数据结构。

当查询你的代码的时候，哪些数据会被呈现以及它们如何被格式化是很清楚的。

**基本用法**

你可以定义一个字典或者 fields 的 OrderedDict 类型，OrderedDict 类型是指键名是要呈现的对象的属性或键的名称，键值是一个类，该类格式化和返回的该字段的值。这个例子有三个字段，两个是字符串（Strings）以及一个是日期时间（DateTime），格式为 RFC 822 日期字符串（同样也支持 ISO 8601）

```
from flask.ext.restful import Resource, fields, marshal_with
 
resource_fields = {
    'name': fields.String,
    'address': fields.String,
    'date_updated': fields.DateTime(dt_format='rfc822'),
}
 
class Todo(Resource):
    @marshal_with(resource_fields, envelope='resource')
    def get(self, **kwargs):
        return db_get_todo()  # Some function that queries the db
```

**重命名属性**

----

很多时候你面向公众的字段名称是不同于内部的属性名。使用 attribute 可以配置这种映射。

```
fields = {
    'name': fields.String(attribute='private_name'),
    'address': fields.String,
}
```

lambda 也能在 attribute 中使用

```
fields = {
    'name': fields.String(attribute=lambda x: x._private_name),
    'address': fields.String,
}
```
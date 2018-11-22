# Flask+Vue快速打造个人网站（二）

> 2018.9.17 23:09

### 后端

后端框架使用flask考虑的是前后端分离，可以快速开发API，还有就是以前写的一些代码直接复用

在接口这块其实都差不多，主要来讲项目的模块化划分		

目录

<center>
	<img src="http://qiniu.s001.xin/zbpbb.jpg" width="250">    
</center>

`模块化项目`是为了使代码更加清晰、可复用、低耦合，与django不同的是，前期使用flask时在github撸了很多demo，发现大部分项目结构都不同，各有各的分法。

```bash
# 模块化想法
models数据模型、routes全局路由、config全局配置、 一个启动文件、一个app初始化文件、utils外部方法包
```

<img src="http://qiniu.s001.xin/ido8a.jpg">

>  这块有个坑就是互相引用的问题，尤其是在models里 A文件importB B文件又import A,就会引起这个问题，
>
> 最好的做法是__init__文件作为中间文件放置公共方法

模块化划分好之后,就是一些`外部库的用法`

- Flask-admin
- flask-migrate
- Flask-BabelEx
- Flask-Cors
- Flask-login
- Flask-restful
- Flask-script
- Flask-sqlalchemy
- blueprint

>  需求一：原始接口都是一个方法上面一个路由，@app.route()这样，多个api多个页面时全局查看路由就很不方便，需要把路由都放在一块与接口分离开来



`routes.py`路由页面

```python
from flask import Blueprint
from flask_restful import Api
from admins import Index

# 当需要flask_restful写接口时，Blueprint应该怎么引入就成了问题
# 实例化蓝图,路由前缀为/api
blue = Blueprint('api', __name__, url_prefix='/api')

docs = Api(blue)
# 路由注册
docs.add_resource(Index, '/', endpoint="index")
# 添加路由时只需
docs.add_resource(API类名, '路由地址', 端点)
```

api页面

```python
from flask_restful import Resource

# restfulAPI继承Resource类
class Index(Resource):
    def __init__(self):
        # ...
    def get(self):
        #...
    def post(self):
       # ...
```

models页面

```python
from admins import db

class Video(db.Model):
    __tablename__ = "video"
    id = db.Column(db.Integer, unique=True, primary_key=True)
    video_url = db.Column(db.String(100))
    desc = db.Column(db.String(80))
    time_long = db.Column(db.Integer)
    small_img = db.Column(db.String(100))
    watch = db.Column(db.Integer, default=0)

    def __repr__(self):
        return "<Video %r>" % self.id
```

这样路由查看就方便多了

<center>
    <img src="http://qiniu.s001.xin/cpkq3.jpg" width="500">
</center>



> 需求二：models迁移数据，修改model字段可以随时更新迁移 用到了flask-migrate

```python
"""
系统入口文件，
实例化app
添加shell脚本
"""
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand
from app import create_app
# 为了避免重复引用，我将db放在了admins.py中
from admins import db, AdminUser
# 将所有的model都引进来
from pictures.models import *


app = create_app('dev')
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command("runserver",
                    Server(host='0.0.0.0',
                           port=5000,
                           ))
manager.add_command("db", MigrateCommand)


if __name__ == '__main__':
    manager.run()

```

在admins目录下的`__init__.py`文件

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
```




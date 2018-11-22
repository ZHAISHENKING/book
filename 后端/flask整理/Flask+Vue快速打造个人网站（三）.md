# Flask+Vue快速打造个人网站（三）

> 2018.9.20 19:39

@[TOC]

### 后端部分

> 需求三:  虽然大部分视图都在前端展示，但缺少一个可以展示数据，实时增删改查的后台，要实现像django那样的后台模型视图，用到了`flask-admin`

admins目录下的`__init__.py`

```python
from flask_admin import Admin, AdminIndexView

admin = Admin(
    url='/api',
    index_view=AdminIndexView(
        url="/api/admin/",
        name="导航栏",
    ),
    name=u"个人空间",
    template_mode='bootstrap3'
)
```

`app.py`入口文件

```python
from admins import admin, AdminUser, db, ModelView
from flask_babelex import Babel
from pictures.models import *

# model视图注册
admin.add_view(ModelView(Picture, db.session, name=u"图片"))
admin.add_view(ModelView(Category, db.session, name="分类"))

# 初始化app
def create_app(config_name):
    app = Flask(config_name)
    app.config.from_object(config[config_name])
    # 国际化
	babel = Babel(app)
    # 应用注册
    db.init_app(app)
    admin.init_app(app)
    config[config_name].init_app(app)
    return app
```

`config.py`

```python
class Config(object):
    BABEL_DEFAULT_LOCALE = 'zh_CN'
	
    @staticmethod
    def init_app(app):
        pass
```



> 需求四: admin后台有了，但是不能对外放开，flask-login派上了用场

步骤如下

```mermaid
flowchat
st=>start: 开始
op=>operation: 创建AdminUser表
op1=>operation: 登录注册接口
op2=>operation: 接口路由注册
e=>end: 结束

st->op->op1->op2->e

```



`admins/__init__`

```python
"""
为了防止db循环调用
将db在仅初始化时调用的admin中注册
"""

from flask_admin import Admin, AdminIndexView
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, url_for, redirect, render_template, request, make_response
# 校验密码的方法
from werkzeug.security import generate_password_hash, check_password_hash

from wtforms import form, fields, validators
from flask_restful import Resource
import flask_login as login
from flask_admin.contrib.sqla import ModelView

db = SQLAlchemy()


class AdminUser(db.Model):
    __tablename__ = "admin_user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(50))
    password = db.Column(db.String(250))

    # Flask-Login integration
    # NOTE: is_authenticated, is_active, and is_anonymous
    # are methods in Flask-Login < 0.3.0
    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return self.id

    def set_password(self, password):
        return generate_password_hash(password)

    def check_password(self, hash, password):
        return check_password_hash(hash, password)

    # Required for administrative interface
    def __unicode__(self):
        return self.username


# Define login and registration forms (for flask-login)
class LoginForm(form.Form):
    username = fields.StringField(validators=[validators.required()])
    password = fields.PasswordField(validators=[validators.required()])

    def validate_login(self, field):
        user = self.get_user()

        if user is None:
            raise validators.ValidationError('Invalid user')

        # we're comparing the plaintext pw with the the hash from the db
        if not check_password_hash(user.password, self.password.data):
            # to compare plain text passwords use
            # if user.password != self.password.data:
            raise validators.ValidationError('Invalid password')

    def get_user(self):
        return db.session.query(AdminUser).filter_by(username=self.username.data).first()


class RegistrationForm(form.Form):
    username = fields.StringField(validators=[validators.required()])
    email = fields.StringField()
    password = fields.PasswordField(validators=[validators.required()])

    def validate_login(self, field):
        if db.session.query(AdminUser).filter_by(username=self.username.data).count() > 0:
            raise validators.ValidationError('Duplicate username')


# Create customized model view class
class MyModelView(ModelView):
    column_list = ("username", "email")

    def is_accessible(self):
        return login.current_user.is_authenticated


# Create customized index view class
class MyAdminIndexView(AdminIndexView):
    def is_accessible(self):
        return login.current_user.is_authenticated

    
class Index(Resource):
    def get(self):
        return make_response(render_template('home.html', user=login.current_user))


class LoginView(Resource):
    def __init__(self):
        self.form = LoginForm(request.form)

    def get(self):
        return make_response(render_template('form.html', form=self.form))

    def post(self):
        if self.form.validate():
            user = self.form.get_user()
            if user is None:
                raise validators.ValidationError('Invalid user')
            password = request.form.get("password")
            if AdminUser.check_password(AdminUser, user.password, password):
                login.login_user(user)
                return redirect(url_for('api.index'))
            else:
                raise validators.ValidationError('Invalid password')
        return make_response(render_template('form.html', form=self.form))


class RegisterView(Resource):

    def __init__(self):
        self.form = RegistrationForm(request.form)

    def get(self):
        return make_response(render_template('form.html', form=self.form))

    def post(self):

        if self.form.validate():
            user = AdminUser()

            self.form.populate_obj(user)
            db.session.add(user)
            db.session.commit()

            login.login_user(user)
            return redirect(url_for('api.index'))
        return make_response(render_template('form.html', form=self.form))


class LogoutView(Resource):

    def get(self):
        login.logout_user()
        return redirect(url_for('api.index'))


admin = Admin(
    url='/api',
    index_view=MyAdminIndexView(
        url="/api/admin/",
        name="导航栏",
    ),
    name=u"个人空间",
    template_mode='bootstrap3'
)

```

`routes.py`

```python
...
docs.add_resource(Index, '/', endpoint="index")
docs.add_resource(LogoutView, '/logout/', endpoint="logout")
docs.add_resource(LoginView, '/login/', endpoint="login")
```

`app.py`

```python
from admins import admin, login, AdminUser, db, ModelView

def create_app(config_name):
    ...
    # flask-login初始化
    def init_login():
        login_manager = login.LoginManager()
        login_manager.setup_app(app)

        @login_manager.user_loader
        def load_user(user_id):
            return db.session.query(AdminUser).get(user_id)
        
    init_login()
        
```

> 需求五:  将错误自定义，并收集起来，方便查看

`app.py`

```python
def create_app(config_name):
    ...
    # 日志配置
    handler = logging.FileHandler('app.log', encoding='UTF-8')
    logging_format = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(filename)s - %(funcName)s - %(lineno)s - %(message)s')
    handler.setFormatter(logging_format)
    
    app.logger.addHandler(handler)
    
    ...
```

`utils/common.py`

```python
# 请求成功
def trueReturn(data):
    return {
        "code": 0,
        "data": data,
        "msg": "请求成功"
    }


# 内部错误
def falseReturn(msg):
    return {
        "code": 1,
        "data": '',
        "msg": msg
    }


# 无权限
def VaildReturn(data):
    return {
        "code": 4,
        "data": data,
        "msg": "无效验证"
    }


# 数据库操作错误
def MongoReturn():
    return {
        "code": 2,
        "msg": "数据库操作错误"
    }


# 错误判断
def catch_exception(origin_func):
    def wrapper(self, *args, **kwargs):
        from flask import current_app
        from sqlalchemy.exc import (
            SQLAlchemyError,
            NoSuchColumnError,
            NoSuchModuleError,
            NoForeignKeysError,
            NoReferencedColumnError,
            DisconnectionError
        )
        try:
            u = origin_func(self, *args, **kwargs)
            return u
        except AttributeError as e:
            current_app.logger.error(e)
            return falseReturn(str(e))
        except (
                SQLAlchemyError,
                NoSuchColumnError,
                NoSuchModuleError,
                NoForeignKeysError,
                NoReferencedColumnError,
                DisconnectionError
        ) as e:
            current_app.logger.error(e)
            return falseReturn(str(e))
        except TypeError as e:
            current_app.logger.error(e)
            return falseReturn(str(e))
        except Exception as e:
            current_app.logger.error(e)
            return falseReturn(str(e))

    return wrapper
```

定义了`catch_exception`方法，在使用的时候只需在接口添加@catch_exception

例如

```python
class GetAllCategory(Resource):
    """获取所有分类"""
    @catch_exception
    def get(self):
        result = ""
        return trueReturn(result)
```

这么写也使代码更加的`pythonic`，

否则你会看到很多的try,except容错判断



> 需求七： 解决剩余的bug，全局响应头、跨域

`app.py`

```python
from flask_cors import CORS

def create_app(config_name):
    ...
    
    # 全局响应头
    @app.after_request
    def after_request(response):
        if "Access-Control-Allow-Origin" not in response.headers.keys():
            response.headers.add('Access-Control-Allow-Origin', '*')
        if request.method == 'OPTIONS':
            response.headers['Access-Control-Allow-Methods'] = 'DELETE, GET, POST, PUT'
            headers = request.headers.get('Access-Control-Request-Headers')
            if headers:
                response.headers['Access-Control-Allow-Headers'] = headers
        return response
    
    # 跨域
    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})
    ...
```


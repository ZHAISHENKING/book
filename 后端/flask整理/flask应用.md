# flask

### hello flask

```powershell
mkdir flask-pro
cd flask-pro
mkdir hello-flask
cd hello-flask/
virtualenv venv --python=python3
source venv/bin/activate
pip install flask
mkdir app
touch app/__init__.py
touch app/routers.py
touch hello.py
```

app

```Shell
# app/__init__.py

from flask import Flask

app = Flask(__name__)
from app import routers
```

Routers.py

```python
from app import app

@app.route('/')
@app.route('/hello')
def index():
    return 'HELLO FLASK'
```

```python
export FLASK_APP=hello.py
flask run
```

访问localhost:5000

![屏幕快照 2018-05-15 上午9.45.54](/Users/mac/Desktop/屏幕快照 2018-05-15 上午9.45.54.png)

### 访问html

新建Hello.html

```powershell
# app/templates/hello.html

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ title }}</title>
</head>
<body>
    <h1>Hello,{{ user.name }}!</h1>
</body>
</html>
```

Routers.py

```powershell
from app import app
from flask import render_template

@app.route('/')
@app.route('/hello')
def hi():
    user = {'name':'HOUSE','age':18}
    return render_template('hello.html',title='hello',user=user)
```

访问localhost:5000/

![屏幕快照 2018-05-15 上午10.22.57](/Users/mac/Desktop/屏幕快照 2018-05-15 上午10.22.57.png)



### debug on

默认flask的debug模式是关闭的

开启方法一：app下新建config文件

```
DEBUG = true
```

应用内加上

```
app.config.from_object('config')
```

开启方法二：pycharm设置勾选flask_debug

![屏幕快照 2018-05-15 下午3.16.14](/Users/mac/Desktop/屏幕快照 2018-05-15 下午3.16.14.png)

### 单页面应用

新建项目 hello-flask

下面创建目录templates

```python
# hello-flask/app.py

from flask import Flask,request
# 注册app
app = Flask(__name__)

# 路由+视图
@app.route('/login',methods=['GET','POST'])
def login():
    name = 'xiaoming'
    pwd = 'xiaoming'
    msg = None
    if request.method == 'POST':
        form = request.form
        username = form.get('username')
        password = form.get('password')
        if username == name and password == pwd:
            return '登陆成功'
        msg = '用户名或密码错误'
    from flask import render_template
    return render_template('login.html',msg=msg)


if __name__ == '__main__':
    app.run()

```

templates下建login.html

前端form表单

```html
#templates/login.html

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
{% if msg %}
{{msg}}
{% endif %}
<form action="/login" method="post">
    <input type="text" name="username">
    <input type="password" name="password">
    <button>登陆</button>
</form>
</body>
</html>
```

访问localhost:5000/login

![屏幕快照 2018-05-15 下午3.26.31](/Users/mac/Desktop/屏幕快照 2018-05-15 下午3.26.31.png)

失败返回

![屏幕快照 2018-05-15 下午3.27.21](/Users/mac/Desktop/屏幕快照 2018-05-15 下午3.27.21.png)

成功返回![屏幕快照 2018-05-15 下午3.27.51](/Users/mac/Desktop/屏幕快照 2018-05-15 下午3.27.51.png)

### flask名词理解

```python
# 蓝图
bluepoint
类似于django中的根路由
# 端点
endpoint
类似于django url中的name 可以用于重定向和模板反向解析
# url_for
django中的url
```


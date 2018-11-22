将重要配置信息存放在环境变量中

```bash
# 创建环境变量文件
vim ~/.bash_profile
# 添加
export 变量名=值
# 例如我将sql密码存入。假设密码为123456abc
export sqlpwd=123456abc
# 保存退出
source ～/.bash_profile
```

在django的配置文件中关于数据库这样写:

```python
# apps/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'blog',
        'USER': 'root',
        'PASSWORD': os.environ.get('sqlpwd'),
        'HOST': '127.0.0.1',
        'PORT': 3306,
        'OPTIONS': {'charset': 'utf8mb4'},
    }
}
```

这样就可以安全的去上传啦


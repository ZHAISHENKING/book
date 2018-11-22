# Django Debug Toolbar的安装及使用

## 安装

1. 通过pip去安装

1. ```
   pip install django-debug-toolbar
   ```

   安装完成以后，测试一下是否能够导入

```python
import debug_toolbar
```

2. 设置INSTALLED_APPS

   ```python
   # 在settings文件内的,INSTALLED_APPS内添加一下
   INSTALLED_APPS = [
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
       'web',
       'debug_toolbar'
   ]
   # 如果静态目录改变了，也需要配置一下
   # STATIC_URL = '/static/'
   ```

3. 配置URL

   ```python
   # 在原有的urlpatterns下面添加以下代码
   from django.conf import settings
   if settings.DEBUG:
       from django.conf.urls import include, url
       import debug_toolbar
       urlpatterns = [
           url(r'^__debug__/', include(debug_toolbar.urls)),
       ] + urlpatterns
   ```

4. 配置中间件

   ```python
   # 在原有的中间件后面添加下面的中间件
   MIDDLEWARE = [
       'django.middleware.security.SecurityMiddleware',
       'django.contrib.sessions.middleware.SessionMiddleware',
       'django.middleware.common.CommonMiddleware',
       # 'django.middleware.csrf.CsrfViewMiddleware',
       'django.contrib.auth.middleware.AuthenticationMiddleware',
       'django.contrib.messages.middleware.MessageMiddleware',
       'django.middleware.clickjacking.XFrameOptionsMiddleware',
       'web.middlewares.AuthMiddleware',
    # 添加到这里 
       'debug_toolbar.middleware.DebugToolbarMiddleware',
   ]
   ```

5. 配置 INTERNAL_IPS

   ```
   # 在settings文件内添加下面的代码
   INTERNAL_IPS = ['127.0.0.1']
   ```

6. 配置JQUERY源

   由于它默认使用的是google的jquery地址，国内访问不稳定，建议设置成国内的源，比如

   ```python
   # 在settings.py内添加下面的代码
   DEBUG_TOOLBAR_CONFIG = {
       'JQUERY_URL': 'https://cdn.bootcss.com/jquery/2.2.4/jquery.min.js',
   }
   ```

# 使用

按照上面的步骤配置完成以后，在debug模式下，启动项目，再打开页面，发现左上角有一个DJDT的小图标，点击图标可以看到界面了。


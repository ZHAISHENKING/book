### 一.技术点

- xadmin管理后台
- 国际化
- 可视化api
- api文档管理

### 二.安装

```Ruby
pip install djangorestframework
pip install markdown
# 图片处理
pip install pillow
# 过滤器
pip install django-filter
# drf的文档支持
pip install coreapi
# drf对象级别的权限支持
pip install django-guardian
# 后端服务器解决跨域问题
pip install django-cors-headers
```

### 三.项目目录

- extra_apps (源码包)

- apps (所有app)

- media(保存图片)

- db_tools(数据库相关)

  ```Python
  # 把extra_apps 和apps标记为sources root
  # pycharm文件夹右键点击mark diectory as->source root
  # settings加入
  import sys

  sys.path.insert(0,BASE_DIR)
  sys.path.insert(0,os.path.join(BASE_DIR, 'apps'))
  sys.path.insert(0,os.path.join(BASE_DIR, 'extra_apps'))

  ```

### 四.xadmin下载安装

```Shell
#下载地址:
https://pan.baidu.com/s/1NuvdYSX-ENWzX_JfqibucA
#打开后将xadmin放入extra_apps中
#将txt文件放入项目根目录下，执行
pip install -r requirements.txt
下载相关依赖
```

settings.py

```python
#需要添加的部分

#app
INSTALLED_APPS = [
	....
    'xadmin',  #替换django后台管理
    'crispy_forms',
    'testapp',
    'rest_framework',
    'coreschema',
]


#中文支持，django1.8以后支持；1.8以前是zh-cn
LANGUAGE_CODE = 'zh-hans'  
TIME_ZONE = 'Asia/Shanghai'
USE_I18N = True
USE_L10N = True
USE_TZ = False

# 静态资源
STATIC_URL = '/static/'
# 图像
MEDIA_URL = "/media/"
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"),
)
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

```

urls.py

```Shell
import xadmin

urlpatterns = [
    url('xadmin/', xadmin.site.urls),
]
```

创建testapp

```Python
#testapp/__init__.py
default_app_config = 'testapp.apps.TestappConfig'

#testapp/adminx.py
from xadmin import views
import xadmin
# 创建xadmin的最基本管理器配置，并与view绑定
class BaseSetting(object):
    # 开启主题功能
    enable_themes = True
    use_bootswatch = True
# 将基本配置管理与view绑定
xadmin.site.register(views.BaseAdminView,BaseSetting)

#testapp/apps.py
from django.apps import AppConfig
class TestappConfig(AppConfig):
    name = 'testapp'
    verbose_name = '用户'
```



```Ruby
终端执行
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### 五.可视化api

```python
#testapp/models.py

from django.db import models

class User(models.Model):
    uname = models.CharField(max_length=20)
    upwd = models.CharField(max_length=40)
    uemil = models.CharField(max_length=30)
    urelname =models.CharField(max_length=20,default='')
    uadr = models.CharField(max_length=100,default='')
    uphone = models.CharField(max_length=11,default='')
    
#testapp/serializer.py
from .models import User
from rest_framework import serializers

# API返回序列化后的接口字段
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
#testapp/views.py
from rest_framework import viewsets
from .serializer import UserSerializer
from .models import User

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
#根路由
from django.conf.urls import url, include
from rest_framework import routers
from testapp.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    url('xadmin/', xadmin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
```

### 六.api文档管理

```Python
#根路由下添加
from rest_framework.documentation import include_docs_urls

urlpatterns = [
	.....
    url(r'docs/',include_docs_urls(title="后台管理")),
]
```


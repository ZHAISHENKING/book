# memcached

## 安装

直接通过系统命令安装

```
yum install memcached
apt install memcached

```

或者去官网下载源码包编译安装

> https://memcached.org/

## 启动

```bash
# 以后台方式启动Memcached
memcached -d 
```

默认端口号是：11211



## 在Django中配置memcache

```python
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}

```

如果没有安装python的memcache客户端，需要先安装一下

```bash
pip install python-memcached
```



## 在Django中使用memcache

```bash
from django.core.cache import cache
cache.set('a', 1)
cache.get('a')
```

注意：在django中的memcahe会自动帮我们做对象的序列化和反序列化，我们只管往里设置和往外获取值就行了。



## redis和memcahed的区别

1. redis支持多种类型，memcached只支持字符串
2. redis支持持久化，memcached不支持
3. django原生支持memcached，redis需要自己再安装插件
4. memcached启动速度快，redis当持久化的数据较多时，启动速度慢。
5. 使用memcahed作缓存，需要预热，redis不需要。



## 
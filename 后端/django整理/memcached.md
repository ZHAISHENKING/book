# memcached

## 安装

直接通过系统命令安装

```
yum install memcached
apt install memcached

```

或者去官网下载源码包编译安装

> https://memcached.org/

### 查看帮助

```bash
memcached -h

# 说明
-p <num> 　　TCP监听端口(default: 11211)
-U <num> 　　 UDP监听端口(default: 11211, 0 is off)
-s <file> 　　 UNIX套接字路径侦听
-a <mask> 　　 UNIX套接字的访问掩码，八进制（默认值：0700）
-l <addr> 　　 侦听接口地址默认为所以地址可以指定主机加端口可以使用逗号分隔多个地址
-d 　　 作为守护进程运行
-r　　 最大文件描述符
-u <username>　　 指定运行用户
-m <num> 　　 最大内存(默认为64 MB)
-M 　　 内存耗尽时返回错误而不删除项目
-c <num> 　　 最大同时连接数默认为1024
-k 　　 锁定所有分页内存
-v 　　 显示错误或警告事件
-vv 　　 相信错误
-vvv 　　 详细错误信息及内部状态转换
-h 　　 打印此帮助
-i 　　 打印内存缓存和许可证
-P <file> 　　 指定PID文件，只与-d选择一起使用
-f <factor> 　　 块大小生长因子，默认值为1.25
-n <bytes> 　　 为键值标志的最小空间，默认为48
-L 　　 使用大内存页，增加的内存页大小可以减少TLB命中数提高性能
-D <char> 　　 使用<char>作为密钥前缀和IDS之间的分隔符
-t <num> 　　 使用的线程数，默认为4
-R 　　 每个事件的最大请求数默认为20
-C　　 禁用CAS的使用
-b <num> 　　 设置积压队列限制默认值1024
-B　　 绑定协议——ASCII、二进制或AUTO（默认）之一
-I 　　 重写每个板页的大小。调整最大项目大小（默认值：1MB，MI:1K，MAX：128M）
-S 　　 打开SASL认证
-o 　　 逗号分隔的扩展或实验选项列表
```



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

```python
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



## 在Flask中使用memcache

```python
from werkzeug.contrib.cache import MemcachedCache
cache = MemcachedCache(["127.0.0.1:11211"])
```




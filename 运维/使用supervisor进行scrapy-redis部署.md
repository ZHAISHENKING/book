## redis存放IP地址

```python
#如果你是使用的pyenv,请这些使用，并且要注意，下面这个地址你要写到supervisor的配置文件中
root@iZuf:~/xpc_redis# /root/.pyenv/versions/3.6.4/bin/scrapy shell
# 当然你也可以在虚拟机这样
# (env) duke@ubuntu:~/myproject/mycrawl/xpc_redis$ scrapy shell
>>> import redis
>>> from xpc.settings import PROXIES
>>> r = redis.Redis(host='127.0.0.1')
>>> for proxy in PROXIES:
    	r.sadd('discovery:proxies',proxy)
```



# supervisor的使用

## 安装

``` bash
# 使用pip来安装，目前supervisor只支持在python2.x环境下
pip install supervisor
# 也可以通过系统自带的包管理工具来安装
yum install supervisor
apt install supervisor安装完成以后，通过命令行查看一下版本。
```

## 配置

首先查看一下/etc/supercisord.conf文件是否存在，如果不存在，则使用下面的命令创建：

```bash
echo_supervisord_conf > /etc/supervisord.conf
```

> 该配置文件以分号（;）作为注释

## 配置文件

```ini
root@iZuf:~/xpc_redis# vim /etc/supervisord.conf
```



```ini
[inet_http_server]    
; 绑定的IP和端口
port=0.0.0.0:9001   
;用户名和密码
username=user              
password=123   

[unix_http_server]
; 服务器socket文件路径
file=/tmp/supervisor.sock
[supervisord]
; 日志文件路径
logfile=/tmp/supervisord.log
; 进程ID文件路径
pidfile=/tmp/supervisord.pid
; 定义了一个名为tinyproxy的程序
[program: tinyproxy]
; command后面就是启动这个程序的具体的命令
command=tail -f /var/log/tinyproxy/tinyprox.log
```



```ini
; 命令格式[program:程序名称]
[program:discovery1]
; 实际要运行的命令，注意命令的路径要写全
command=/root/.pyenv/versions/3.6.4/bin/scrapy crawl discovery
; 你运行命令的时候所在的目录
directory=/root/xpc_redis
; 把stderr(报错信息)重定向至标准输出
redirect_stderr=true         
; 把标准输出重定向到/tmp/discovery1.log文件
stdout_logfile=/tmp/discovery1.log     

; 定义一个程序组
[group:spiders]
# 定义该组有哪些程序，对应上面program的名字
programs=discovery1
```

###启动

```ini
root@iZuf:~/xpc_redis# supervisord
```



### 访问下面的地址

记得要开放你的阿里云安全组9001端口

http://你阿里云ip地址:9001/

用户名：user

密码：123



### 给redis起始地址

```ini
root@iZuf:~/xpc_redis# redis-cli
127.0.0.1:6379> lpush discovery:start_urls http://www.xinpianchang.com/channel/index/type-0/sort-like/duration_type-0/resolution_type-/page-4
```







```
class CreateLesson(Resource):
    """创建课时,获取所有课时"""
    def get(self):
        try:
            result=[]
            lesson = Lessons.objects.all()
            for i in lesson:
                result.append({
                    "num":i['num'],
                    "level":i["level"],
                    "name":i["name"],
                    "about":i["about"]
                })

            return {"msg":"请求成功", "code":0, "data": result}
        except Exception as e:
            current_app.logger.error(e)
            return {'msg':'获取失败','code':1}

    def post(self):
        id = str(round(time.time()*pow(10,6)))
        data = request.get_json()
        try:
            num = int(data['num'])
            if num<0:
                return {'msg':'课节错误', 'code':1}
        except Exception as e:
            return {'msg':'课节应为数字字符','code':1}

        count = Lessons.objects(num=data['name']).count()
        if count:
            return {'msg':'课时已存在','code':1}
        obj = {
            "id":id,
            "num":data['num'],
            "level":data['level'],
            "name":data['name'],
            "about":data['about']
        }
        lesson = Lessons(**obj)
        try:
            lesson.save(write_concern={'w': 1, "j": True})
            return {'msg':'创建成功', 'code':0}
        except Exception as e:
            current_app.logger.error(e)
            return {'msg':'创建失败', 'code':1}
```
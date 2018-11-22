# supervisor的使用

## 安装

``` bash
# 使用pip来安装，目前supervisor只支持在python2.x环境下
pip install supervisor
# 也可以通过系统自带的包管理工具来安装
yum install supervisor
apt install supervisor
```

安装完成以后，通过命令行查看一下版本。

```bash
supervisord --version
```

看一下supervisor有哪些命令：

```
supervisord    # 启动服务
supervisorctl	# 启动客户端
echo_supervisord_conf	# 输出配置文件
```

## 配置

首先查看一下/etc/supercisord.conf文件是否存在，如果不存在，则使用下面的命令创建：

```bash
echo_supervisord_conf > /etc/supervisord.conf
```

> 该配置文件以分号（;）作为注释

surpervisor查找配置文件的顺序是这样的：

```
/usr/etc/supervisord.conf
/usr/supervisord.conf
./supervisord.conf, 
./etc/supervisord.conf
/etc/supervisord.conf
/etc/supervisor/supervisord.conf
```

如果在以上目录都未能查找到配置文件则supervisor启动失败

我们可以手动指定配置文件的路径

```
supervisord -c /tmp/supervisord.conf
```

## 配置文件

```ini
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

##  使用客户端连接

连接上supervisor控制台

```supervisorctl```

再输入reload命令

或者直接重新启动supervisor

```bash
# 它会重启supervisor内所有的程序
supervisorctl reload
```

如果只是修改了program的配置，可以使用update命令

```
supervisorctl update
```

其他的客户端子命令

```
# 查看所有的程序的状态
supervisorctl status
# 查看程序的标准输出
supervisorctl tail [program_name]
supervisorctl tail -f [program_name]
# 启动、停止、重启相关程序
supervisorctl [start|stop|restart] [program_name]
```

```
[program:discovery1]
command=/root/.pyenv/shims/scrapy crawl discovery
directory=/root/xinpianchang/xpc
redirect_stderr=true          ; redirect proc stderr to stdout (default false)
stdout_logfile=/tmp/discovery1.log        ; stdout log path, NONE for none; default AUTO
```

```python
import redis
r=redis.Redis()
for proxy in settings.getlist('PROXIES'):
    r.sadd('discovery:proxies', proxy)
```










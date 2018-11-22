# uwsgi部署flask项目

- [nginx](https://www.nginx.com/) 用来做反向代理服务器：通过接收 Internet 上的连接请求，将请求转发给内网中的目标服务器，再将从目标服务器得到的结果返回给 Internet 上请求连接的客户端（比如浏览器）；
- [uwsgi](http://uwsgi-docs.readthedocs.io/en/latest/) 是一个高效的 Python WSGI Server，我们通常用它来运行 WSGI (Web Server Gateway Interface，Web 服务器网关接口) 应用（比如本项目的 Flask 应用）；
- [supervisor](http://supervisord.org/) 是一个进程管理工具，可以很方便地启动、关闭和重启进程等；

 

> **准备工作**:

/home下创建目录myproject，在myproject下用ftp或git将项目放入

```
/home/myproject/flask_blog
```

进入项目,创建虚拟环境

```shell
virtualenv flask_env
# 若要指定python版本
virtualenv flask_env --python=python3.6
```

### 配置uwsgi

项目根目录下，创建.ini文件.  如**/flask_blog/config.ini**

```powershell
[uwsgi]

# uwsgi 启动时所使用的地址与端口
socket = 127.0.0.1:8001 

# 指向网站目录
chdir = /home/myproject/ 

# python 启动程序文件
wsgi-file = manage.py 

# python 程序内用以启动的 application 变量名
callable = app 

# 处理器数
processes = 4

# 线程数
threads = 2

#状态检测地址
stats = 127.0.0.1:9191
```

**【注】：callable=app 这个 `app` 是 manage.py 程序文件内的一个变量，这个变量的类型是 Flask的 application 类** 

运行:

```shell
uwsgi config.ini
```

### 配置supervisor

#### 安装

```
apt-get install supervisor
```

添加一个新的*.conf文件放在**/etc/supervisor/conf.d/**下

那么我们就新建立一个用于启动 flask_blog 项目的 uwsgi 的 supervisor 配置 (命名为：my_flask_supervisor.conf)：

```shell
[program:my_flask]
# 启动命令入口
command=/home/myproject/flask_blog/venv/bin/uwsgi /home/myproject/flask_blog/config.ini

# 命令程序所在目录
directory=/home/myproject/flask_blog
#运行命令的用户名
user=root
        
autostart=true
autorestart=true
#日志地址(没有就新建一个)
stdout_logfile=/home/myproject/flask_blog/logs/uwsgi_supervisor.log  
```

启动服务

```
service supervisor start
```

### 配置Nginx

备份**/ext/nginx/sites-available/default**中的default文件

然后修改default

```shell
server {
      listen  80;
      server_name XXX.XXX.XXX; #公网地址
    
      location / {
        include      uwsgi_params;
        uwsgi_pass   127.0.0.1:8001;  # 指向uwsgi 所应用的内部地址,所有请求将转发给uwsgi 处理
        uwsgi_param UWSGI_PYHOME /home/myproject/flask_blog/venv; # 指向虚拟环境目录
        uwsgi_param UWSGI_CHDIR  /home/myproject/flask_blog; # 指向网站根目录
        uwsgi_param UWSGI_SCRIPT manage:app; # 指定启动程序
      }
    }
```

启动

```shell
sudo service nginx restart
```

>后续维护

修改项目文件后需重启nginx

```shell
sudo service nginx restart
```




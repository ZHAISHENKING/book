## Django项目部署

> 在 Linux 服务器上使用 Nginx + Gunicorn 部署 Django 项目的正确姿势 



目录

[TOC]

### 1.项目准备

首先需要把自己本地的项目放到服务器上面来，我使用的是 Github 克隆项目，这种从代码库克隆的方式是比较推荐的，因为可以持续的使用 pull 来让服务器上面的项目保持跟代码仓库中同步。Github 的安装、配置和使用这里省略，如果需要请自行去查阅相关资料完成操作。

#### 1.1 克隆项目

在这里我统一把项目放在**/home/project**下

我的项目名为write，克隆下来后目录是这样的**/home/project/write**

#### 1.2 创建虚拟环境

write**同级**即project下执行

```ruby
virtualenv write_env
```

 Ok,此时目录是这样

```ruby
/home/project/write
/home/project/write_env
```

**source write_env/bin/activate** 进入虚拟环境

安装依赖，

配置好数据库，

收集静态资源

```Ruby
python manage.py collectstatic
```



运行项目  127.0.0.1:8000

成功之后

### 2 开始部署

#### 1.1 安装和配置Gunicorn

1. 虚拟环境中安装Gunicorn

```Ruby
pip install gunicorn
```

2. 创建项目的Gunicorn配置文件（退出虚拟环境）

```Ruby
sudo vim /etc/systemd/system/gunicorn_write.service
```

3. 配置信息如下

```Ruby
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=ubuntu
WorkingDirectory=/home/ubuntu/test
ExecStart=/home/ubuntu/venv/bin/gunicorn --access-logfile - --workers 2 --bind unix:/home/ubuntu/test/test.sock mongo.wsgi:application

[Install]
WantedBy=multi-user.target
```

上面的配置信息中需要根据自己的项目改的有以下几个地方：

- User 填写自己当前用户名称
- WorkingDirectory 填写项目的地址
- ExecStart 中第一个地址是虚拟环境中 gunicorn 的目录，所以只需要改前半部分虚拟环境的地址即可
- workers 2 这里是表示2个进程，可以自己改
- unix 这里的地址是生成一个 sock 文件的地址，直接写在项目的根目录即可
- izone.wsgi 表示的是项目中 wsgi.py 的地址，我的项目中就是在 izone 文件夹下的

#### 1.2启动配置文件

文件配置完成之后，使用下面的命令启动服务：

```Ruby
~$ sudo systemctl start gunicorn_write
~$ sudo systemctl enable gunicorn_write
```

查看服务的状态可以使用命令：

```ruby
~$ sudo systemctl status gunicorn_write
```

上面的命令启动没有问题可以看看自己的项目的跟目录下面，应该会多一个 tendcod.sock 文件的。

后续如果对 gunicorn 配置文件做了修改，那么应该先使用这个命令之后重启：

```ruby
~$ sudo systemctl daemon-reload
```

然后再使用重启命令：

```ruby
~$ sudo systemctl restart gunicorn_write
```

#### 1.3 配置 Nginx

首先创建一个 Nginx 配置文件，不要使用默认的那个：

```Ruby
~$ sudo nano /etc/nginx/sites-available/mynginx
```

配置信息如下：

```ruby
server {
    # 端口和域名
    listen 80;
    server_name zskin.xin;

    # 日志
    access_log /home/alex/tendcode/logs/nginx.access.log;
    error_log /home/alex/tendcode/logs/nginx.error.log;

    # 不记录访问不到 favicon.ico 的报错日志
    location = /favicon.ico { access_log off; log_not_found off; }
    # static 和 media 的地址
    location /static/ {
        root /home/project/write;
    }
    location /media/ {
        root /home/project/write;
    }
    # gunicorn 中生成的文件的地址
    location / {
        include proxy_params;
        proxy_pass http://unix:/home/ubuntu/test/test.sock;
    }
}

server {
    listen 80;
    server_name tendcode.com;
    rewrite ^(.*) http://www.zskin.xin$1 permanent;
}
```

第一个 server 是主要的配置，第二 server 是实现301跳转，即让不带 www 的域名跳转到带有 www 的域名上面。

#### 1.4 连接 Nginx 配置

上面的配置检查好之后，使用下面的命令来将这个配置跟 Nginx 建立连接，使用命令：

```ruby
~$ sudo ln -s /etc/nginx/sites-available/mynginx /etc/nginx/sites-enabled
```

运行完毕之后可以查看一下 Nginx 的运营情况，看看会不会报错：

```ruby
~$ sudo nginx -t
```

如果上面这句没有报错，那么恭喜你，你的配置文件没有问题，可以继续下一步，如果报错了，需要按照报错的信息去更改配置文件中对应行的代码，好好检查一下吧！

没报错的话，重启一下 Nginx：

```ruby
~$ sudo systemctl restart nginx
```

好了，重启 Nginx 之后可以登录自己配置的域名，看看自己的项目是不是已经成功的运行了呢！

## 后续维护

之后的项目维护中，如果更改了 gunicorn 的配置文件，那么需要依次执行下面两条语句去重启服务，如果只是修改了 Django 项目的内容，只需要单独执行第二条重启命令即可：

```ruby
~$ sudo systemctl daemon-reload
~$ sudo systemctl restart gunicorn_write
```

如果修改了 Nginx 的配置文件，那么需要依次执行下面两条语句去重启服务：

```ruby
~$ sudo nginx -t
~$ sudo systemctl restart nginx
```

 
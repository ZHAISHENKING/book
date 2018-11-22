### 1.安装

[docker安装](https://blog.csdn.net/weixin_42042680/article/details/80818552)

### 2. 使用

1. pull一个基本系统镜像到本地

```Python
执行以下命令：
> sudo docker pull ubuntu:16.04
> sudo docker images  
```

2. 进入ubuntu镜像

```Python
执行以下命令：
> sudo docker run -it ubuntu:16.04
```

3. 安装相关程序

```Ruby
执行以下命令：
# 修改apt源
> vi /etc/apt/source.list 
# 输入以下源：
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
```

```Ruby
> apt-get update
> apt-get install vim
> apt-get install python3-pip
> pip3 install uwsgi  // 安装uwsgi
> apt-get install nginx  //安装nginx
> pip3 install django==1.11.0
```

4.创建一个django项目

```Ruby
> sudo cd root 
> sudo django-admin startproject DockerDjangoTest
```

5.创建uwsgi配置文件

```Ruby
> vim /root/docker-django-test-uwsgi.ini
输入以下内容：
[uwsgi]
master = true
chdir = /root/DockerDjangoTest
processes = 4
http = 0.0.0.0:8888
daemonize = /root/uwsgi.log
wsgi-file = DockerDjangoTest/wsgi.py
daemonize = /root/docker-django-test-uwsgi.log
```

6.配置nginx

```Ruby
> sudo vim /etc/nginx/conf.d/docker_django_test_nginx.conf
输入以下内容：
upstream docker-django-test {
    server 0.0.0.0:8888;
}

server {
    listen 8010;
    server_name 0.0.0.0;
    charset utf-8;

    client_max_body_size 75M;

    # Django media
    location /media {
        alias /root/DockerDjangoTest/media;
    }

    location /static {
        alias /root/DockerDjangoTest/static;
    }

    location / {
        proxy_pass http://docker-django-test;
    }
}
```

7.重启nginx

```ruby
> sudo service nginx restart
```

8.写启动脚本

```Ruby
sudo vim /root/start-django.sh
输入以下内容：
#! / bin/sh
service nginx restart;
uwsgi --ini /root/docker-django-test-uwsgi.ini;
tail -100f /var/log/nginx/access.log;
```

 

9.修改启动脚本权限

```ruby
sudo chmod 777 /root/start-django.sh
```

10.退出容器，并commit容器为镜像

```Ruby
> exit
> sudo docker ps -a
找到最新一条记录的id
> sudo docker commit -m "init django env on ubuntu:16.04" [id] [name]/[image-name]
```

11.在主机中重新运行该容器

```Ruby
> sudo docker run -d -p 0.0.0.0:8010:8010 [name]/[image-name] sh /root/start-django.sh
```

12.浏览器中访问

```Ruby
浏览器访问：http://127.0.0.1:8010
若是服务器上配置的，则访问：http://your server ip:8010
```

#### 番外篇

如何将自己的docke镜像上传到dockerhub

1. 首先需要在[https://hub.docker.com/](https://link.jianshu.com/?t=https://hub.docker.com/)注册账号
2. 在主机上执行`sudo docker login`按照提示登录自己注册的账号
3. 执行`sudo docker images`查看本地已有的镜像
4. 执行`sudo docker push [image]:tag` //比较慢
5. 完毕，可登录 [https://hub.docker.com/](https://link.jianshu.com/?t=https://hub.docker.com/)查看和设置自己上传的镜像

提供一个基本版django生产环境的docker镜像

[https://hub.docker.com/r/kering/django-env/](https://link.jianshu.com/?t=https://hub.docker.com/r/kering/django-env/)

 删除所有镜像

```bash
docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker stop

docker ps -a | grep "Exited" | awk '{print $1 }'|xargs docker rm

docker images|grep none|awk '{print $3 }'|xargs docker rmi

# 停止所有正在运行的容器
docker ps|awk '{print $1}'|xargs docker stop
# 获取正在运行的postgresql的docker进程id
docker ps|grep "postgres"|awk '{print $1}'
```

 

### 解决静态资源无法加载问题

```bash
python manage.py runserver --insecure
```

 ### 本地资源同步到远程

```bash
rsync -a -v super root@zskin.xin:/root/super
```

### 基础命令

```bash
# 运行进程
docker ps
# 所有进程
docker ps -a
# 列出进程ip
docker inspect 镜像id |grep IP
# 容器内部进程运行情况
docker top
# 映射本地文件到docker容器运行，推出时删除容器
docker run --name redis3 --rm -v /tmp/redis:/data redis
# 后台启动 -d 指定端口 -p
docker run -d -p 0.0.0.0:8000:8000 zskin/xpc sh /root/run.sh
# 交互模式进入 -it -v映射文件
docker run -it -v /data/xpc:/usr/src zskin/xpc /bin/bash
```

### 打包镜像

 1.创建dockerfile

```shell
FROM django:1.11
WORKDIR /usr/src
COPY . /usr/src
RUN pip install -r requirements.txt -i http://mirrors.tencentyun.com/pypi/simple --trusted-host=mirrors.tencentyun.com
EXPOSE 8000
CMD ['/usr/local/bin/gunicorn', '-b', '0.0.0.0:8000', 'web.wsgi']
```

2.打包

```shell
Docker build -t name/image .
```






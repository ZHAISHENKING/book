# Dockerfile该怎么写？

[TOC]

目前我会的docker运行方式就是简单粗暴的docker pull下来别人的基础环境，

然后把自己的项目丢进拉下来的基础环境运行，

最终保存退出，打包成自己的镜像push到自己的docker hub中以供项目复用

> 有朋友问我是不是懂docker，我觉得略懂，然后问我如何写Dockerfile，我也是一脸懵x，本着好学的心态去了解了一下Dockerfile的生成

### docker?

项目运行依赖环境是必需的，我的python项目 `nginx+redis+mysql+python+flask`， 让别人在他的电脑上如何快速运行我的项目？各种找资源安装依赖？No， docker就是解决这个问题的，以`容器+镜像`的形式存储依赖环境，就像虚拟机一样，让别人快速拥有能运行项目的环境

### Dockerfile?

就是将你的项目依赖打包成docker镜像的一个文件，开头的D必须大写

```bash
# 打开终端,创建一个新目录存放Dockerfile
cd ~
mkdir docker-demo
cd docker-demo
touch Dockerfile
```

这样就准备好了，进入你的项目把依赖文件拷贝一份，requirements.txt或者package.js等等

```bash
cp requirements.txt ~/
cd ~/docker-demo
vim Dockerfile
```

开始写了

```ini
FROM tiangolo/uwsgi-nginx-flask:python3.6
COPY ./requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
```

这就写完了

然后执行

```bash
# 最后的.不要省略
# nginx是镜像名，v1是tag，都是自己起的
# 如果后面要上传到自己的镜像仓库dockerhub， 这块的镜像名最好起成 dockerhub的账号名/镜像
# 如 dockershi/django-demo
docker build -t nginx:v1 .
```

这样就构建好啦，docker images可以查看到生成的镜像

<center>
    <img src="http://qiniu.s001.xin/dke76.jpg">
</center>

来说下需要注意的地方，

`FROM` 后边跟的是基础镜像。我找了一个相对比较全的基础镜像，基础镜像可以去docker hub去找

`COPY` 就是拷贝 当前目录下的依赖文件.  这里要说的是尽量把依赖文件单独拎出来，因为这个./ 的意思是上下文，是相对路径,所以你用../req.  /root/app/req都没用

`RUN` 就是按层级执行，层级尽量不要太多

比如

```ini
RUN apt-get install redis
RUN apt-get install mongo
RUN apt-get install gcc
```

就直接写成

```ini
RUN buildDeps = apt-get install redis \
	&& apt-get install mongo \
	&& apt-get install gcc \
	$buildDeps
```

$buildDeps结束  \换行承接上文


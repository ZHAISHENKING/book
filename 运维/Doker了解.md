#Docker

<img src="http://www.ruanyifeng.com/blogimg/asset/2018/bg2018020901.png">

##一、Docker是什么?

**Docker 属于 Linux 容器的一种封装，提供简单易用的容器使用接口。**它是目前最流行的 Linux 容器解决方案。

Docker 将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟容器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了 Docker，就不用担心环境问题。

总体来说，Docker 的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放入容器。容器还可以进行版本管理、复制、分享、修改，就像管理普通的代码一样。

Doker是基于GO语言实现的云开源项目

通过对应用组件的封装、分发、部署、运行等生命周期的管理，达到应用组件级别的“一次封装，到处运行”这里的应用组件 既可以是web应用 也可以是一套数据库服务 甚至是一个操作系统或编译器

## 二、 Docker的用途?

Docker 的主要用途，目前有三大类。

**（1）提供一次性的环境。**比如，本地测试他人的软件、持续集成的时候提供单元测试和构建的环境。

**（2）提供弹性的云服务。**因为 Docker 容器可以随开随关，很适合动态扩容和缩容。

**（3）组建微服务架构。**通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

### 三、Docker的优势

**更快速的交付和部署**(使用docker，开发人员可以用镜像来快速构建一套标准的开发环境;开发完成之后，测试和运维人员可以直接使用相同环境来部署代码。)

**更轻松的迁移和扩展**(docker容器几乎可以在任意平台上运行，包括物理机、虚拟机、公有云、私有云、个人电脑、服务器等。可以在不同的平台轻松地迁移应用)

**更简单的更新管理**(使用Dockerfile，只需要修改小小的配置，就可以替代以往大量的更新工作)

**更快速的启动时间**

**更高效的利用系统资源**

与传统虚拟机对比

![img](https://img-blog.csdn.net/20170408154126266?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcmVsYXhfaGI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

**场景示例-传统开发流程**

![img](https://img-blog.csdn.net/20170408154322284?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcmVsYXhfaGI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

**场景示例-docker环境开发流程**

![img](https://img-blog.csdn.net/20170408154455025?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcmVsYXhfaGI=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

 

## 四、 Docker的安装

Docker 是一个开源的商业产品，有两个版本：社区版（Community Edition，缩写为 CE）和企业版（Enterprise Edition，缩写为 EE）。企业版包含了一些收费服务，个人开发者一般用不到。下面的介绍都针对社区版。

Docker CE 的安装请参考官方文档。

> - [Mac](https://docs.docker.com/docker-for-mac/install/)
> - [Windows](https://docs.docker.com/docker-for-windows/install/)
> - [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
>
> ```
> curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
> ```
>
>  
>
> - [Debian](https://docs.docker.com/install/linux/docker-ce/debian/)
> - [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
> - [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/)
> - [其他 Linux 发行版](https://docs.docker.com/install/linux/docker-ce/binaries/)

安装完成后，运行下面的命令，验证是否安装成功。

```
$ docker --version
	Docker version 1.12.3, build 6b644ec
$ docker-compose --version
	docker-compose version 1.8.1, build 878cff1
$ docker-machine --version
	docker-machine version 0.8.2, build e18a919
```

如果 `docker version`、`docker info` 都正常的话，可以运行一个 [Nginx 服务器](https://hub.docker.com/_/nginx/)：

```
1 $ docker run -d -p 80:80 --name webserver nginx
```

服务运行后，可以访问 [http://localhost](http://localhost/)，如果看到了 "Welcome to nginx!"，就说明 Docker for Mac 安装成功了。

![img](https://yeasy.gitbooks.io/docker_practice/content/install/_images/install-mac-example-nginx.png)

要停止 Nginx 服务器并删除执行下面的命令：

```
1 $ docker stop webserver
2 $ docker rm webserver
```
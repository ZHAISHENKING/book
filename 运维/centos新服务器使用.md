# centos新服务器使用

### 1.python环境

```bash
# 依赖
yum groupinstall "Development tools"
yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
# pyenv管理python版本 默认是python2
curl -L https://raw.github.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash
```

环境变量配置

<center>
    <img src="http://qiniu.s001.xin/j6emy.jpg" width="500">
</center>

将这三行复制 写入 `~/.bashrc`或`~/.profile`文件(没有就创建)

```bash
pyenv install 3.6.4 -v
# 设置全局python版本
pyenv  global 3.6.4
```

### 2. 部署前准备

用git拉下来你的项目到 ～目录下

```bash
# 安装虚拟环境管理工具
pip install virtualenv
# 在～目录下创建虚拟环境
virtualenv ienv
```

<center><img src="http://qiniu.s001.xin/qnbcf.jpg"></center>

其中 `izone`是我git项目(准备部署的)

```bash
# 进入虚拟环境
source ienv/bin/activate
cd izone
pip install -r requirements.txt
```

在安装虚拟环境时报错。关于mysql的，因为新服务器没有安装mysql

```bash
yum install mysql
```

安装以后不能启动，查询了一些文档以后看到这么一条

<center><img src="http://qiniu.s001.xin/oeb1n.jpg" width=700></center>

好吧。。拥抱mariadb

```bash
# 安装
yum install -y mariadb-server
# 启动服务
systemctl start mariadb.service
(说明：CentOS 7.x开始，CentOS开始使用systemd服务来代替daemon，原来管理系统启动和管理系统服务的相关命令全部由systemctl命令来代替。)
# 开机自启动
systemctl enable mariadb.service
```

mysql安装好了，pip还是失败   

```bash
Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-install-fwot3_uw/mysqlclient/
```

解决方案

```bash
yum install python-devel
yum install mysql-devel
yum install gcc
```

mysql 1045错误 权限不足

我刚安装的mysql没有设置密码

```bash
# 进入mysql
mysql -uroot mysql
# mysql命令
UPDATE user SET Password=PASSWORD('newpassword') where USER='root';
LUSH PRIVILEGES;
quit
# 退出以后重启
systemctl restart mariadb.service
```

想跑起来项目真难...

明天安装supervisor

好多步骤其实之前有写，不过这次趁着刚买了新服务器部署下项目
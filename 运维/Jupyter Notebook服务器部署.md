# <center>Jupyter Notebook服务器部署</center>

[TOC]

> 步骤
>
> - 使用anaconda安装jupyter
> - jupyter配置文件更改
> - supervisorctl管理进程
> - nginx转发端口

## 一.  linux服务器安装anaconda

### 1.下载

Python3

```bash
$ wget https://repo.continuum.io/archive/Anaconda3-4.2.0-Linux-x86_64.sh  # 64位系统
$ wget https://repo.continuum.io/archive/Anaconda3-4.2.0-Linux-x86.sh     # 32位系统
```

python2

```bash
$ wget https://repo.continuum.io/archive/Anaconda2-4.2.0-Linux-x86_64.sh  # 64位系统
$ wget https://repo.continuum.io/archive/Anaconda2-4.2.0-Linux-x86.sh     # 32位系统
```

一路yes

### 2.安装

```bash
bash Anaconda3-4.2.0-Linux-x86_64.sh # 安装上面下载的文件
```

### 3.激活环境

```bash
source ~/.bashrc # 设置环境变量
```

### 4.成功测试

```bash
conda list
```

看看是否列出安装的包, 如果出现下面问题

<center><img src="http://qiniu.s001.xin/4xk2j.jpg" width=550></center>

**conda: command not found**

手动添加环境变量至`～/.bashrc`文件

`echo 'export PATH="/home/ubuntu/anaconda3/bin:$PATH"' >> ~/.bashrc`

## 二.  jupyter配置

执行`jupyter notebook --generate-config`命令生成默认配置

```bash
cd ~/.jupyter
vi jupyter_notebook_config.py
```

将下面配置加进去，保存退出

```python
c = get_config()
c.IPKernelApp.pylab = "inline"
c.NotebookApp.allow_remote_access = True
c.NotebookApp.ip = "127.0.0.1"
c.NotebookAPp.open_browser = False
c.NotebookApp.password = 'sha1:899435c111d5:563f0a8cb0b3149367c7ec96eb2d59514ccc7e6c'
c.NotebookApp.certfile = '/home/ubuntu/.jupyter/mycert.pem'
c.NotebookApp.port= 8888
# 需创建
c.NotebookApp.notebook_dir = "/home/ubuntu/.jupyter/ipython"
# 允许开启终端
c.NotebookApp.terminals_enabled = True
```

**配置解释**

open_browser 执行启动命令不打开浏览器

prot 指定端口

notebook_dir  指定启动后显示文件的目录

certfile 密钥文件

```bash
# 进入.jupyter目录,用下面命令生成 
openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mycert.pem -out mycert.pem
```

password sha1加密后的密码

```bash
# 终端执行下面命令 输入密码,将返回的值复制
python -c "import IPython;print IPython.lib.passwd()"
```

<br>

## 三.  supervisor管理进程

### 1. 添加配置

修改`/etc/supervisor/supervisord.conf`文件

最后一行 追加

```ini
[program:jupyter]
command=/home/ubuntu/anaconda3/bin/jupyter notebook
directory=/home/ubuntu
redirect_stderr=true
stdout_logfile=/tmp/jupyter.log
```

- command 是执行的命令 `jupyter`命令要为命令根路径,可以通过`which`命令查看路径

  <center><img src="http://qiniu.s001.xin/suomd.jpg" width=500></center>

- directory 是命令执行的目录

- stdout_logfile 日志存放位置,名字最好与program名一致

### 2.启动

```bash
$ supervisorctl
supervisor> update
supervisor> status
```

状态为running则为正常运行

<br>

## 四.  nginx挂载

```bash
cd /etc/nginx/sites-available
sudo touch jupyter
sudo vi jupyter
```

添加下面配置转发8888端口到80

```
server {
    listen      80;
    server_name domain.com;
    location / {
        proxy_pass https://127.0.0.1:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

`:wq`保存退出

```bash
$ ln -s /etc/nginx/sites-available/jupyter /etc/nginx/sites-enabled
$ sudo nginx -s reload
```

大功告成~

<br>

## 附录:

### 1. 浏览器打开的jupyter中安装扩展包(pypi)

> 这就是为什么弃用pip安装，而拥抱conda的原因。 需求就是可以在浏览器下载pip可以安装的包

```bash
$ conda install nb_conda
```

<center><img src="http://qiniu.s001.xin/ztkgn.jpg" width=600></center>

### 2.外部扩展

```bash
$ pip install jupyter_nbextensions_configurator jupyter_contrib_nbextensions
$ jupyter contrib nbextension install --user --skip-running-check

```



## 遇到的坑

**1.打开页面502错误**

```bash
# 我用nginx将8888端口转发到443，即https协议上，
# 转发时的proxy_pass必须是https://127.0.0.1:8888
server {
    listen 443;
    server_name ju.ultrabear.com.cn;
    ssl on;
    ssl_certificate   cert/1_ju.ultrabear.com.cn_bundle.crt;
    ssl_certificate_key  cert/2_ju.ultrabear.com.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;

    location / {
        # 是https，不是http
        proxy_pass https://127.0.0.1:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

}
```

**2.打开页面403，查看控制台资源文件找不到**

```bash
# jupyter配置文件添加这句
c.NotebookApp.allow_remote_access = True
```

**3.jupyter启动后 访问浏览器里边的终端打不开**

```bash
# google一番发现了问题,nginx配置添加
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";

# 像这样
location / {
        proxy_pass https://127.0.0.1:8888;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

    }
```

**4.使用anaconda安装jupyter启动报错**

`ImportError: libsodium.so.23: cannot open shared object file: No such file or directory`

解决

```bash
conda install -c conda-forge libsodium
```

**5.新建项目时 500错误**

解决

```bash
conda install jupyterhub
```


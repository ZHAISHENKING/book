pip安装各种坑

### 1.下载过慢

```bash
cd ~/.pip
```

如果没有，就创建.pip目录,之后创建`pip.conf`文件

```bash
vim ~/.pip/pip.conf
```

编辑，修改源

```ini
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
```

也可以改为其他源

```
  阿里云 http://mirrors.aliyun.com/pypi/simple/ 
  中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/ 
  豆瓣(douban) http://pypi.douban.com/simple/ 
  清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/ 
  中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/
```

### 2.下载flask-mongoengine时出错

即使修改了源,在下载flask-mongoengine时，因为还有其他的依赖，所以还是下载不下来，到100%就卡住不动

可以先把依赖装好，之后再试

```bash
pip install rednose
pip install nose
pip install coverage
pip install flask-mongoengine
```

### 3.python2/3版本支持问题

这块建议使用`pyenv`来管理python版本

因为不管是用软连接指向或者修改默认配置都没有一个命令修改默认版本来的快

安装配置

```bash
#1 安装pyenv，在命令行下键入：
$ curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
#2 将安装路径写入~/.bashrc,没有就创建
 echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
 echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
 echo 'eval "$(pyenv init -)"' >> ~/.bashrc
$ source  ~/.bashrc  #配置立刻生效
```

使用

```bash
#1.查看pyenv当前支持哪些Python版本
python@ubuntu:~$ pyenv install --list
Available versions:
  2.1.3
  2.2.3
  2.3.7
  ...
  
#2.列出pyenv中所有可用的python版本
python@ubuntu:~$ pyenv versions
  system
  3.5.4
* 3.6.4 (set by /home/python/.pyenv/version)  # *表示当前使用的3.6.4版本

#3.选择指定的python版本
python@ubuntu:~$ pyenv global 3.5.4  #设置指定的版本
python@ubuntu:~$ python  
Python 3.5.4 (default, Mar 29 2018, 11:02:03)  #已经切换到了3.5.4
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 
切换Python版本以后，与版本相关的依赖也会一起切换。因此，我们不用担心不同的版本在系统中是否会相互干扰。

#4. 删除指定python版本
python@ubuntu:~$ pyenv uninstall 3.5.4
pyenv: remove /home/python/.pyenv/versions/3.5.4? y
python@ubuntu:~$ pyenv versions
  system
* 3.6.4 (set by /home/python/.pyenv/version)
```

安装python版本

```bash
# 由于直接安装从github上拉太慢，先下载包后安装
$ cd ~/.pyenv
$ sudo mkdir cache
$ wget http://mirrors.sohu.com/python/3.6.4/Python-3.6.4.tar.xz -P  ~/.pyenv/cache/
$ pyenv install 3.6.4 -v
$ wget http://mirrors.sohu.com/python/2.7.12/Python-2.7.12.tar.xz -P  ~/.pyenv/cache/
$ pyenv install 2.7.12 -v
#3.更新pyenv数据库
   $ pyenv rehash
#4.列出所安装的python版本
   $ pyenv versions
#5.切换python版本
   $ pyenv  global 3.6.4
#6.验证版本
   $ python
```


# LinuxPro（二）

[TOC]

### 配置主机名称

为了便于在局域网中查找某台特定的主机，或者对主机进行区分，除了要有 IP 地址外，
还要为主机配置一个主机名，主机之间可以通过这个类似于域名的名称来相互访问

主机名大多保存在`/etc/hostname`中

修改主机名

<img src="http://qiniu.s001.xin/z72o3.jpg" width="600">

进入，修改

<img src="http://qiniu.s001.xin/qmejb.jpg" width="700">

:wq保存退出

修改后不会立即生效,重启下

```bash
sudo reboot
```

<img src="http://qiniu.s001.xin/mlh8f.jpg" width="500">

### 配置网卡

网卡 IP 地址配置的是否正确是两台服务器是否可以相互通信的前提。在 Linux 系统中，
一切都是文件，因此配置网络服务的工作其实就是在编辑网卡配置文件		

在 RHEL 5、RHEL 6 中，网卡配置文件的前缀为 eth，第 1 块网卡为
eth0，第 2 块网卡为 eth1;以此类推。而在 RHEL 7 中，网卡配置文件的前缀则以 ifcfg 开始，
加上网卡名称共同组成了网卡配置文件的名字，例如 ifcfg-eno16777736;好在除了文件名变
化外也没有其他大的区别。		

现在有一个名称为 ifcfg-eno16777736 的网卡设备，我们将其配置为开机自启动，并且 IP
地址、子网、网关等信息由人工指定，其步骤应该如下所示。

1.切换到`/etc/sysconfig/network-scripts`目录中（存放网卡的配置文件）

2.vim编辑网卡文件写入下面配置（每台设备硬件及架构不同，因此使用ifconfig命令确认网卡默认名称）

<img src="http://qiniu.s001.xin/54wds.jpg" width="500">

3.重启网络服务并测试网络连接

```bash
cd /etc/sysconfig/network-scripts
vim ifcfg-eno16777736
```

<img src="http://qiniu.s001.xin/5j6et.jpg" width="700">

。。。我照着操作没找到`sysconfig`目录，网卡信息也有些不一样，就先不操作这个了

			

### 编写SHELL脚本

> 面试里可能会出现让在bash里输出个列表什么的，被问到我也是一脸蒙蔽，接着往下看吧

shell脚本命令的工作方式有两种

- 交互式: 用户每输入一条命令就立即执行
- 批处理: 编好一个完整脚本，一次性执行

先写个简单的

创建个目录来存放写的脚本

<img src="http://qiniu.s001.xin/8ak2b.jpg" width="500">

输入下面语句，保存退出

<img src="http://qiniu.s001.xin/g7cuj.jpg">

运行`bash example.sh`

<img src="http://qiniu.s001.xin/5qiqd.jpg" width="600">

也可以通过`./example.sh`来执行
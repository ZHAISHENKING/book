# Linux Pro

> 熟悉些运维命令或是管道等骚操作，慢慢深入，慢慢更新
>
> 适用人群：了解基础命令，想来看看其他命令有什么奇淫技巧可以挖掘的人

目录

[TOC]

### 感觉比较常用或有用的liunx命令

```bash
# 一年中的第几天
date "+%j"

# 下载文件
wget
	-c 断点续传
	-p 页面资源下载
	-r 递归
	-P 指定下载目录
	-b 后台下载
	
# 查看进程
ps
	-a	所有进程
	-u	用户及其他信息
	-x	未控制终端的进程
# top 动态监视进程活动与系统负载
top

# pidof 查询某个指定服务进程的id
# 例：
pidof sshd
> 2156

# 杀死进程
kill pid
# 杀死httpd服务的所有进程（包括子进程）
killall httpd
```

Liunx中，5中常见进程状态

```bash
R	运行
S	中断
D	不可中断
Z	僵死（进程已停止 描述符仍在）
T	停止
```

![](http://qiniu.s001.xin/o3dfc.jpg)

### 运维相关

运维人员最基本要了解的是服务器的

- 网卡网络
- 系统内核
- 系统内核
- 系统负载
- 内存使用情况
- 当前启动终端数量
- 历史登录记录
- 命令执行记录
- 救援诊断

1 `ifconfig`

用于获取网卡配置及网络状态，主要看网卡名称。ip地址,ether参数后边的网卡地址以及RX\TX的数据接收包和发送数据包的个数及累计流量

2 uname

查看系统内核和系统版本

<img src="http://qiniu.s001.xin/4jfd8.jpg">

当前系统的内核名称、主机名、内核发行版本、节点名、系统时间、硬件名称、硬件平台、处理器类型及操作系统

3 uptime

查看系统的负载信息、格式为uptime

<img src="http://qiniu.s001.xin/hsexq.jpg">

系统当前时间、系统已运行时间、启用终端数量、平均负载

4 free

显示当前系统中内存使用量`free [-h]`

mac没有这个命令。。

<img src="http://qiniu.s001.xin/460in.jpg">

<img src="http://qiniu.s001.xin/wurgo.jpg">

5 who

查看当前登入主机的用户终端信息

用户名、终端设备、登入时间

6 last

查看所有系统登录记录	很容易被篡改

7 `history`

显示历史执行过的命令，默认是1000条，可以通过自定义`/etc/profile`中HISRTSIZE变量值来修改

也可以通过`![num]`来执行某条命令

`history -c`清空

8 sosreport

收集系统配置及架构信息并输出诊断文档、格式为socreport

加粗的部分是收集好的资料压缩 文件以及校验码，出现问题时将其发送给技术支持人员即可: 

<img src="http://qiniu.s001.xin/eenrz.jpg">

**工作目录切换命令**

1. pwd

   查看当前所处的目录

2. ls -ld

   查看指定目录信息

   <img src="http://qiniu.s001.xin/ym2ut.jpg">

**文本文件编辑命令**

1. more

   查看内容较多的纯文本文件

2. tail

   实时查看最新日志文件 `tail -f 文件名`

3. `tr`

   替换文本文件中的字符`tr[old][new]`

   <img src="http://qiniu.s001.xin/9zyco.jpg">

4. wc

   统计指定文本行数、字数、字节数`wc[参数]文本`

   <img src="http://qiniu.s001.xin/4s8ij.jpg">

   统计系统当前有多少用户

   <img src="http://qiniu.s001.xin/xxu4s.jpg">

5. stat

   查看文件具体存储信息和时间

   <img src="http://qiniu.s001.xin/xeth6.jpg">

6. `cut`

   按列提取文本`cut[参数]文本`

   列出系统中的用户名

   <img src="http://qiniu.s001.xin/l0j1w.jpg">

7. dd

   复制或转换指定大小的文件

   <img src="http://qiniu.s001.xin/fkznh.jpg">

   生成一个大小500M,名为x_file的文件

   <img src="http://qiniu.s001.xin/f61pt.jpg">

8. file

   查看文件类型 `file 文件名`

**打包压缩**

1. `tar`

   <img src="http://qiniu.s001.xin/6ot63.jpg">

   注: -f参数必须放在最后一位,是压缩或解压的软件包名

   常用做法:

   `tar -czvf 压缩包名.tar.gz 打包目录`

   `tar -xzvf 压缩包名.tar.gz`

2. `grep`

   关键词搜索

   <img src="http://qiniu.s001.xin/th1bt.jpg">

   工作中常用两个参数  -v 反选 -n 显示行号

3. find

   查找。。这个是最常用但是最不会用的命令了

   `find [查找路径] 寻找条件 操作`

   <img src="http://qiniu.s001.xin/g1ho2.jpg">

   <img src="http://qiniu.s001.xin/016hh.jpg">

   **重点**说明一下 -exec参数，类似于管道操作

   获取该目录中所有以host开头的文件列表

   <img src="http://qiniu.s001.xin/69s6o.jpg" width="500">

   <img src="http://qiniu.s001.xin/5jbo0.jpg">

### 管道符、重定向、环境变量

> 这块应该算是重点了，用好了会达到事半功倍的效果

**重定向**

<img src="http://qiniu.s001.xin/bh5ck.jpg">

这块给我的感觉像是日志，错误输出、标准输出等等

<img src="http://qiniu.s001.xin/998br.jpg">

例：man bash > readme.txt

标准输出重定向   将打印内容写入readme.txt

覆盖 

<img src="http://qiniu.s001.xin/7fef8.jpg" width="500">

追加

<img src="http://qiniu.s001.xin/syb1f.jpg" width="500">

写入报错信息

ls -l xxx 2> xxx

<img src="http://qiniu.s001.xin/flwln.jpg">

**管道**

命令A | 命令B

用翻页的方式查看

`ls -l /etc/ | more`

通过把管道符和 passwd 命令的--stdin 参数相结合，我们可以用一条 命令来完成密码重置操作 

`echo "linuxprobe" | passwd --stdin root `

**通配符**

这个像是正则，很容易理解

<img src="http://qiniu.s001.xin/17iqm.jpg">

**最常用的转义字符**

<img src="http://qiniu.s001.xin/2hlsd.jpg" width="500">

<img src="http://qiniu.s001.xin/cyl16.jpg" width="500">

需要某个命令的输出值时,可以使用``将命令包起来

<img src="http://qiniu.s001.xin/qhkbl.jpg">





===============

待更,困了

===============




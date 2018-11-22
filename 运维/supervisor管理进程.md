### supervisor管理进程

配置文件位置:  `/etc/supervisord.conf`

进程

```Ini
; 命令格式[program:程序名称]
[program:discovery1]
; 运行的命令，注意命令的路径要写全
command=/usr/bin/python mongo
; 你运行命令的时候所在的目录
directory=/home/ubuntu/test
; 把stderr(报错信息)重定向至标准输出
redirect_stderr=true         
; 把标准输出重定向到/tmp/discovery1.log文件
stdout_logfile=/tmp/discovery1.log     

; 定义一个程序组
[group:spiders]
# 定义该组有哪些程序，对应上面program的名字
programs=discovery1
```

启动

`supervisord`

杀死进程，关闭supervisord

```bash
ps -e|grep super|awk '{print $1}'|xargs kill -9
```



Nginx配置

配置文件 

`/etc/nginx.conf`

```bash
# http
client_max_body_size 75m;
```


# 安装tinyproxy

安装

```bash
# centos
sudo yum install tinyproxy
# ubuntu
sudo apt install tinyproxy
```

打开配置文件

```bash
vim /etc/tinyproxy/tinyproxy.conf
```

搜索并修改以下配置

```
# 注释掉这一行
# Allow 127.0.0.1
# 修改端口号
Port 1801
```

修改完了保存退出

重启服务：

```bash
systemctl restart tinyproxy
```

日志文件的路径：

> /var/log/tinyproxy/tinyproxy.log


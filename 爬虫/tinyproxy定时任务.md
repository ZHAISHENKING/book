

```bash
crontab -e
# 初次使用选择vim
# 退出
# 确认没有问题后再打开
systemctl restart tinyproxy
crontab -e
```

在最后一行添加

```bash
*/5 * * * * systemctl restart tinyproxy
```

保存退出

```bash
# 查看刚才添加的代码
crontab -l
```






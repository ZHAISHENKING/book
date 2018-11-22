服务器间/本地远程服务器免密登陆

```bash
# 生成密钥对
ssh-keygen
# 进入.ssh文件夹下查看密钥
cd ~/.ssh/
# 使用scp传输将本机公钥传给另一台主机
scp id_rsa.pub user@xx.xx.xx.xx:~/
# 登录另一台主机将传过来的公钥写入authorized_keys文件
cat id_rsa.pub >> .ssh/authorized_keys
```




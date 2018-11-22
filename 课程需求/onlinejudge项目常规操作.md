### onlinejudge项目部署

> 注：需改动的文件做好备份

1.前台项目打包

```bash
npm run build
```

2.进入后台项目拉取最新dev分支， 替换`dist`文件，提交分支

```bash
git pull origin dev
rm -rf ./dist
# 新的dist目录拖进去之后
git add .
git commit -m "dist-xxx"
git push origin dev
```

3.进入服务器`ultrabear-online`项目

```bash
cd ~/ultrabear-online
git status
git pull origin dev
git build -t="用户名/镜像名" .
```

4.镜像成功打包，进入`ultrabear-oj`

```bash
cd ~/ultrabear-oj/OnlinejudgeDevlop
# 修改文件
vim docker-compose.yml
```

<center><img src="http://qiniu.s001.xin/zqqef.jpg" width=600></center>

`image`后边的镜像名改为刚才自定义的镜像名

5.`:wq`保存退出

在当前目录下（包含docker-compose.yml文件的目录）执行

`docker-compose up -d`重启项目



### onlinejudge数据备份

```bash
# 进入目录下
cd /home/ubuntu/ultrabear-oj/OnlineJudgeDeploy/backup
# 执行
./db_backup.sh
# 备份结束，目录下多了个最新的sql文件
# 建议将sql文件在其他服务器重新也备份一份
# 传输文件命令
rsync -a -v db_backup_xx.sql root@xx.xx.xx.xx:~/
```


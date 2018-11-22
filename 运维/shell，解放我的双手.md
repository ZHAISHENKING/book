#  shell，解放我的双手

> 这两天才开始接触shell编写脚本，真的是相见恨晚。一个小小的demo，就节省了我很多时间



web后端，应用场景:

<font color=red>前后端项目都在git上托管，docker部署</font>

<font color=red>每次前端修改之后我都要拉下来，打包、然后覆盖后端项目dist文件，再git push，部署</font>

<font color=red>真的累了</font>

直到...

```sh
#!/bin/sh

cd /Users/mac/WebstormProjects/fontend/
git pull origin master && echo "拉取成功"
sleep 5
cd /Users/mac/PycharmProjects/flask/backend
rm -rf dist/
cp -R /Users/mac/WebstormProjects/fontend/dist ./
echo "拷贝成功"
echo "-----准备提交-----"
git add .
git commit -m $1
echo "git 提交注释：$1"
git push origin dev
echo "-----提交结束-----"
```

脚本内容就不一一解释了，

就是后端经常在命令行里敲的，只是集中起来放到一个.sh文件里

就上面一个脚本，执行一次，就省去了自己操作的那么多时间



操作流程

```bash
# 创建shell脚本
touch run.sh
# 输入自己要执行的命令
vim run.sh
# :wq保存退出
# 更改脚本权限为可执行
sudo chmod +x run.sh
# 运行
./run.sh
```



<font color=red>以后多学些其他知识，提升工作效率</font>


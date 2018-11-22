# 多人协作项目git免密登录

> 多人协作时一个服务器免不了放很多项目，在不能git config --global全局设置git用户或者密钥免密时，
>
> 可以在你负责的项目目录下执行操作来实现免密登录

在项目根目录下创建`.git-credentials`文件

```shell
https://username:password@git端项目目录(可以直接git clone的那个地址)
```

:wq退出

当前目录下执行`git config credential.helper store`

执行git pull命令测试是否免密(设置首次可能需要输入密码)

⚠️**注意**:

保存好之后在`.gitignore`文件中将.git-credentials文件名添加进去，避免上传到公开项目


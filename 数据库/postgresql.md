# redis和postgres安装

### redis

```bash
# 安装
apt-get install redis-server
```

打开配置文件. `/etc/redis/redis.conf`，将daemonize属性改为yes（表明需要在后台运行）

后台启动

```bash
redis-server /erc/redis/redis.conf
```

运行`redis-cli`查看是否配置成功

<center><img src="http://qiniu.s001.xin/phoww.jpg" width=600></center>



### postgresql

```bash
apt-get install postgresql
```

**启动**

```bash
/etc/init.d/postgresql start
```

**修改密码**

说明：postgresql安装之后有个默认用户`postgres`,密码随机发放，所以首先修改密码

```bash
# 删除原密码
sudo passwd -d postgres
# passwd: password expiry information changed.
# 更新密码
sudo -u postgres passwd
# passwd: password updated successfully
```

进入`/etc/postgresql/9.5/main/pg_hba.conf`修改

```ini
# "local" is for Unix domain socket connections only
local   all             all                           trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# Allow replication connections from localhost, by a user with the
# replication privilege.
#local   replication     postgres                                peer
#host    replication     postgres        127.0.0.1/32            md5

#host    replication     postgres        ::1/128                 md5

host    all     your_database_name        your_ip/32   md5

```

**放开访问权限**

1. 修改`pg_hba.conf`文件

<center><img src="http://qiniu.s001.xin/8jghf.jpg" width=600></center>

2. 修改`postgresql.conf`文件

<center><img src="http://qiniu.s001.xin/o3qyu.jpg" width=600></center>

**进入数据库创建用户和数据库**

<center><img src="http://qiniu.s001.xin/9s5kz.jpg" width=600></center>

查看库`\l`

<center>
    <img src="http://qiniu.s001.xin/w1c6g.jpg" width="600">
</center>

切换表 `\c tablename`

<center><img src="http://qiniu.s001.xin/4duv4.jpg" width=600></center>

查看表 `\dt`

查看用户 `\du`

修改数据库用户密码

`ALTER USER postgres WITH PASSWORD 'password';`

退出 `\q`

### docker中的postgresql操作

```bash
# 基础命令
# 导入数据库
docker exec 9721ad9c8b8e psql -U onlinejudge onlinejudge < /root/db_backup_2018_08_22_16_39_20.sql
# 导出数据库
pg_dump -h 192.168.100.110 -p 5432 -U user1 -x -s -f dump.sql postgres
# 交互模式进入数据库
docker exec -it 9721ad9c8b8e psql -U onlinejudge onlinejudge

# 删除所有表
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
# 恢复默认授权
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

清除postgresql表中所有数据

```ini
# 清除表中所有数据
CREATE OR REPLACE FUNCTION truncate_tables(username IN VARCHAR) RETURNS void AS $$
DECLARE
    statements CURSOR FOR
        SELECT tablename FROM pg_tables
        WHERE tableowner = username AND schemaname = 'public';
BEGIN
    FOR stmt IN statements LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(stmt.tablename) || ' CASCADE;';
    END LOOP;
END;
$$ LANGUAGE plpgsql;
# 执行
SELECT truncate_tables('MYUSER');
```




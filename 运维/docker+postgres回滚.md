# docker+postgresql备份、回滚数据

使用pg_restore遇到的错误

```shell
pg_restore: [archiver] input file does not appear to be a valid archive

the input device is not a TTY
read unix @->/var/run/docker.sock: read: connection reset by peer
Segmentation fault (core dumped)
```

```bash
# 备份
docker exec oj-postgres pg_dump -U onlinejudge -F t onlinejudge > d.sql
# 恢复
docker exec -i oj-postgres pg_restore -a -U onlinejudge -F t -d onlinejudge < d.sql
# 进入正在运行中的数据库
docker exec -it oj-postgres psql -U onlinejudge onlinejudge

# 删除所有表
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

服务器操作步骤

```bash
$PWD/data/postgres:/var/lib/postgresql/data:z
# 1.修改docker-compose.yml，重启
# 2.交互模式进入数据库
docker exec -it oj-postgres psql -U onlinejudge onlinejudge
# 3.删除所有表
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
# 4.恢复
docker exec -i oj-postgres pg_restore -U onlinejudge -F t -d onlinejudge < ~/oj-build/d.sql
```


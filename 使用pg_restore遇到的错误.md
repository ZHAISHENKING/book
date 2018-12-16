使用pg_restore遇到的错误

```shell
pg_restore: [archiver] input file does not appear to be a valid archive

the input device is not a TTY
read unix @->/var/run/docker.sock: read: connection reset by peer
Segmentation fault (core dumped)
```

```bash
# 备份
docker exec 0193adde6738 pg_dump -U onlinejudge -F t onlinejudge > d.sql
# 恢复
docker exec -i oj-postgres pg_restore -a -U onlinejudge -F t -d onlinejudge < d.sql
# 进入正在运行中的数据库
docker exec -it oj-postgres psql -U onlinejudge onlinejudge

# 删除所有表
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

步骤

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



```ini
# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;
	
	upstream webservers {
    	server localhost:5000 weight=1; #域名设置
	}
    server {
        listen       80;
        server_name  locahost; # 域名设置
        access_log   /usr/local/nginx/logs/walle.log main;
        index index.html index.htm; # 日志目录

        location / {
            try_files $uri $uri/ /index.html;
            add_header access-control-allow-origin *;
            root /walle-web/fe; # 前端代码
        }

        location ^~ /api/ {
            add_header access-control-allow-origin *;
            proxy_pass      http://webservers;
            proxy_set_header X-Forwarded-Host $host:$server_port;
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_set_header    Origin        $host:$server_port;
            proxy_set_header    Referer       $host:$server_port;
        }

        location ^~ /socket.io/ {
            add_header access-control-allow-origin *;
            proxy_pass      http://webservers;
            proxy_set_header X-Forwarded-Host $host:$server_port;
            proxy_set_header  X-Real-IP  $remote_addr;
            proxy_set_header    Origin        $host:$server_port;
            proxy_set_header    Referer       $host:$server_port;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;

            # WebScoket Support
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }

}

```


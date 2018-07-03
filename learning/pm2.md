<!DOCTYPE html>
## pm2

### 
- 安装pm2 npm i pm2 -g
- app: - script: .server/server.js // 启动项目运行的文件 
  name: vue-todo // 查看服务日志需要的名字 
  env_production: // 启动服务后，会作为环境变量传进去 
    NODE_ENV: production 
    HOST: localhost 
    PORT: 8880 


- 启动命令： pm2 start pm2.yml --env production
- 重启： pm2 restart vue-todo
- 关闭： pm2 stop vue-todo
- 打印日志： pm2 log vue-todo

- ssh root@jokcy.me ssh 连接自己服务器

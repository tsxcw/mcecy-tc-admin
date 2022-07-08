# 创次元图床后台管理系统

****

**vue2+element-ui**
1，新建网站，创建一个目录作为前端程序目录。

2，安装依赖，启动。`npm run dev`

3，修改程序接口，轻修改.env.production 文件中的 VUE_APP_BASE_API 为您部署的后端的域
名**https://api.xx.cn/admin**。

4，打包，运行 `npm run build `打包完成后请上传至您的网站即可。

5，将网站运行目录改为 dist。

6，启动后默认账号密码 admin，密码：123456

7，前往设置中心设置相关腾讯信息，cos 等非必要，注册方式至少要有一个。

宝塔新建网站，不要选择 php 环境。选择纯静态网站，

前端和后台管理 nginx 配置
```
   location /
    {
        try_files $uri $uri/ /index.html?$args;
    }
```

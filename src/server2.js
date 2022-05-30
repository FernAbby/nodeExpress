const express = require('express');
const app = express();

// 在所有路由前增加，可以拦截所有请求
app.all("*", (req, res, next) => {
    // 允许的header类型 服务端Access-Control-Allow-Origin不能设置为*号，必须制定明确的域名，不然cookie还是无效
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:9527');
    // 可以带cookies
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/userList', (req, res) => {
    console.log('cookie===>', req.headers.cookie);
    res.jsonp([{ name: '张三', age: 18 }, { name: '李四', age: 20 }]);
});

// 4 监听端口
app.listen('9528',() => {
    console.log("服务已经启动，9528端口监听...");
});

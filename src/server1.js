const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const app = express();

const server = new WebSocket.Server({ port: 8001 });

server.on('connection', function(socket) {
    socket.on('message', function(data) {
        socket.send(`我收到你的消息[${data}]，这是我的回信`);
    });
});

app.get('/login', (req, res) => {
    res.cookie('token', '1234567890', { maxAge: 2000000, httpOnly: true })
    res.json({ code: 0, message: '登录成功' });
});

app.get('/user', (req, res) => {
    const token = req.headers.cookie.split('=')[1];
    console.log('cookie', req.headers.cookie, token);
    res.json({ code: 0, message: '查询用户成功' });
});

app.post('/file_upload', (req, res) => {
    console.log('file', req);
    res.json({ code: 0, message: '上传成功' });
});

// 托管`index.html`页面
// 在`index.html`中发起的请求，默认的源就是`http://localhost:9527`
// 然后再去请求`http://localhost:9528`就会出现跨域了
app.use('/static', express.static(path.resolve(__dirname, '../public')));

app.listen('9527', () => {
    console.log('服务已经启动，9527端口监听...');
});


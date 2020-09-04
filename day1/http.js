const http = require('http')
const server = http.createServer()
server.on('request', function(req, res) {
    //交互是双方的，可进行获取IP地址的操作
    console.log('请求我的客户端地址是：', req.socket.remoteAddress, req.socket.remotePort);
    let url = req.url
    console.log("已收到客户端请求" + url);
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    if (url === '/') {

        res.end("我是主页，一般主页都这样来写 index page")
    } else if (url === '/register') {
        res.end("我是注册")
    } else if (url === '/login') {
        res.end('我是注册')
    } else {
        res.end("404 no found")
    }
})
server.listen(3000, function() {
    console.log("服务器启动成功");
})
/**
 * 加载模块
 * express:一种框架
 * bodyParser:针对post请求，拿相应的对象，格式为.json{{}}
 */
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

//赋值框架内容
var app = express()
    /**
     * ???
     * 这几句的具体含义不太了解
     */
app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
    //???加载、启动服务器
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//挂载路由
app.use(router)

app.listen(3000, function() {
    console.log('running 3000...');
})

//????模块化加载，不知道为啥要加载
module.exports = app
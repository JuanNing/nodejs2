var express = require('express')
var app = express()

//开放某个资源的情况，可通过url访问
app.use('/a/', express.static('a')) //有两个/资源名/
    /**
     * 不支持超出项目范围的访问资源,同级才可以访问
     * app.use('/day1/', express.static('./day1/')) //有两个/资源名/
     */

app.engine('html', require('express-art-template'))
app.set('views', 'a')
app.get('/', function(req, res) {
    res.render('aa.html', {
            title: '你好'
        })
        // res.send('hello,express')
})


app.get('/about', function(req, res) {
    res.send('关于我...')
})
app.listen(3000, function() {
    console.log("server is running.xxx..");
})
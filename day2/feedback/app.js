var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')
var comments = [{
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]

http
    .createServer(function(req, res) {
        var parseObj = url.parse(req.url, true)
        var pathname = parseObj.pathname //此处的pathname应该指的是，127.0.0.0:3000后面的内容
        if (pathname === '/') {
            fs.readFile('./view/index.html', function(err, data) {
                if (err) {
                    return res.end('404 Not Found.') //都需要加上return,否则会直接一直往下进行
                }
                var tem = template.render(data.toString(), {
                        comments: comments
                    }) //需要接受且返回end
                res.end(tem) //最后结束语，理应放在最后
                    //这个地方怎么判断是否应该改为string类型？
            })
        } else if (pathname === '/pinglun') {
            res.setHeader('Content-Type', 'text/plain;charset=utf-8');
            // res.end(JSON.stringify(parseObj.query))
            var comment = parseObj.query
            comment.date = '2020-8-6 11:26'
            comments.push(comment)
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end() //这个地方不再需要通过end返回数据到首页，后台自动已添加到数组中

        } else if (pathname === '/post') {
            fs.readFile('./view/post.html', function(err, data) {
                if (err) {
                    return res.end('404 Not Found.') //都需要加上return,否则会直接一直往下进行
                }
                res.end(data) //这个地方怎么判断是否应该改为string类型？

            })

        } else if (pathname.indexOf('/public/') === 0) {
            //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
            fs.readFile('.' + pathname, function(err, data) { //采用了相对目录方法，调用当前目录下的内容
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else {
            fs.readFile('./view/404.html', function(err, data) {
                return res.end('404 Not Found.')
            })
        }
    })
    .listen(8000, function() {
        console.log("running...");
    })
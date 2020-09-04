//不使用app.use()
/**
 * 不使用app.get('/students/new',function(req,res){
 * })，传统启用路由的方式
 * 用新的express里面包装的方法 express.Router()
 */
var express = require('express')
var router = express.Router()
var Student = require('./student')

/**
 * 所有平行接口router接管
 */

//1渲染首页
/**
 * 基本数据的渲染，一进首页就能看得到的
 */
router.get('/students', function(req, res) {
    Student.find(function(err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('index.html', {
            fruits: [
                '苹果',
                '香蕉',
                '桃子'
            ],
            students: data
        })
    })
})

//2渲染添加学生页面--只有编辑页面
/**
 * 将空白添加学生数据的页面渲染（加载）出来
 */
//?????不懂render（）方法的含义
router.get('/students/new', function(req, res) {
    res.render('new.html')
})

//3处理添加学生请求
/**
 * 类似于保存数据
 * 1.获取表单数据，需要将数据填写进之后，
 * 2.将数据存储到db.json文件中，
 * 3.发送响应，之后渲染到首页（添加的数据显示在首页）
 */
/**
 * 对于处理的数据，回调函数参数只有err即可，不需要data，用不到
 */
router.post('/students/new', function(req, res) {
    Student.save(req.body, function(err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        /**
         * 跳转回页面
         *  res.redirect('index.html')，
         * 应该是正确的路由地址，即文件地址
         */
        res.redirect('/students')
    })
})

//4渲染编辑页面--包含指定的选项的数据返回渲染
/**
 * 1.指定选项返回其数据
 *      通过指定搜索其编号，在数据库db.json文件中查找
 * 2.将编辑后的数据，存储到db.json文件中
 * 3.首页渲染并跳转
 */
router.get('/students/edit', function(req, res) {
    Student.findById(req.query.id, function(err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: data
        })
    })
})

//5处理编辑请求
/**
 * 1.将修改好的数据重新存储到db.json文件中
 * 2.发送响应，首页返回渲染
 * ???怎么发送请求
 * req.query.id:只传id
 * req.body：只传对象，一条数据
 * 
 */
router.post('/students/edit', function(req, res) {
    Student.updateById(req.body, function(err, data) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

//6处理删除请求
/**
 * 好像直接在首页点击删除按钮即可？
 * 不太需要delete路由吧？
 * 除非是有提示之类的东西
 */
router.get('/students/delete', function(req, res) {
    console.log('req.query.id' + ':' + req.query.id);
    console.log('req.body:' + req.body);
    // res.redirect('/students')
    Student.deleteById(req.query.id, function(err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

//导出接口
module.exports = router
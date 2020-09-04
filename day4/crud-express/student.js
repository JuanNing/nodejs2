/**
 * nodejs核心：封装异步API
 */

var fs = require('fs')
const { callbackify } = require('util')
var dbPath = './db.json'
    /**
     * 为啥是'./db.json',为什么不用require
     * ？？？？？？？？？？？？？？？？
     * 这里可只取一个路径，直接在文件夹中取即可
     * require一般引第三方包等
     * var db = require('./db.json')
     */
    /**
     * 
     * @param {*} callback 
     * 这里的回调函数到底是啥？？
     * 回调函数的实体是啥？
     */
exports.find = function(callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
            console.log('加载失败');
        }
        callback(null, JSON.parse(data).students)
    })

}
exports.findById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        var student = JSON.parse(data).students
        var ret = student.find(function(item) {
            // return item.id===id,这个id是字符串，应该转化为int型
            return item.id === parseInt(id)
        })
        callback(null, ret)
    })
}
exports.save = function(student, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        //students指读取json文件的内容
        var students = JSON.parse(data).students
            //student是用户输入的信息，缺少显示的id
            //忘记加第二个id了
        student.id = students[students.length - 1].id + 1

        students.push(student)

        //??????啥意思，把对象数据转换为字符串,
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })

}
exports.updateById = function(stuObj, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        //这个students指从文件拿出的所有数据，类型为json
        var students = JSON.parse(data).students
            //将找到的对应修改数据存储在stu中
        var stu = students.find(function(item) {
                return item.id === parseInt(stuObj.id)
            })
            //将单条数据存储在stu中，遍历
        for (var k in stuObj) {
            stu[k] = stuObj[k]
        }
        //将最终包含更改好的数据文件为json格式，先转为string类型
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })

    })

}
exports.deleteById = function(id, callback) {
    fs.readFile(dbPath, 'utf8', function(err, data) {
        if (err) {
            return callback(err)
        }
        //students为对象
        var students = JSON.parse(data).students

        var deleteId = students.findIndex(function(item) {
            return item.id === parseInt(id)
        })

        // 根据下标从数组中删除对应的学生对象
        //如果仅删除一个元素，则返回一个元素的数组。 如果未删除任何元素，则返回空数组。
        students.splice(deleteId, 1)
            //多练练这一部分？？？？？？
            // 把对象数据转换为字符串
        var fileData = JSON.stringify({
                students: students
            })
            // var fileData = JSON.stringify(students)

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function(err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
}
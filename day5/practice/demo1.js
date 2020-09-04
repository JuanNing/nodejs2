var fs = require('fs')
var dbPath = './db.json'
fs.readFile(dbPath, 'utf8', function(err, data) {
    if (err) {
        return callback(err)
        console.log('加载失败');
    }
    console.log(data);
    // callback(null, JSON.parse(data).students)
})
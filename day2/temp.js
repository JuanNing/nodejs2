var template = require('art-template')
var t = template.render('hello {{name}}', {
    name: 'jack'
})
console.log(t);
$.ajax({
    url: 'dadsf',
    type: 'get',
    data: {
        foo: 'bar'
    },
    success: function() {

    }
})

function ajax(options) {
    options.success(data)
}

/**
 * 数组中，find函数，查找符合条件的item,将其返回;若未找到，则返回undefined
 */
var arr = [10, 4, 5, 23]
arr.find(function(item) {
    return item === 5
})
arr.find(function(item) {
    return item === 11
})

/**
 * find函数，具体原理
 */
var arr = [
    { id: 1, name: 'adc' },
    { id: 2, name: 'adc' },
    { id: 3, name: 'adc' },
    { id: 4, name: 'adc' }
]
Array.prototype.myFind = function(conditionFunc) {
    for (var i = 0; i < this.length; i++) {
        console.log(123);
        if (conditionFunc(this[i], i)) {
            return console.log(this[i])
        }
    }
}
arr.myFind(function(arr, id) { //这个id指的数组下标
    return arr.id === 3
})
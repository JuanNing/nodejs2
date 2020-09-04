// console.log(1);
// setTimeout(function() {
//     console.log(2);
//     console.log('hello');
// }, 1000)
// console.log(3);

function add(x, y, callback) {
    /**
     * var x=10
     * var y=20
     * var callback=function(a){console.log(a)}
     */
    console.log(1);
    setTimeout(function() {
        var ret = x + y
        callback(ret)
    }, 1000)
}

add(10, 20, function(a) {
    console.log(a);
})
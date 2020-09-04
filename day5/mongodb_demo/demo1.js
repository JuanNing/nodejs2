const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
//创建一个模型,类似于集合（mySQL里面的表）
const Cat = mongoose.model('Cat', { name: String });
//往其中插入数据实例，kitty
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
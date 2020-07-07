//引入数据库第三方模块mongoos
const mongoose = require('mongoose')

//连接数据库
mongoose.connect('mongodb://localhost/student', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('数据库连接成功!'))
    .catch(err => console.log('数据库连接失败!!!'))


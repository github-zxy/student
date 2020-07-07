//引入数据库第三方模块mongoos
const mongoose = require('mongoose')

//创建集合规则
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '请输入名字'],
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    age: {
        type: Number,
        minlength: 2,
        maxlength: 100
    },
    sex: {
        type: String
    },
    email: String,
    hobbies: [String],
    collage: String,
    enterDate: {
        type: Date,
        default: Date.now
    }

})

//使用集合规则
const Student = mongoose.model('Student', studentSchema)

//导出学生信息的集合
module.exports = Student
//引入http超文本传输协议
const http = require('http')
//引入router路由
const getRouter = require('router')
//获取路由对象
const router = getRouter()
//引入模板引擎
const template = require('art-template')
//引入path设置绝对路径
const path = require('path')
//引入静态资源访问模块
const serveStatic = require('serve-static')
//实现静态资源访问服务
const serve = serveStatic(path.join(__dirname, './public'))
//引入数组转变对象的模块
const querystring = require('querystring')
//引入dateformat时间更改
const dateFormat = require('dateformat')




//设置路径,配置模板根目录
template.defaults.root = path.join(__dirname, './views')
//取消后缀
template.defaults.extname = '.art'
//设置时间
template.defaults.imports.dateFormat = dateFormat


//创建路由get请求
router.get('/', (req, res) => {
    res.end('Hello Word!')
})
router.get('/add', (req, res) => {
    let html = template('index', ({}))
    res.end(html)
})
router.get('/list', async (req, res) => {
    //查询数据
    let students = await Student.find()
    //测试
    // console.log(students);

    let html = template('list', {
        students: students,
        time: new Date()
    })
    res.end(html)
})
//创建路由post请求
router.post('/add', (req, res) => {
    let formData = ''
    req.on('data', param => {
        formData += param
    })
    req.on('end', async () => {
        await Student.create(querystring.parse(formData))
        res.writeHead(301, {
            Location: '/list'
        })
        res.end()
    })
})


//导入数据库连接
require('./model/connect')
//导入学生信息集合
const Student = require('./model/user')

//创建服务器
const app = http.createServer()

//为服务器添加事件
app.on('request', (req, res) => {
    //启动路由访问
    router(req, res, () => { })
    //启动静态资源访问服务
    serve(req, res, () => { })
})

//服务器监听端口
app.listen(3000)
console.log('服务器启动成功!');

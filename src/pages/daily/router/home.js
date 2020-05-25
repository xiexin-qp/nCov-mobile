/**
 * @des 主页模块路由
 * @key {module} 模块名
 * @key {path} vue组件
 * @key {title} 路由标题
 * @author zhangli
 */

const Home = [
  {
    module: 'home',
    path: 'Login',
    type: 'index',
    keepAlive: true,
    title: '登录'
  },
  {
    module: 'home',
    path: 'Home',
    title: '疫情日报',
    keepAlive: false
  },
  {
    module: 'home',
    path: 'Personal',
    title: '个人中心'
  },
  {
    module: 'home',
    path: 'MyClass',
    title: '我的班级'
  },
  {
    module: 'home',
    path: 'BackSchool',
    title: '返校计划'
  },
  {
    module: 'home',
    path: 'SubmitBack',
    title: '提交返校计划'
  },
]

export default Home
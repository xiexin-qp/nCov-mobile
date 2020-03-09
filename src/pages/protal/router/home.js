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
    path: 'Detail',
    title: '详情'
  }
]

export default Home

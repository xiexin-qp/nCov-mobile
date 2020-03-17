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
    path: 'registerTeacher',
    type: 'index',
    keepAlive: true,
    title: '教职工注册'
  },
  {
    module: 'home',
    path: 'registerParent',
    keepAlive: true,
    title: '家长注册'
  }
]

export default Home

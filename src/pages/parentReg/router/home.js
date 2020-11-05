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
    path: 'registerParent',
    type: 'index',
    keepAlive: true,
    title: '家长注册'
  },
  {
    module: 'home',
    path: 'registerSuccess',
    keepAlive: true,
    title: '注册成功'
  }
]

export default Home

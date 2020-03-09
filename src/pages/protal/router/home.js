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
    path: 'Home',
    type: 'index',
    keepAlive: true,
    title: '首页'
  },
  {
    module: 'home',
    path: 'Detail',
    title: '详情'
  },
  {
    module: 'home',
    path: 'AddReport',
    title: '疫情上报'
  },
  {
    module: 'home',
    path: 'AddStudent',
    title: '疫情上报'
  },
  {
    module: 'home',
    path: 'ReportDetail',
    title: '上报详情'
  }
]

export default Home

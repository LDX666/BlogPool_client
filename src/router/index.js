import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from "../stores/counter";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {//登录页 / 就只有一个/
      path: '/',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {//管理员主页面 /admin开头
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue'),
      children: [
        {//管理员首页
          path: 'home',
          name: '首页',
          component: () => import('../views/admin/Home.vue'),
        },
        {//代号页面
          path: 'code',
          name: '处理器代号',
          component: () => import('../views/admin/Code.vue'),
        },
        {//系列页面
          path: 'series',
          name: '处理器系列',
          component: () => import('../views/admin/Series.vue'),
        },
        {//CPU页面
          path: 'detail',
          name: 'cpu详情',
          component: () => import('../views/admin/Cpu.vue'),
        },
        // {//用户管理界面
        //   path: 'usermanage',
        //   name: '用户管理',
        //   component: () => import('../views/admin/UserManage.vue'),
        // },
        {
          path: 'user',
          name: '用户管理页',
          component: () => import('../views/admin/user_manage/index.vue'),
        },
        {//文章类型管理界面
          path: 'blogtype',
          name: '文章类型管理',
          component: () => import('../views/admin/BlogType.vue'),
        },
        {//文章管理界面
          path: 'blog',
          name: '文章管理',
          component: () => import('../views/admin/Blog.vue'),
        },
        {
          path: 'audit',
          name: '文章审核页面',
          component: () => import('../views/admin/blog_audit/index.vue'),
        },
        {
          path: 'report_blog',
          name: '文章举报管理页面',
          component: () => import('../views/admin/report_blog/index.vue'),
        },
        {
          path: 'report_comment',
          name: '评论举报页面',
          component: () => import('../views/admin/report_comment/index.vue'),
        },
      ]
    },
    {//用户主页面 /home开头
      path: '/home',
      name: '用户主页面',
      component: () => import('../views/User.vue'),
      children: [
        {//用户首页
          path: '',
          name: '首页,或者图片点击页',
          component: () => import('../views/user/Home.vue')
        },
        {//英特尔界面
          path: 'intel',
          name: '英特尔界面',
          component: () => import('../views/user/Intel.vue'),
          children: [{
            path: ':id',
            name: '测试用的',
            component: () => import('../views/user/intel/Main.vue')
          },
          {
            path: '',
            name: '首页,随便选的一个',
            component: () => import('../views/user/intel/Text.vue')
          }
          ]
        },
        {//amd界面
          path: 'amd',
          name: 'amd界面',
          component: () => import('../views/user/Amd.vue')
        },
        {//个人中心界面
          path: 'center',
          name: '用户主页',
          component: () => import('../views/user/center/index.vue'),
          children: [
            {
              path: '',
              name: '用户主页面',
              component: () => import('../views/user/center/User.vue'),
            },
            {
              path: 'blog',
              name: '用户文章管理界面',
              component: () => import('../views/user/center/Main.vue'),
            },
            {
              path: 'editblog',
              name: '用户写文章界面',
              component: () => import('../views/user/center/EditBlog.vue'),
            },
            {
              path: 'personal',
              name: '个人资料界面',
              component: () => import('../views/user/center/PersonalData.vue'),
            },
            {
              path: 'account',
              name: '账号设置',
              component: () => import('../views/user/center/Account.vue'),
            }

          ]
        },
        {//cpu详情页
          path: 'detail/:id',
          name: 'CPU详情界面',
          component: () => import('../views/user/Detail.vue')
        },
        {//首页文章页面
          path: 'article',
          name: '文章界面',
          component: () => import('../views/user/article/index.vue'),
          children: [
            // {
            //   path: '1',
            //   name: '默认进入的页面',
            //   component: () => import('../views/user/article/Main.vue'),
            // },
            {
              path: ':id',
              name: '分类二级页面',
              component: () => import('../views/user/article/Main.vue'),
            }]
        },
        {//文章详情页面
          path: 'blogdetail/:id',
          name: '文章详情界面',
          component: () => import('../views/user/BlogDetail.vue')
        },
        {//修改文章详情页面
          path: 'reviseblog/:id',
          name: '文章修改页面',
          component: () => import('../views/user/ReviseBlog.vue')
        },
        {//其他用户详情页
          path: 'userdetail/:id',
          name: '其他用户详情页',
          component: () => import('../views/user/user_detail/index.vue')
        }
      ]
    }
  ]
})


//const 白名单 = ['/admin','/home','/user']


router.beforeEach((to, from, next) => {
  const 权限管理 = useCounterStore()

  if (to.path.search('/admin') == 0 && 权限管理.权限.状态 == 'admin') {
    console.log('前往管理员页面的值被我匹配到了');
    console.log(to.path);
    console.log(权限管理.权限.状态);
    next()
  } else if (to.path.search('/home') == 0 && 权限管理.权限.状态 == 'user') {
    console.log('前往用户首页的值被我匹配到了');
    console.log(to.path);
    console.log(权限管理.权限.状态);
    next()
  } else if (to.path == '/') {
    console.log('这是登录页');
    next()
  } else {
    ElMessage({ type: 'error', message: '没有权限,请先登录', })
    next({ name: 'login' })
  }
})


export default router

import { createRouter, createWebHistory } from 'vue-router'
import AboutVueView from '@/views/Vue/AboutVueView.vue'
import PracticeView from '@/views/Practice/PracticeView.vue'
import HomeVueView from '@/views/Vue/HomeVueView.vue'
import VueView from '@/views/Vue/VueView.vue'
import HomeView from '@/views/HomeView.vue'
import PageViewer from '@/components/Practice/PageViewer.vue'
import CreatePage from '@/components/Practice/CreatePage.vue'
import PagesManagement from '@/components/Practice/PagesManagement.vue'
import PagesList from '@/components/Practice/PagesList.vue'
import PageEdit from '@/components/Practice/PageEdit.vue'
import { useAuthStore } from '@/stores/authStore'

// route level code-splitting
// this generates a separate chunk (About.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/404',
      component: () => import('@/views/errors/404.vue')
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/index.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/practice',
      name: 'practice',
      component: PracticeView,
      sensitive: true,
      redirect: { name: 'page-viewer', params: { index: '0' } },
      children: [
        {
          path: ':index?',
          name: 'page-viewer',
          component: PageViewer,
          props: true
        },
        {
          path: 'pages',
          component: PagesManagement,
          children: [
            {
              path: '',
              name: 'pages-list',
              component: PagesList
            },
            {
              path: 'create',
              name: 'create-page',
              component: CreatePage
            },
            {
              path: ':index/edit',
              name: 'page-edit',
              component: PageEdit,
              props: true
            }
          ]
        }
      ]
    },
    {
      path: '/vue',
      name: 'vue',
      component: VueView,
      children: [
        {
          path: 'home',
          name: 'vue-home',
          component: HomeVueView
        },
        {
          path: 'about',
          name: 'vue-about',
          component: AboutVueView
        }
      ]
    },
    {
      path: '/axios-example',
      name: 'axios-example',
      component: () => import('@/views/Practice/AxiosExampleView.vue')
    },
    // 404 page must be placed at the end !!!
    { path: '/:pathMatch(.*)*', redirect: '/404' } // uses a route parameter pathMatch with a custom regular expression (.*)* to match any path.
  ]
})

// Global Navigation Guard for Authentication Checks
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const names = ['vue', 'vue-home', 'vue-about']
  if (names.includes(to.name as string)) {
    console.log('Hello from initial view of Vue')
  }

  // Redirect the user to the login page if the user is not authenticated
  // And not already attempting to visit the login or register pages
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authStore.userData == null) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

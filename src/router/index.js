import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import { useAuthStore } from '@/stores/auth';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Wait for the auth state to be initialized
  const checkAuth = () => {
    if (authStore.loading) {
      setTimeout(checkAuth, 100); // Retry until loading is false
    } else {
      if (requiresAuth && !authStore.isAuthenticated) {
        next('/login');
      } else if (!requiresAuth && authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
        next('/dashboard');
      } else {
        next();
      }
    }
  };

  checkAuth();
});

export default router;
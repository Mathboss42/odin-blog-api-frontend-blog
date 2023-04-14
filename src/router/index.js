import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import { useBlogStore } from '../stores/blog';
import HomeView from '../views/HomeView.vue';
import PostView from '../views/PostView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  props: ['id'],
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostView,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    }
  ]
})

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
  
  const store = useBlogStore();

  console.log('beforeEach isloggedin?', store.isLoggedIn);

  if (localStorage.getItem('token')) {
    try {
      const response = await axios.post('http://localhost:8092/auth/isLoggedIn', {}, { 
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
      if (response.status === 200) {
        store.isLoggedIn = true;
      } else {
        localStorage.removeItem('token');
        store.isLoggedIn = false;
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('token');
      store.isLoggedIn = false;
    }
  } else {
    store.isLoggedIn = false;
  }
});

export default router

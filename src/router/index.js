import Vue from 'vue';
import VueRouter from 'vue-router';

// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    path: '*',
    redirect: 'login',
  },{
    path : '/login',
    name : 'Login',
    component : Login
  },{
    path : '/admin',
    name : 'Dashboard',
    component : Dashboard,
    meta : { requiresAuth: true },
    children: [{
      path : 'products',
      name : 'products',
      component : Products,
      meta : { requiresAuth: true },
    }]
  }]
})

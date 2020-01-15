// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'                               //主要的 AJAX 套件
import VueAxios from 'vue-axios'                        //將它轉為 Vue 的套件
import Loading from 'vue-loading-overlay';              // Import component
import 'vue-loading-overlay/dist/vue-loading.css';      // Import stylesheet
import 'bootstrap';

import App from './App'
import router from './router'
import './bus';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
Vue.component('Loading', Loading);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

router.beforeEach((to, from, next) =>{
  // console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth){
    // console.log('這裡需要驗證')
    const api = `${process.env.APIPATH}/api/user/check`;
    
    axios.post(api).then((response) => {
      // console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        })
      }
    })
  }else {
    next();
  }
});

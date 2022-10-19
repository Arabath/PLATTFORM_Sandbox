import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import moment from 'moment-timezone'
import VueApexCharts from 'vue-apexcharts'
import VueExcelXlsx from "vue-excel-xlsx";
Vue.use(VueExcelXlsx);

moment.tz.setDefault('America/Argentina/Buenos_Aires')

Vue.component('apexchart', VueApexCharts)

Vue.filter('kb', val => {
  return Math.floor(val/1024);  
});

Vue.config.productionTip = false
axios.defaults.baseURL='http://desarrollo.plattform.com.ar/'
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
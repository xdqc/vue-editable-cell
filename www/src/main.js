import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AWS from "aws-sdk";
import {db} from "../aws.config";

Vue.use(BootstrapVue)
// Vue.config.productionTip = false

AWS.config.update(
  {
    region: db.region,
    credentials: db.readCredentials,
    logger:console,
  }
);

Vue.prototype.$AWS = AWS

new Vue({
  render: h => h(App)
}).$mount('#app') 


import Vue from 'vue';
import Component from 'vue-class-component';
import '@/plugins/antd';
import App from './components/app';

Vue.config.productionTip = false;

// Register the router hooks with their names
Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);


// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  render: h => h(App),
});

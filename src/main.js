import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// firebase
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth'
// axios
import axios from 'axios'    
//pagenation

//fontawsome 
import { library } from '@fortawesome/fontawesome-svg-core'
// solidの中で何を使うかをキャメルケースで記載
import {  faUser,faHome,faShareSquare,faAddressCard,faSignOutAlt,faSignInAlt,faUserPlus } from '@fortawesome/free-solid-svg-icons'
// brandsの中で何を使うかをキャメルケースで記載
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons"

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 上記で記載したアイコン名をLibraryに追加
// solid, brands関係なしでOK。
library.add( faUser,faHome,faShareSquare,faAddressCard,faTwitterSquare,faSignOutAlt,faSignInAlt,faUserPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDcXMVmjtOCC_C4I6-0cNJkFilWexmn2_0",
  authDomain: "shares-99a39.firebaseapp.com",
  databaseURL: "https://shares-99a39.firebaseio.com",
  projectId: "shares-99a39",
  storageBucket: "shares-99a39.appspot.com",
  messagingSenderId: "985879714019",
  appId: "1:985879714019:web:2a2d90eadc771a0e398dd6",
  measurementId: "G-MCTYFBZ3ED"
});

firebase.analytics();
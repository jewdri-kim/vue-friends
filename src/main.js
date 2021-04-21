import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueMoment from 'vue-moment'

Vue.use(vueMoment)

// Importing the global css file
import '@/assets/styles/font.css'
import '@/assets/styles/reset.css'
import '@/assets/styles/common.css'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
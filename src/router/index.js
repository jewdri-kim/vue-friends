import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '@/views/Todo.vue'
import store from '@/store/';

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Todo',
		component: Todo,
		beforeEnter: (to, from, next) => {
			try {
				store.dispatch('getUserId');
				store.dispatch('initTodoList');
			} catch(e) {
				console.error('initialize failed.', e.message);
			} finally {
				next();
			}
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router



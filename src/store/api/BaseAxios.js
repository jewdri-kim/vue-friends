import axios from 'axios'
import store from '@/store/'

//axios 인스턴스 생성
const instance = axios.create({
	baseURL: 'http://api.stickinteractive.com',
	timeout: 3000,
	headers: {
		'Content-Type': 'application/json',
		'Access-Controll-Allow-Origin': '*'
	}
})

//1.요청 인터셉터
instance.interceptors.request.use(
	(config) => {
		store.dispatch('setLoading', true);
		return config
	},

	(err) => {
		store.dispatch('setLoading', false);
		return Promise.reject(err)
	}
)

//2.응답 인터셉터
instance.interceptors.response.use(
	(config) => {
		store.dispatch('setLoading', false);
		return config
	},
	(err) => {
		store.dispatch('setLoading', false);
		return Promise.reject(err)
	}
)

export default instance
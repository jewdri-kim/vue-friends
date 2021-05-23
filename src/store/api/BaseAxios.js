import axios from 'axios'

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
		return config
	},

	(err) => {
		return Promise.reject(err)
	}
)

//2.응답 인터셉터
instance.interceptors.response.use(
	(config) => {
		return config
	},
	(err) => {
		return Promise.reject(err)
	}
)

export default instance
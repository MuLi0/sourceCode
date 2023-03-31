/*
这里是封装了一些 axios 的功能，
便于以后扩展
*/
import axios from 'axios'

// 新建一个axios对象
const axiosInstance = axios.create({
	baseURL: '/api'
})

// 请求拦截
axiosInstance.interceptors.request.use(config => {
	// console.log( config )

	// return，就是放行，否则就一直拦截
	return config
}, err => {
	console.log(err)
})

// 响应的拦截
axiosInstance.interceptors.response.use(config => {
	// 在这里，添加对应的逻辑，例如一些筛选操作
	// console.log( config )

	// return，就是放行，否则就一直拦截
	return config
}, err => {
	console.log(err)
	console.log(err.response.status)
	switch (err.response.status) {
		case 404:
			err.message = '请求错误，接口链接有问题'
		// 还有很多状态码，500、302、300...非常多，
		// 都可以像404这么去写，
	}
})

// 对外的公开方法
function requestFn(_config) {
	let { url, data, method } = _config;
	url = url || ''
	data = data || {}
	method = method || 'get'

	switch (method) {
		case 'get':
			return axiosInstance.get(url, { params: data })

		case 'post':
			// return post的内容
			return axiosInstance.post(url, { params: data })

		default:
		// return 默认情况
	}
}

export default requestFn
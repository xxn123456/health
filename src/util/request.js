import axios from 'axios'
//导入axios包

// create an axios instance
const service = axios.create({
  baseURL: '',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 18000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // token令牌配置
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
import request from '@/util/request.js'
export function queryHis() {
  return request({
    url:'/health/his',
    //此处auth是代理
    method: 'post',
    //baseURL: 'https://some-domain.com/api/',配置基本url
  })
}

  
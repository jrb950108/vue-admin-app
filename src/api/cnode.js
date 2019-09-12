import axios from '@/lib/api.request'

export function getTopics (params) {
  return axios.request({
    url: 'https://cnodejs.org/api/v1/topics',
    method: 'get',
    params
  })
}

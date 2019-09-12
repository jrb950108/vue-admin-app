import axios from '@/lib/api.request'
import qs from 'qs'

export const login = ({ userName, password }) => {
  const data = { userName, password }

  return axios.request({
    url: '/login',
    data: qs.stringify(data),
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/user',
    method: 'get'
  })
}

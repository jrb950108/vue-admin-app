import Mock from 'mockjs'

import { login, getUserInfo } from './login'

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/user/, getUserInfo)

export default Mock

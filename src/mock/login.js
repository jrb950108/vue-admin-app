import qs from 'qs'
import { getToken } from '@/lib/util'

const USER_MAP = {
  admin: {
    id: '2',
    token: 'admin',
    userName: 'admin',
    routes: [
      {
        name: 'workbench'
      },
      {
        name: 'e-commerce',
        children: [
          {
            name: 'data-monitor'
          },
          {
            name: 'data-process'
          }
        ]
      }
      // {
      //   name: 'domain',
      //   children: [

      //   ]
      // }
    ]
  }
}

export const login = req => {
  let body = qs.parse(req.body)
  if (body.userName in USER_MAP) {
    return {
      status: { code: '0', message: '登录成功' },
      result: {
        token: USER_MAP[body.userName].token
      }
    }
  } else {
    return {
      status: { code: '-3', message: '账号不存在，请重新输入账号。' },
      result: {}
    }
  }
}

export const getUserInfo = (req) => {
  const token = getToken()
  let { userName, id, routes } = USER_MAP[token]
  return {
    status: { code: '0', message: 'success' },
    result: {
      id,
      userName,
      routes
    }
  }
}

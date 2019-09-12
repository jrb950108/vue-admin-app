import axios from 'axios'

const CancelToken = axios.CancelToken
var source = CancelToken.source()

// const statusMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。'
// }

class Axios {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      },
      cancelToken: source.token
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      return config
    }, error => {
      return Promise.reject(error)
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
      const { data } = res
      // if (data.success) {
      //   source.cancel()
      //   // 当满足某一条件取消请求后，需要重新创建 cancel token
      //   // 若之后有页面刷新操作，则不需要重新创建
      //   source = CancelToken.source()
      // }
      return data
    }, error => {
      // 取消进行中的请求并中断Promise调用链
      if (axios.isCancel(error)) {
        return new Promise(function () {})
      } else {
        return Promise.reject(error)
      }
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default Axios

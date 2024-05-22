import axios from 'axios'

import { ElLoading, ElNotification } from 'element-plus'
import { errorCodeType } from './error-code-type.js'

const baseUrl =
  import.meta.env.VITE_APP_BASE_API +
  import.meta.env.VITE_APP_PREFIX_API +
  ':' +
  import.meta.env.VITE_APP_PORT_API
const CancelToken = axios.CancelToken

export { baseUrl }

let loading = false
let requestCount = 0
let errCount = 0

const showLoading = () => {
  if (requestCount === 0 && !loading) {
    loading = ElLoading.service({
      text: '拼命加载中，请稍后...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }
  requestCount++
}

const hideLoading = () => {
  requestCount--
  if (requestCount == 0) {
    loading.close()
  }
}

axios.interceptors.request.use(
  function (config) {
    showLoading()
    const token = false
    if (token) {
      config.headers['Authorization'] = token
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'

    return config
  },
  function (error) {
    hideLoading()
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    hideLoading()

    if (response.status !== 200) {
      ElNotification.error({
        title: '错误',
        message: errorCodeType(response.data.code)
      })
      return Promise.reject(response)
    }
    if (response.data.code == 401) {
      return response.data
    }
    return response.data
  },
  (error) => {
    if (errCount == 0) {
      errCount++
      const err = {
        success: false,
        msg: '未知异常，请联系管理员！'
      }
      if (JSON.stringify(error).indexOf('Network Error') != -1) {
        err.msg = '网络错误或服务错误！'
      }
      setTimeout(() => {
        errCount = 0
        loading.close()
      }, 1000)
      ElNotification.error({
        title: '错误',
        message: err.msg
      })
    }
  }
)

const isEncryptionParam = (params) => {
  return params
}

export const GET = async (url, params) => {
  try {
    params = isEncryptionParam(params)
    return await axios.get(`${baseUrl}${url}`, {
      params: params
    })
  } catch (error) {
    return error
  }
}

export const POST = async (url, params) => {
  try {
    params = isEncryptionParam(params)
    return await axios.post(`${baseUrl}${url}`, params)
  } catch (error) {
    return error
  }
}

export const PUT = async (url, params) => {
  try {
    params = isEncryptionParam(params)
    return await axios.put(`${baseUrl}${url}`, params)
  } catch (error) {
    return error
  }
}
export const DELETE = async (url, params) => {
  try {
    params = isEncryptionParam(params)
    return await axios.delete(`${baseUrl}${url}`, { data: params })
  } catch (error) {
    return error
  }
}

export const GETNOBASE = async (url, params) => {
  try {
    return await axios.get(url, {
      params: params
    })
  } catch (error) {
    return error
  }
}

const configs = {
  headers: { 'Content-Type': 'multipart/form-data' }
}

export const FILEPOST = async (url, params, config) => {
  try {
    return await axios.post(`${baseUrl}${url}`, params, {
      ...configs,
      cancelToken: new CancelToken(function executor(c) {
        config.setCancel && config.setCancel(c)
      }),
      onUploadProgress: (e) => {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100
        }
        config.onProgress && config.onProgress(e)
      }
    })
  } catch (err) {
    return err
  }
}

export const FILE = async (config) => {
  try {
    return await axios({
      method: config.method || 'get',
      url: `${baseUrl}${config.url}`,
      data: config.body || {},
      params: config.param || {},
      responseType: config.responseType || 'blod',
      onDownloadProgress: (e) => {
        config.onProgress && config.onProgress(e)
      }
    })
  } catch (err) {
    return err
  }
}

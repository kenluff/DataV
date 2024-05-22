import { GET, POST, FILEPOST, PUT, GETNOBASE, DELETE } from './request'

import Index from '@/api/modules/index'

export { GETNOBASE }

export const urlObj = {
  ...Index
}

export const getAction = (key, param) => {
  return GET(urlObj[key], param || {})
}
export const putAction = (key, param) => {
  return PUT(urlObj[key], param)
}
export const postAction = (key, param) => {
  return POST(urlObj[key], param || {})
}
export const deleteAction = (key, param) => {
  return DELETE(urlObj[key], param || {})
}
export const fileAction = (key, param) => {
  return FILEPOST(urlObj[key], param || {}, {})
}
export const httpAction = (type, url, param) => {
  return type(type, url, param || {})
}
// 通用接口集合
export const currentApi = {
  get: getAction,
  put: putAction,
  post: postAction,
  delete: deleteAction,
  file: fileAction
}

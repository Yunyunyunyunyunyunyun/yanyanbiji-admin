import request from '../request'
export function getMsg(apiRoute, params) {
  if (params) {
    return request({
      url: apiRoute + '?' + params,
      method: 'get'
    })
  } else {
    return request({
      url: apiRoute,
      method: 'get'
    })
  }
}
export function deleteMsg(apiRoute, params) {
  if (params) {
    return request({
      url: apiRoute + '?' + params,
      method: 'delete'
    })
  } else {
    return request({
      url: apiRoute,
      method: 'delete'
    })
  }
}
export function postMsg(apiRoute, params) {
  if (params) {
    return request({
      url: apiRoute + '?' + params,
      method: 'post'
    })
  } else {
    return request({
      url: apiRoute,
      method: 'post'
    })
  }
}
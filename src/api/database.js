import request from '@/utils/request'

export function database(data = {}) {
  return request({
    url: '/database/index',
    method: 'post',
    data
  })
}

export function diskbase(data = {}) {
  return request({
    url: '/database/disk',
    method: 'post',
    data
  })
}

/*
 * @Author: tushan
 * @Date: 2022-01-07 20:43:26
 * @LastEditTime: 2022-01-07 21:08:14
 * @Description: 文件介绍
 * @FilePath: /mcecy-admin/src/api/settings.js
 */
import request from '@/utils/request'

export const friend_link = () => {
  return request({
    url: 'settings/friend_link_list'
  })
}
export const friend_save = (data) => {
  return request({
    url: 'settings/friend_link_add',
    method: 'post',
    data
  })
}

export const setting_list = (data) => {
  return request({
    url: 'settings/list',
    method: 'post',
    data
  })
}
export const setting_update = (data) => {
  return request({
    url: 'settings/update',
    method: 'post',
    data
  })
}

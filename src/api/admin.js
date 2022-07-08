/*
 * @Author: tushan
 * @Date: 2021-11-02 11:09:07
 * @LastEditTime: 2021-11-07 12:35:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/api/admin.js
 */
import request from '@/utils/request'

/**管理员列表 */
export function admin_list(data) {
  return request({
    url: '/user/user_list',
    method: 'post',
    data
  })
}

/**权限角色 */
export function admin_role(data) {
  return request({
    url: '/user/role',
    method: 'post',
    data
  })
}

/**设置管理员权限组 */
export function set_admin_role(data) {
  return request({
    url: '/user/set_admin_role',
    method: 'post',
    data
  })
}

/**删除管理员 */
export function admin_delete(data) {
  return request({
    url: '/user/admin_delete',
    method: 'post',
    data
  })
}

export function resetpass(data) {
  return request({
    url: '/user/resetpass',
    method: 'post',
    data
  })
}

/*
 * @Author: tushan
 * @Date: 2021-11-03 19:29:48
 * @LastEditTime: 2021-11-07 12:34:59
 * @Description: 用户列表相关接口
 * @FilePath: /mcecy-admin/src/api/userList.js
 */

import request from "@/utils/request";
//用户列表
export function list(data) {
  return request({
    url: "/userList/index",
    method: "post",
    data,
  });
}
//设置信息
export function set_info(data) {
  return request({
    url: "/userList/set_info",
    method: "post",
    data,
  });
}

//个人信息
export function user_info(data) {
  return request({
    url: "/userList/user_info",
    method: "post",
    data,
  });
}

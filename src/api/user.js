/*
 * @Author: tushan
 * @Date: 2021-11-02 18:35:44
 * @LastEditTime: 2021-11-07 12:34:51
 * @Description: 管理员相关接口
 * @FilePath: /mcecy-admin/src/api/user.js
 */

import request from "@/utils/request";
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}

export function getInfo(token) {
  return request({
    url: "/user/info",
    method: "post",
  });
}

export function logout() {
  return request({
    url: "/user/login_out",
    method: "post"
  });
}

/*
 * @Author: tushan
 * @Date: 2021-08-28 16:41:04
 * @LastEditTime: 2021-11-07 12:34:11
 * @Description: 此文件介
 * @FilePath: /mcecy-admin/src/utils/auth.js
 */
import Cookies from 'js-cookie'

const TokenKey = 'admin_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
/*
 * @Author: your name
 * @Date: 2021-08-28 16:41:04
 * @LastEditTime: 2021-10-04 14:34:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/utils/validate.js
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

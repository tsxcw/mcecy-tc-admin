/*
 * @Author: tushan
 * @Date: 2021-11-03 16:42:57
 * @LastEditTime: 2022-02-20 15:26:58
 * @LastEditors: Please set LastEditors
 * @Description: 内容文章类api
 * @FilePath: /mcecy-admin/src/api/article.js
 */
import request from "@/utils/request";

/**管理员列表 */
export function article_list(data) {
  return request({
    url: "/article/list",
    method: "post",
    data,
  });
}
/**查看文章详情 */
export function article_detail(data) {
  return request({
    url: "/article/article_detail",
    method: "post",
    data,
  });
}
/**删除文章从服务器，硬删除 */
export function article_delete(data) {
  return request({
    url: "/article/delete",
    method: "post",
    data,
  });
}
/**文章状态改变 */
export function article_status(data) {
  return request({
    url: '/article/article_status',
    method: 'post',
    data
  })
}

/**获取未审核的文章 */
export function article_get(data) {
  return request({
    url: '/article/article_get',
    method: 'post',
    data
  })
}
/**审核文章 */
export function check(data) {
  return request({
    url: '/article/check',
    method: 'post',
    data
  })
}

/**驳回 */
export function check_fail(data) {
  return request({
    url: "/article/check_fail",
    method: "post",
    data
  })
}
/**更新文章 */
export const article_update = (data) => {
  return request({
    url: "article/update",
    method: 'post',
    data
  })
}
/**文章seo */
export const article_seo= (data) => {
  return request({
    url: "article/seo",
    method: 'post',
    data
  })
}
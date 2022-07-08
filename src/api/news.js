/*
 * @Author: tushan
 * @Date: 2021-11-01 15:51:25
 * @LastEditTime: 2022-03-05 19:10:42
 * @LastEditors: tushan
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/api/news.js
 */
import request from "@/utils/request";
/**
 * @param {*} data
 * @Description: 新闻列表
 */
export function news_list(data) {
  return request({
    url: "/news/list",
    method: "post",
    data,
  });
}

/**
 * @param {*} data
 * @Description: 新增新闻
 */
export function news_add(data) {
  return request({
    url: "/news/add_news",
    method: "post",
    data,
  });
}


/**
 * @param {*} data
 * @Description: 删除新闻
 */
 export function news_del(data) {
  return request({
    url: "/news/del_news",
    method: "post",
    data,
  });
}
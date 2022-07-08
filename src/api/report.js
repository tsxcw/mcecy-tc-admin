/*
 * @Author: tushan
 * @Date: 2021-11-02 21:55:57
 * @LastEditTime: 2021-11-07 12:35:32
 * @LastEditors: Please set LastEditors
 * @Description: 举报反馈相关接口
 * @FilePath: /mcecy-admin/src/api/report.js
 */
import request from "@/utils/request";

/**获取列表 */
export function report_list(data) {
    return request({
        url: "/Report/list",
        method: "post",
        data
    })
}
/**详情 */
export function report_detail(data) {
    return request({
        url: "/Report/list",
        method: "post",
        data
    })
}

/**回复内容 */
export function report_reply(data) {
    return request({
        url: "/Report/reply",
        method: "post",
        data
    })
}

/**删除内容 */
export function report_deltet(data) {
    return request({
        url: "/Report/delete",
        method: "post",
        data
    })
}
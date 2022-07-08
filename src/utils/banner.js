/*
 * @Author: your name
 * @Date: 2022-01-07 09:30:54
 * @LastEditTime: 2022-01-07 09:34:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mcecy-admin\src\utils\banner.js
 */
import request from '@/utils/request'

export const banner_list = (data) => {
    return request({
        url: "/banner/list",
        method: "post",
        data
    })
}

export const banner_update = (data) => {
    return request({
        url: "/banner/update",
        method: "post",
        data
    })
}
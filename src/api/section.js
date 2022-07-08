/*
 * @Author: your name
 * @Date: 2022-01-06 14:10:38
 * @LastEditTime: 2022-01-06 16:42:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mcecy-admin\src\api\section.js
 */
import request from '@/utils/request'

export const index = (data) => {
    return request({
        url: "section/index",
        method: "POST",
        data
    })
}
/**更新、添加分类 */
export const update = (data) => {
    return request({
        url: "section/update",
        method: "POST",
        data
    })
}
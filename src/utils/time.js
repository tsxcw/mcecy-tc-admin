/*
 * @Author: your name
 * @Date: 2021-10-04 14:32:29
 * @LastEditTime: 2021-10-04 14:34:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mcecy-admin/src/utils/time.js
 */
import moment from "moment";
export const timeFormat = (time,fmt) => {
    return moment(time).format(fmt);
};

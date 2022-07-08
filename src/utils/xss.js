/*
 * @Author: your name
 * @Date: 2021-12-21 11:01:01
 * @LastEditTime: 2022-01-07 22:28:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /mcecyClient/src/util/xss.js
 */
import xss from "xss";
export const remove_xss = (newHtml, arr = []) => {
    //允许通过的标签
    const tag = [
        "p",
        "a",
        "img",
        "font",
        "span",
        "b",
        "blockquote",
        "code",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "br",
        "s",
        "i",
        "u",
        "strike",
        "div",
        "strong",
        "pre"
    ];
    if (arr.length > 0) {
        arr.forEach(el => {
            tag.push(el);
        })
    }
    //允许使用的属性
    const can = ["color", "size", "style", "href", "src"];
    let tmp = {};
    for (let index = 0; index < tag.length; index++) {
        const element = tag[index];
        tmp[element] = can;
    }
    return xss(newHtml, {
        whiteList: tmp,
    });
}
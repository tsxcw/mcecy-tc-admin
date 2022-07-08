/*
 * @Author: tushan
 * @Date: 2022-03-03 19:36:17
 * @LastEditors: tushan
 * @LastEditTime: 2022-03-05 17:49:47
 * @Description:
 */
import { remove_xss } from "./xss";
import { upfile } from "@/api/upfile"
import E from "wangeditor";
export function init(dom_id) {
    const editor = new E(document.querySelector(dom_id));
    editor.config.menus = [
        'bold',
        'image',
        'fontSize',
        'foreColor',
        'backColor',
        'head',
        'link',
        'underline'
    ]
    editor.config.showLinkImg = false
    editor.config.showFullScreen = false
    editor.config.customUploadImg = async function (resultFiles, insertImgFn) {
        for (let index = 0; index < Object.keys(resultFiles).length; index++) {
            const f = new FormData();
            f.append("file", resultFiles[index])
            await upfile(f).then(e => {
                insertImgFn(e.url)
            }).catch(_ => { })
        }
    }
    editor.appentHtml = function (H) {
        this.txt.html(H)
    }
    editor.create();
    return editor;
}
/*获取html富文本 并且xss过滤*/
export function html(edit) {
    return remove_xss(edit.txt.html());
}
/*获取txt文本 并且xss过滤*/
export function text(edit) {
    return remove_xss(edit.txt.text());
}

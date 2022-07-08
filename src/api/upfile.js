import request from '@/utils/request'
/**
 * @description:文件上传
 * @param {*} file 文件fromData对象
 * @param {*} call 接收上传进度的回调函数 可选
 * @returns result
 */
export const upfile = (file, call) => {
  return request({
    url: "/file/upload_admin",
    method: "post",
    data: file,
    timeout: 60000,
    onUploadProgress: function (e) {
      //获取进度并且回调
      const total = e.total;
      const now = e.loaded;
      const loading = parseFloat((now / total) * 100).toFixed(2);
      call && call(loading);
    },
  });

};

//在此封装接口信息
/**
 *1.挂载到全局(main.js)
 *  import Api from "./util/utils"; // 主要是这里，引入配置好的Api
 *  app.config.globalProperties.$request = Api; //方法挂载到全局
 *2.vue页面使用：
 *  import {getCurrentInstance} from 'vue'
 *  定义一个变量接收  const api = getCurrentInstance()
 *  发送网络请求 例： api.proxy.$request.getUser({user_id: 2})
 * */

import {get, post} from "@/util/request";

/**
 * 2.直接每个vue页面引入utils.js
 * import util from "@/util/utils";
 * 然后 util.UploadFile(data)
 * */

export default {
    /**
     * @param {Object} data
     * 接口需要的参数
     */
//图片上传
    UploadFile: (data) => post('api/common/upload', data), //获取用户信息
    getUser: (data) => get('/addons/appmy/user/getzlbuser.html', data)
}

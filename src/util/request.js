// 封装网络请求
import axios from 'axios';

const service = axios.create({
    // baseURL: 'https://byn.tyjr.ding.zjhy.gov.cn/', // 接口的基础路径，根据实际情况修改
    // baseURL: 'http://tyjradmin.btzqcjr.cn/', // 接口的基础路径，根据实际情况修改
    baseURL: 'http://localhost:8080', // 接口的基础路径，根据实际情况修改
    timeout: 6000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前，可以在这里对请求进行一些处理，比如添加请求头、设置请求数据格式等
        //如果是上传文件的网络请求
        console.log(config,'config')
        config.headers['accesstoken'] = 'zrsRoRADCryubZBbYECNBTczqeZeycKL'
        return config;
    },
    error => {
        // 请求错误时，可以在这里进行一些处理，比如提示错误信息等
        console.log(error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 在响应数据返回之前，可以在这里对响应进行一些处理，比如过滤数据、统一处理错误码等
        return response.data;
    },
    error => {
        // 响应错误时，可以在这里进行一些处理，比如提示错误信息等
        console.log(error);
        return Promise.reject(error);
    }
);



// 封装一个 GET 请求
/**
 * @param {string} url
 * 传入url接口
 * @param {object} params
 * 传入接口参数
 * */
export function get(url, params) {
    return service({
        url,
        method: 'get',
        params,
    });
}

// 封装一个 POST 请求
/**
 * @param {string} url
 * 传入url接口
 * @param {object} data
 * 传入接口参数
 **/
export function post(url, data) {
    return service({
        url,
        method: 'post',
        data,
    });
}


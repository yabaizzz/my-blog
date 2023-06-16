//公共的封装方法

import {Dialog, Toast, ImagePreview} from "vant";
import ImageCompressor from 'compressorjs'
import util from "@/util/utils";

// 在需要使用的页面引入即可
// 例：import {callPhone} from "@/util/api"; 即可直接使用，callPhone()

/**
 * 返回当前时间
 * @param {boolean} isShow  判断是否需要返回小时和分钟
 * @returns {string} 时间
 */
export function getNowFormatDate(isShow = true) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let strDate = date.getDate()
    let strHour = date.getHours()
    let strMin = date.getMinutes()
    if (month >= 1 && month <= 9) month = `0${month}`
    if (strDate >= 1 && strDate <= 9) strDate = `0${strDate}`
    if (isShow) {
        return `${year}/${month}/${strDate} ${strHour}:${strMin}`
    } else {
        return `${year}/${month}/${strDate}`
    }


}

/**
 * 拨打电话
 *
 * 传入需要拨打的手机号
 * @param {number} x 手机号码
 **/
export function callPhone(x) {
    Dialog.confirm({
        title: `确定要拨打电话${x}吗`,
    })
        .then(() => {
            console.log('播打成功')
            const a = document.createElement("a");
            a.href = `tel:${x}`
            a.click();
            // on confirm
        })
        .catch(() => {
            console.log('播打失败')
            Toast.fail('播打失败');
            // on cancel
        });
}

/**
 * 压缩图片的方法
 * @param {string} file
 * 文件上传的file对象
 * @param {number} quality
 * 设置的图片压缩质量,默认为0.6
 *
 * */
export function compressImg(file, quality = 0.6) {
    if (!file) {
        throw new Error("未传入任何文件");
    }

    return new Promise(
        (resolve, reject) => {

            // console.log("origin ", file);

            new ImageCompressor(file, {
                quality: quality,//压缩质量
                // checkOrientation: false,//指示是否读取图像的Exif方向值(仅为JPEG图像)，然后使用该值自动旋转或翻转图像。默认true
                success(result) {

                    //如果是Blob类型，需要先进行转换
                    if (result.constructor.name == "Blob") {
                        result = new File([result], result.name, {type: "image/jpeg"});
                    }

                    // console.log("result", result)

                    resolve(result);
                },
                error(e) {
                    console.log("文件压缩失败", e);
                    reject(e);
                }
            });
        }
    )
}

/**
 * 上传图片
 * @param {string} file 文件上传的file对象
 * @param {boolean} imageCompression 判断是否需要压缩图片
 * */
export function upPic(file, imageCompression) {
    return new Promise(async (resolve, reject) => {

        let data = new FormData(); //创建form对象
        // console.log("压缩前", file)
        if (imageCompression == true) {
            //将图片压缩
            // console.log('压缩,导入压缩后的file对象')
            let compressFile = await compressImg(file);
            data.append('file', compressFile);
        } else {
            // console.log('不压缩,导出原本的file对象')
            data.append('file', file);
        }
        util.UploadFile(data)
            .then((res) => {
                if (res.code === 1) {
                    resolve(res.data);
                } else {
                    Toast.fail({message: res.msg})
                    reject(res.msg);
                }
            })
            .catch((e) => {
                Toast.fail({message: "上传失败"});
                reject(e);
            })


    })
}

/**
 * 预览图片
 * @param {any} arr 要预览的图片数组
 * @param {number} index 要预览的图片下标
 */
export function imgPreview(arr, index) {
    ImagePreview(arr, index)
}


/**
 * 获取文件名（不带后缀）
 * @param {string} name
 *
 * */
export function getFileNameStr(name) { //name 完整文件名
    let dotIndex = name.lastIndexOf(".")
    let nameStr = name.slice(0, dotIndex)
    return nameStr
}


/**
 * 获取页面参数
 * @param {string} url
 * 传入页面地址
 * @returns option:{{Object}}
 * 返回页面参数
 */
export function getPageParam(url) {
    let urlStr = url.split("?")[1] //？后面的部分
    let option = {}
    if (urlStr) {
        let keyValArr = urlStr.split("&")
        keyValArr.forEach(function (str, index) {
            let arr = str.split("=")
            let key = arr[0]
            let val = arr[1]
            option[key] = val
        })
    }
    return option
}


//获取浏览器类型
export function getBrowserType() {
    let str = window.navigator.userAgent
    let name
    if (str.indexOf("Opera") > -1 || str.indexOf("OPR") > -1) {
        name = "Opera"
        return name
    }
    if (str.indexOf("Edge") > -1) {
        name = "Edge"
        return name
    }
    if (str.indexOf("Firefox") > -1) {
        name = "Firefox"
        return name
    }
    if (str.indexOf("Chrome") > -1 && str.indexOf("Safari") > -1) {
        name = "Chrome"
        return name
    }
    if (str.indexOf("Chrome") === -1 && str.indexOf("Safari") > -1) {
        name = "Safari"
        return name
    }
    if ((str.indexOf("Opera") === -1 && str.indexOf("MSIE") > -1) || str.indexOf("Trident") > -1) {
        name = "IE"
        return name
    }
}


//防抖 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
/**
 * 防抖函数
 * @param  fn  要执行的函数
 * @param delay 延迟的时间
 */
export function debounce(fn, delay = 1500) {
    // 定时器
    let timer = null;
    // 将debounce处理结果当作函数返回
    return function () {
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;
        // 每次事件被触发时，都去清除之前的旧定时器
        if (timer) {
            clearTimeout(timer);
        }
        // 设立新定时器
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}


//节流 ：一个函数执行一次后，只有大于设定的执行周期才会执行第二次
/**
 * 节流函数
 * @param fn  要执行的函数
 * @param delay 延迟的时间
 */
export function throttle(fn, wait = 1500) {
    let inThrottle, lastFn, lastTime;
    return function () {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function () {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
}

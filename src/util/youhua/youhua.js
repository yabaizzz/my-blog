// 防抖
// 防抖的意思是，在连续的操作中，无论进行了多长时间，只有某一次的操作后在指定的时间内没有再操作
// ，这一次才被判定有效。具体场景可以搜索框输入关键字过程中实时 请求服务器匹配搜索结果，如果不进行处理，
// 那么就是输入框内容一直变化，导致一直发送请求。如果进行防抖处理，结果就是当我们输入内容完成后，一定时间(比如500ms)没有再 输入内容，这时再触发请求。

/**
 *
 * @param {*} fn  是我们需要包装的事件回调
 * @param {*} delay 是每次推迟执行的等待时间
 */
 const debounce = (fn, delay = 1000) => {
    // 定时器
    let timer = null;
    // 将debounce处理结果当作函数返回
    return function() {
        // 保留调用时的this上下文
        let context = this;
        // 保留调用时传入的参数
        let args = arguments;
        // 每次事件被触发时，都去清除之前的旧定时器
        if (timer) {
            clearTimeout(timer);
        }
        // 设立新定时器
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
};



// 节流
// 节流的意思是，规定时间内，只触发一次。比如我们设定500ms，在这个时间内，无论点击按钮多少次
// 它都只会触发一次。具体场景可以是抢购时候，由于有无数人快速点击按钮，如果每次点击都发送请求，
// 就会给服务器造成巨大的压力，但是我们进行节流后，就会大大减少请求的次数。

/**
 *
 * @param {*} fn 是我们需要包装的事件回调
 * @param {*} wait 是每次推迟执行的等待时间
 */
const throttle = (fn, wait = 1500) => {
    let inThrottle, lastFn, lastTime;
    return function() {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function() {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

export  {
    //节流
    throttle,
    //防抖
    debounce
}


import {defineStore} from 'pinia'

export const mainStore = defineStore('main', {
    state: () => {
        return {
            userInfo: {},
            isLogin: false,
            phone: {
                height: null
            },
            imgUrl: 'https://oss.xrzww.com'
        }
    },
    getters: {},
    actions: {}
})


/*
*
*
1.在页面引入  import {mainStore} from "@/pinia";
2.定义变量接收    let store = mainStore()
      (1)pinia使用示例（单数据）
      store.userInfo = res.data.data.userInfo

      (2)pinia使用示例（多数据）
       store.$patch({
        userInfo: res.data.data.userInfo,
         isLogin: true
      })
*/

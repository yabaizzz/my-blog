<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-wechat-title='Route.meta.title' :is="Component" :key="Route.name" v-if="Route.meta.keepAlive"/>
    </keep-alive>
    <component v-wechat-title='Route.meta.title' :is="Component" :key="Route.name" v-if="!Route.meta.keepAlive"/>
  </router-view>

</template>

<script setup>
import tabbar from '@/components/tabbar/index'
import {ref, reactive, onMounted, watch} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {mainStore} from "@/pinia";

let store = mainStore()
const Route = useRoute();
onMounted(() => {
  store.phone.height = document.documentElement.clientHeight;

  if (localStorage.getItem('mode')) {
    let mode = localStorage.getItem('mode')
    // console.log(mode,'mode')
    if (mode == 'dark') {
      store.background = '#181818'
    }
    if (mode == 'auto') {
      let date = new Date()
      let h = date.getHours() //小时
      if (h >= 7 && h <= 18) {
        //白
        store.background = '#fff'
      } else {
        //黑天
        store.background = '#181818'
      }
    }
    if (mode == 'light') {
      store.background = '#ffffff'
    }
  }
})
watch(() => store.background, (newValue, oldValue) => {
  document.getElementsByTagName('body')[0].style.backgroundColor = newValue
  document.getElementsByTagName('body')[0].style.color = newValue === '#181818' ? '#fff' : '#333'
})

</script>


<style lang="less">
#app {
  overflow-x: hidden;
}

body {
  height: 100vh;
  margin: 0;
  padding: 0;
}

//#app {
//  font-family: Avenir, Helvetica, Arial, sans-serif;
//  -webkit-font-smoothing: antialiased;
//  -moz-osx-font-smoothing: grayscale;
//  text-align: center;
//  color: #2c3e50;
//  height: 100vh;
//}
</style>

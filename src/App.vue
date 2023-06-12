<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component v-wechat-title='Route.meta.title' :is="Component" :key="Route.name" v-if="Route.meta.keepAlive"/>
    </keep-alive>
    <component v-wechat-title='Route.meta.title' :is="Component" :key="Route.name" v-if="!Route.meta.keepAlive"/>
  </router-view>

<!--  <tabbar v-if="Route.meta.tabShow == true"></tabbar>-->

</template>

<script setup>
import tabbar from '@/components/tabbar/index'
import {ref, reactive, onMounted} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {mainStore} from "@/pinia";

let store = mainStore()
const Route = useRoute();
// console.log(Route.meta)
// document.title = Route.meta.title
onMounted(() => {
  store.phone.height = document.documentElement.clientHeight;
})

</script>


<style lang="less">
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

.root {
  //padding-bottom: 60px;
  box-sizing: border-box;
}
</style>

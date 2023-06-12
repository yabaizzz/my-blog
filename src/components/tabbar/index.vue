<template>
  <van-tabbar route v-model="active">
    <van-tabbar-item v-for="item in tabList" replace :to="item.name">
      <span>{{ item.title }}</span>
      <template #icon="props">
        <img :src="props.active==0 ? item.img.active : item.img.inactive"/>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {ref} from "vue";

let active = ref(0)
let tabList = ref([
  {
    name: '/',
    title: '书架',
    img: {
      inactive: 'https://h5.xrzww.com/static/shujia1-2.png',
      active: 'https://h5.xrzww.com/static/shujia2.png'
    }
  },
  {
    name: '/tuijian',
    title: '推荐',
    img: {
      inactive:'https://h5.xrzww.com/static/tuijian1-2.png',
      active: 'https://h5.xrzww.com/static/tuijian2.png'
    }
  },
  {
    name: '/shequ',
    title: '社区',
    img: {
      inactive:'https://h5.xrzww.com/static/shequ1-2.png',
      active:'https://h5.xrzww.com/static/shequ2.png'
    }
  },
  {
    name: '/profile',
    title: '我的',
    img: {
      inactive:'https://h5.xrzww.com/static/mine1-2.png',
      active:'https://h5.xrzww.com/static/mine2.png'
    }
  }
])
</script>

<style scoped>

</style>

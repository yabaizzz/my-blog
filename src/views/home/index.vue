<template>
  <div class="root">
    <topBar></topBar>
  </div>
</template>

<script setup>
import topBar from '@/components/topBar/index.vue'
import {onMounted} from "vue";
import {useRoute} from 'vue-router';

const route = useRoute()
onMounted(() => {
})
</script>

<style scoped lang="less">

</style>

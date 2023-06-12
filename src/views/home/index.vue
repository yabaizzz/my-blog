<template>
  <div class="root">
    <mapEach></mapEach>
  </div>
</template>

<script setup>
import mapEach from '@/components/map/map.vue'
import {onMounted} from "vue";
import {useRoute} from 'vue-router';

const route = useRoute()
onMounted(() => {
})
</script>

<style scoped lang="less">

</style>

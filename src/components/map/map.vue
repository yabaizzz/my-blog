<!--显示当前位置组件-->
<template>
  <div class="root">
    <div class="map" style="width: 100%;height: 300px;">
      <div @click="choose" id="container" style="width:100%; height:100%"></div>
    </div>
    <maps ref="cmap" @cityinfo="cityinfo" :jwd="address"></maps>
  </div>
</template>

<script setup>
import maps from '@/components/map/components/chooseAddress.vue'
import {ref, onMounted} from "vue";
import {mainStore} from "@/pinia";
// import {Route,Router} from 'vue-router'

let store = mainStore()
let cmap = ref("")
//当前位置信息
let address = ref({
  lng: 121.392017,
  lat: 28.58499
})
//当前缩放级别：
let zoom = ref("");
// 地图实列对象
let map = ref("");
// 标点实列对象
let marker = ref("");
//初始化地图
const initMap = function () {
  map.value = new AMap.Map("container", {
    zoom: 14, //地图缩放级别
    center: [address.value.lng, address.value.lat], //地图默认中心点坐标
  });

  //获取定位信息
  getLocation()

  // 创建点
  addmarker();

  // 自适应展示所有标记点
  map.value.setFitView(marker.value);
  // 这里的this指向构造函数的实例
  zoom.value = map.value.getZoom();
};
let addmarker = () => {

  let markerContent =
      "<div><img style='width:21px;height:30px' src='https://img1.baidu.com/it/u=1462787434,1779325197&fm=253&fmt=auto&app=138&f=JPEG?w=341&h=499' /></div>";
  marker.value = new AMap.Marker({
    position: new AMap.LngLat(address.value.lng, address.value.lat),

    content: markerContent, //自定义marker内容
  });

  // 将创建的点标记添加到已有的地图实例：
  map.value.add(marker.value);
  // 修改地图的中心点为图标的中间
  map.value.setCenter([address.value.lng, address.value.lat]);
};
let getLocation = () => {
  AMap.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      // 是否使用高精度定位，默认：true
      enableHighAccuracy: true,
      // 设置定位超时时间，默认：无穷大
      timeout: 10000,
      // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonOffset: new AMap.Pixel(10, 20),
      //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      zoomToAccuracy: true,
      //  定位按钮的排放位置,  RB表示右下
      buttonPosition: 'RB'
    })

    geolocation.getCurrentPosition()
    AMap.event.addListener(geolocation, 'complete', onComplete)
    AMap.event.addListener(geolocation, 'error', onError)

    function onComplete(data) {
      console.log(data.formattedAddress, '成功')
      // alert(data.formattedAddress)
      // data是具体的定位信息
    }

    function onError(data) {
      console.log(data, '失败')
      // 定位出错
    }
  })
}

//打开地图选择位置
let choose = () => {
  cmap.value.shows()
}
//选择位置返回的信息
let cityinfo = (e) => {
  console.log(e.address,123123123)
}

onMounted(() => {

  initMap()
})
</script>

<style scoped lang="less">
.topbar {
  background: rgba(0, 0, 0, 0.2);
  width: calc(100% - 30px);
  display: flex;
  align-content: center;
  justify-content: space-between;
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;
  padding: 15px;
  font-size: 16px;
  //   font-weight: bold;
  .l {
    color: white;
    background: red;
    padding: 10px 25px;
    border-radius: 10px;
  }

  .r {
    background: #2cdb71;
    padding: 10px 25px;
    border-radius: 10px;
    color: white;
  }
}
</style>
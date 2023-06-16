<!-- 高德选择地址组件，可以类似微信那样搞出多个选择结果 支持搜索，但不显示距离
（该组件在map.vue里）
-->
<template>
  <div class="mapwps">
    <van-popup v-model:show="show" position="bottom">
      <div class="wps" :style="{height:store.phone.height+'px'} ">
        <img
            class="mappoint"
            src="https://img1.baidu.com/it/u=1462787434,1779325197&fm=253&fmt=auto&app=138&f=JPEG?w=341&h=499"
            alt=""
        />
        <div id="containers" class="map" tabindex="0"></div>
        <div class="topbar">
          <div class="l" @click="qx">取消</div>

          <div class="r" @click="qr">确认</div>
        </div>
        <div class="footbar" v-show="show">
          <div class="t" @click="seachcity = true">
            <van-icon name="search"/>
            <div>搜索地点</div>
          </div>

          <div class="b">
              <div class="l" >
                <div class="l_t">
                  {{ city.address }}
                </div>
                <div class="l_b">
                  {{
                    city.regeocode.addressComponent.township +
                    city.regeocode.addressComponent.street +
                    city.regeocode.addressComponent.streetNumber
                  }}
                </div>
              </div>
              <div class="r">
                <van-icon color="#1cd66c" name="success"/>
              </div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 搜索 -->
    <!-- lock-scroll为遮罩层里的类容是否可以滚动，默认是不能，改成false就可以滚动了 -->
    <van-overlay :show="seachcity" @click.self="clear()" :lock-scroll="false">
      <div class="seachwps">
        <div class="t">
          <div class="l">
            <div class="l_l">
              <van-icon name="search"/>
            </div>
            <div class="l_r">
              <input
                  v-model="seachtext"
                  placeholder="地址关键字"
                  @input="shuru"
                  type="text"
              />
            </div>
          </div>
          <div class="r" @click="clear()">取消</div>
        </div>
        <div class="b">
          <div v-if="seachdata.length > 0" style="overflow: auto; height: 100%">
            <div
                class="bwp"
                v-for="(item, index) in seachdata"
                :key="index"
                @click="choosecity(index)"
            >
              <div>
                <div class="t_t">{{ item.name }}</div>
                <div class="b_b">{{ item.address }}</div>
              </div>
            </div>
          </div>
          <div v-else class="nolist">
            {{
              seachtext == "" ? "请输入地址关键词" : "暂未数据,换个关键词试试吧"
            }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script setup>
import {throttle, debounce} from "@/util/api.js";
import axios from "axios";

import {mainStore} from "@/pinia";

import {onMounted, ref,} from "vue";

const props = defineProps({
  //子组件接收父组件传递过来的值
  jwd: Array
})
let store = mainStore() //piain

//子组件给父组件传值–emit方式
let emits = defineEmits(['cityinfo'])
//是否显示
let show = ref(false)
// 地图实列对象
let map = ref("");
//位置信息
let city = ref({
  position: {
    // 默认经纬度
    lng: 121.5,
    lat: 28.5,
  },
  // 默认的逆解析信息，不写渲染会报错
  regeocode: {
    addressComponent: {},
  },
});
// 搜索到的数据
let seachdata = ref([]);
// 搜索地址是否显示
let seachcity = ref(false);
// 搜索v-model
let seachtext = ref("");

let int = function () {
  AMapUI.loadUI(["misc/PositionPicker"], function (PositionPicker) {
    console.log(PositionPicker);
    map.value = new AMap.Map("containers", {
      zoom: 16,
      center: [city.value.position.lng, city.value.position.lat], //初始地图中心点
      scrollWheel: false,
    });

    var positionPicker = new PositionPicker({
      mode: "dragMap",
      map: map.value,
      iconStyle: {
        //自定义外观
        url: "//webapi.amap.com/ui/1.0/assets/position-picker2.png",
        ancher: [24, 40],
        size: [0, 0], // 没办法，为了适配6sp
      },
    });

    // 成功时 //positionResult里有多的推荐地址,且还有经纬度的逆解析信息
    positionPicker.on("success", function (positionResult) {
      console.log(positionResult,'推荐地址')
      // city.value = positionResult.regeocode.pois;
      city.value = positionResult ;
    });

    // 失败时
    positionPicker.on("fail", function (positionResult) {
      city.value = "";
    });

    // 开始监听？
    positionPicker.start();
    map.value.panBy(0, 1);
  });
};
let shows = function () {
  int()
  show.value = true;
  // 可以从本地获取自身经纬度
};

// 清除搜索的数据
let clear = function () {
  seachtext.value = "";
  seachdata.value = [];
  seachcity.value = false;
};

// 选择搜索的其中一个地址
let choosecity = function (e) {
  // console.log(789)
  city.value.position.lat = seachdata.value[e].location.split(",")[1];
  city.value.position.lng = seachdata.value[e].location.split(",")[0];
  clear();

  // 重新渲染下地(刷新图标位置)
  int();
};

let shuru = debounce(function () {
  if (!/^\s+$/.test(seachtext.value) && seachtext.value != "") {
    seach()
  }
});

let seach = async function () {
  // 搜索要找的地方，如果要返回距离当前中心点的距离 要仅在 周边搜索 模式的时候有值返回
  let res = await axios.get(`https://restapi.amap.com/v3/place/text?key=e9c3882efb9588d0b87733a2b2b7ff38&keywords=${seachtext.value}`)
  if (res.data.pois) {
    seachdata.value = res.data.pois;
  } else {
    seachdata.value = [];
  }
};

// 点击确认
let qr = function () {
  show.value = false;

  // 返回位置信息给父组件,父组件接受方式不变
  emits("cityinfo", this.city);
};

// 点击取消
let qx = function () {
  show.value = false;
};
onMounted(() => {
  // console.log(props.jwd)
  if (props.jwd) {
    city.value.position.lat = props.jwd.lat;
    city.value.position.lng = props.jwd.lng;
  }
})
defineExpose({shows})
</script>

<style lang="less" scoped>
:deep(.van-icon-success) {
  font-size: 50px;
}

.mapwps {
  z-index: 9999;

  .wps {
    position: relative;
    width: 100vw;

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
        padding: 10px 16px;
        box-sizing: border-box;
        border-radius: 10px;
      }

      .r {
        background: #2cdb71;
        padding: 10px 16px;
        box-sizing: border-box;
        border-radius: 10px;
        color: white;
      }
    }

    .footbar {
      box-shadow: 0px 2px 5px 0px #0000001a;
      position: absolute;
      padding: 30px;
      bottom: env(safe-area-inset-bottom);
      left: 0;
      z-index: 999;
      width: calc(100% - 60px);
      background: white;
      font-size: 37px;
      // display: flex;
      // align-items: center;
      .t {
        display: flex;
        align-items: center;
        width: 100%;
        background: #eeeeee;
        padding: 15px 0;
        // margin-top: 15px;
        margin-bottom: 50px;
        border-radius: 5px;
        justify-content: center;

        .van-icon-search {
          font-size: 16px;
        }

        div {
          margin-left: 5px;
          font-size: 16px;
          color: #747474;
        }
      }

      .b {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;

        .l {
          flex: auto;

          .l_t {
          }

          .l_b {
            color: #747474;
            margin-top: 10px;
          }
        }

        .r {
          flex-shrink: 0;
          margin-left: 15px;
        }
      }
    }

    .mappoint {
      position: absolute;
      width: 21px;
      height: 30px;
      z-index: 999999;
      left: 50%;
      top: calc(50% - 25px);
      transform: translate(-50%, -50%);
    }
  }

  .map {
    width: 100%;
    height: 100%;
    z-index: 99;
  }

  #right {
    top: 0;
    position: fixed;
  }

  .seachwps {
    position: fixed;
    bottom: 0;
    width: 80vw;
    border-radius: 10px;
    background: white;
    left: 50%;
    // top: 50%;
    bottom: 50%;
    transform: translate(-50%, 50%);
    z-index: 8959;
    padding: 15px;
    // overflow: hidden;
    .t {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;

      .l {
        padding: 5px 0;
        border-radius: 10px;
        flex: auto;
        background: #eeeeee;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .l_l {
          flex-shrink: 0;
          margin: 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;

          .van-icon-search {
            font-size: 16px;
          }
        }

        .l_r {
          flex: auto;

          input {
            width: 100%;
            border: none;
            box-sizing: border-box;
            background: none;
          }
        }
      }

      .r {
        margin-left: 15px;
        flex-shrink: 0;
        color: #4b5466;
      }
    }

    .b {
      // background: ;
      margin-top: 30px;
      height: 40vh;
      overflow: auto;
      // -webkit-overflow-scrolling: touch;
      .bwp {
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #f7f7f7;
        overflow: hidden;

        .t_t {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
        }

        .b_b {
          margin-top: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 16px;
          color: #8b8b8b;
        }
      }

      .nolist {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      }
    }
  }

  // 遮罩层层级
  .van-overlay {
    z-index: 9999;
  }
}
</style>

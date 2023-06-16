<template>
  <div class="root">
    <div class="navbar" :style="{background:store.background}">
      <div class="sidebar-button">
        <i class="iconfont icon-gengduo"></i>
        <!--      <img src="@/assets/img/topbar/mroe.png" alt="">-->
      </div>
      <a class="name" href=""><span :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'">Yabaizzz</span></a>
      <div class="links">
        <div class="color-picker" v-click-outside="onClickOutside">
          <!--        <img src="@/assets/img/topbar/colo.png" alt="">-->
          <i @click="clickColor" class="iconfont icon-color-filling"></i>
          <div class="color-picker-menu" id="chooseColor"
               :style='{...donghua}'>
            <div class="mode-options"
                 :style="{background:store.background}">
              <h4 class="title" :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'">Choose mode</h4>
              <ul class="color-mode-options">
                <li class="dark" :class="act===0?'active':''" @click="colorChange(0)">dark</li>
                <li class="auto" :class="act===1?'active':''" @click="colorChange(1)">auto</li>
                <li class="light" :class="act===2?'active':''" @click="colorChange(2)">light</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="search-box">
          <i class="iconfont icon-search"></i>
          <input :style="act===0?'border-color:#333':''" type="text" id="inp">
        </div>
        <nav class="nav-links can-hide">
          <div class="nav-item">
            <div class="dropdown-wrapper">
              <a class="dropdown-title">
              <span :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'" class="title"><i
                  class="iconfont icon-WEBqianduan"></i>
                前端
              </span>
                <span class="arrow right"></span>
              </a>
              <ul class="nav-dropdown">
                <li class="dropdown-item">
                  <a href="">VuePress</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="nav-item">
            <a @click="goUrl">
              <i class="iconfont icon-docker"></i>
              <span :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'">Docker</span>
            </a>
          </div>
          <div :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'" class="nav-item">
            <a href="">
              <i class="iconfont icon-work-filling"></i>
              <span :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'">工作</span>
            </a>
          </div>
          <div :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'" class="nav-item">
            <a href="">
              <i class="iconfont icon-document"></i>
              <span :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'">书籍</span>
            </a>
          </div>
          <div :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'" class="nav-item">
            <a href="">
              <i class="iconfont icon-date"></i>
              <span :style="act===0?'color:rgba(255,255,255,.8)':'color:#333'">时间轴</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {mainStore} from "@/pinia";

const store = mainStore()
const router = useRouter()
const route = useRoute()
const act = ref(1)
const isShow = ref(false)
const donghua = ref({
  transform: 'translate(-50%, 0px)',
  opacity: 0,
  display: 'none',
})


function goUrl() {
  router.push('/home/doctor')
}

//点击div外部,隐藏弹出框
function onClickOutside(e) {
  donghua.value = {
    transform: 'translate(-50%, 0px)',
    opacity: 0,
  }
  setTimeout(() => {
    donghua.value.display = 'none'
  }, 200)
}

//弹出选择mode框
function clickColor() {
  isShow.value = !isShow.value
  if (isShow.value) {
    donghua.value = {
      transform: ' translate(-50%, -10px)',
      opacity: 1
    }
  }
  if (!isShow.value) {
    donghua.value = {
      transform: `translate(-50%, 0px)`,
      opacity: 0,
      // display: 'none',
    }
    setTimeout(() => {
      donghua.value.display = 'none'
    }, 200)
  }
}

//更改mode
function colorChange(e) {
  act.value = e
  if (e === 0) {
    localStorage.setItem('mode', 'dark')
    store.background = '#181818'
  }
  if (e === 1) {
    localStorage.setItem('mode', 'auto')
    let date = new Date()
    let h = date.getHours() //小时
    if (h >= 7 && h <= 18) {
      //白天
      store.background = '#fff'
    } else {
      //黑天
      store.background = '#181818'
    }
  }
  if (e === 2) {
    localStorage.setItem('mode', 'light')
    store.background = '#fff'
  }
}

onMounted(() => {
  if (localStorage.getItem('mode')) {
    let m = localStorage.getItem('mode')
    act.value = m === 'dark' ? 0 : m === 'auto' ? 1 : 2
  }
})

</script>

<style scoped lang="less">
.root {
  //顶部top栏
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    right: 0;
    height: 135px;
    box-sizing: border-box;
    padding: 26.25px 56.25px;
    line-height: 82.5px;
    box-shadow: 0 1px 1px #9d9d9d;

    .sidebar-button {
      cursor: pointer;
      display: none;
      width: 46.875px;
      height: 46.875px;
      position: absolute;
      padding: 22.5px;
      top: 28.5px;
      left: 37.5px;

      i {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }

    .name {
      display: inline-block;

      span {
        display: inline-block;
        font-size: 45px;
        font-weight: 600;
        position: relative;
      }
    }

    //宽度低于750px时
    @media (max-width: 719px) {
      .sidebar-button {
        display: inline-block;
      }

      a {
      }
    }

    .links {
      padding-left: 56.25px;
      box-sizing: border-box;
      white-space: nowrap;
      font-size: 33.75px;
      position: absolute;
      right: 56.25px;
      top: 26.25px;
      display: flex;
      //background-color: #ffffff;


      .color-picker {
        position: relative;
        margin-right: 37.5px;
        cursor: pointer;

        .iconfont {
          font-size: 50px;
        }

        .color-picker-menu {
          transition: transform 0.25s ease-in-out 0s, opacity 0.25s ease-in-out 0s;
          position: absolute;
          top: 90px;
          left: 50%;
          z-index: 150;

          .mode-options {
            min-width: 125PX;
            margin: 0;
            padding: 37.5px;
            box-shadow: 0 1PX 8PX 0 rgba(0, 0, 0, 0.1);
            border-radius: 9px;

            h4 {
              line-height: 1.25;
              margin: 0;
            }

            .title {
              margin-top: 0;
              margin-bottom: 22.5px;
              font-weight: 700;
              color: #333;
            }

            .color-mode-options {
              display: flex;
              flex-wrap: wrap;
            }

            ul {
              list-style-type: none;
              margin: 0;
              padding: 0;

              .active {
                background-color: #3eaf7c;
                color: #fff;
              }

              .dark {
                border-radius: 9px 0 0 9px;
                border-left: 1px solid #666;
              }

              li {
                flex: 1;
                text-align: center;
                font-size: 12PX;
                line-height: 18PX;
                padding: 3PX 6PX;
                border-top: 1px solid #666;
                border-bottom: 1px solid #666;
                cursor: pointer;
              }

              li:not(.active) {
                border-right: 1px solid #666;
              }
            }
          }
        }
      }

      .search-box {
        flex: 0 0 auto;
        vertical-align: top;
        display: inline-block;
        position: relative;
        margin-right: 37.5px;

        .iconfont {
          font-size: 50px;
        }

        i {
          position: absolute;
          top: 0;
          left: 22.5px;
        }

        #inp {
          cursor: text;
          width: 375px;
          height: 75px;
          color: #4e6e8e;
          outline: none;
          display: inline-block;
          line-height: 75px;
          padding: 0 18.75px 0 75px;
          font-size: 33.75px;
          transition: all .2s ease;
          background: transparent;
          background-size: 37.5px;
          border-radius: 9.375px;
          border: 1px solid #EAECEF;

        }

        #inp:focus {
          cursor: auto;
          outline: 1px solid #3eaf7c;
        }
      }

      //最大宽度低于959px时，改变input框样式
      @media (max-width: 959px) {
        .search-box #inp {
          cursor: pointer;
          width: 0;
          border-color: transparent;
          position: relative;
        }

        .search-box #inp:focus {
          cursor: text;
          left: 0;
          width: 375px;
        }


      }

      .nav-links {
        display: inline-block;

        .nav-item {
          position: relative;
          display: inline-block;
          margin-left: 56.25px;
          line-height: 75px;
          cursor: pointer;

          a {
            line-height: 52.5px;
            font-weight: 500;

            .icon-WEBqianduan:before, .icon-docker:before, .icon-work-filling:before, .icon-document:before, .icon-date:before {
              font-size: 16PX !important;
            }
          }

          a:hover {
            border-color: transparent;
            color: #3eaf7c !important;

            .icon-WEBqianduan:before, .icon-docker:before, .icon-work-filling:before, .icon-document:before, .icon-date:before {
              color: #3eaf7c
            }

            span {
              color: #3eaf7c !important;
            }
          }

          &:first-child {
            margin-left: 0;

            &:hover {
              .nav-dropdown {
                display: block;
              }
            }
          }


          .dropdown-wrapper {

            .dropdown-title {
              display: block;

              .title {
                display: inline-block;
              }

              &:hover {
                border-color: transparent;

                .icon-WEBqianduan:before {
                  color: #3eaf7c
                }

                color: #3eaf7c;
              }
            }

            .nav-dropdown {

              .dropdown-item {
                line-height: 64px;

                a {
                  display: block;
                  line-height: 64px;
                  position: relative;
                  border-bottom: none;
                  font-weight: 400;
                  margin-bottom: 0;
                  padding: 0 56px 0 47px;
                }
              }
            }

            @media (min-width: 719px) {
              .nav-dropdown {
                display: none;
                height: auto !important;
                box-sizing: border-box;
                max-height: calc(100vh - 101.25px);
                overflow-y: auto;
                position: absolute;
                top: 100%;
                right: 0;
                background-color: #ffffff;
                padding: 22.5px 0;
                box-shadow: 0 0 2px 2px #F1F1F1;
                text-align: left;
                border-radius: 9.375px;
                white-space: nowrap;
                margin: 0;
                line-height: 2.2;
              }
            }

          }

          @media (min-width: 719px) {
            .dropdown-wrapper {
              height: 67.5px;
            }
          }
        }
      }

      //最大宽度低于719px时，改变
      @media (max-width: 719px) {
        .can-hide {
          display: none;
        }
      }
    }

    //最大宽度低于719px时，改变
    @media (max-width: 719px) {
      .links {
        padding-left: 7.5px;
      }
    }
    //最小宽度高于719px时，改变
    @media (min-width: 719px) {
      .links {
        //width: 66%;
      }
    }

  }

  @media (max-width: 719px) {
    .navbar {
      padding-left: 150px;
    }
  }
}
</style>

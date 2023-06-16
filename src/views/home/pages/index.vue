<template>
  <div class="bg">
    <div class="home-blog">
      <div class="hero "
           style="text-align:center;overflow:hidden;background:url('https://cleaner.love/assets/img/bg.2cfdbb33.svg') center/cover no-repeat;">
        <div class="">
          <img class="hero-img animated animate__slideInDown " src="@/assets/img/logo.jpg" alt="">
          <p style="" class="description animated animate__slideInDown ">“拔刀能留住落樱吗”</p>
        </div>
      </div>
    </div>
    <div class="home-blog-wrapper">
      <div class="blog-list animated animate__backInLeft">
        <div class="abstract-wrapper">
          <div class="abstract-item" v-for="item in datalist" :key="item.title">
            <div class="title"><a href=""
                                  :style="store.background=='#181818'?'color:#fff':'color:#181818'">{{ item.title }}</a>
            </div>
            <div class="abstract"></div>
            <div class="">
              <i class="iconfont icon-a-zidingyirenwu"><span>{{ item.author }}</span></i>
              <i class="iconfont icon-date"><span>{{ item.date }}</span></i>
              <i class="iconfont icon-biaoqian"><span>{{ item.label }}</span></i>
            </div>
          </div>
          <div class="pagetion" :style="{background:store.background}">
            <div class="pagation-list" :style="store.background=='#181818'?'color:#fff':'color:#181818'">
              <span class="jump" :style="[textStyle]" v-show="page!=1" @click="clickPage(1)">上一页</span>
              <span class="jump " :class="item === currentpage?'bgprimary':''" v-for="item in allpage"
                    :style="[textStyle]" @click="numclick(item)" :key="item">{{ item }}</span>
              <span class="jump" :style="[textStyle]" v-show="page<allpage" @click="clickPage(2)">下一页</span>
              <span class="jumppoint">跳转至</span>
              <span class="jumpinp"><input :style="{background:store.background,...textStyle}" v-model="inputValue"
                                           type="number"></span>
              <span class="jump gobtn" :style="[textStyle]" @click="numclick(inputValue)">前往</span>
            </div>
          </div>
        </div>
      </div>
      <div class="info-wrapper animated animate__backInRight" :style="{background:store.background}">
        <div class="personal-info-wrapper">
          <img class="personal-img" src="@/assets/img/avator.jpg" alt="">
          <div class="num">
            <div>
              <h3>9</h3>
              <h6>文章</h6>
            </div>
            <div>
              <h3>4</h3>
              <h6>标签</h6>
            </div>
          </div>
          <ul class="social-links">
            <li class="social-item">
              <i class="iconfont icon-github-fill"></i>
            </li>
            <li class="social-item">
              <i class="iconfont icon-juejin"></i>
            </li>
          </ul>
        </div>
        <h4>分类</h4>
        <ul class="category-wrapper">
          <li class="category-item">
            <a href="">
              <span>后端</span>
              <span>3</span>
            </a>
          </li>
          <li class="category-item">
            <a href="">
              <span>传统文化</span>
              <span>4</span>
            </a>
          </li>
          <li class="category-item">
            <a href="">
              <span>前端</span>
              <span>2</span>
            </a>
          </li>
        </ul>
        <hr>
        <h4>标签</h4>
        <div class="tags"></div>
      </div>
    </div>
    <div class="home-center content__default"></div>
  </div>
</template>


<script setup>
import {mainStore} from "@/pinia";
import {onMounted, reactive, ref, getCurrentInstance, watch} from "vue";
import {ElMessage} from "element-plus";
import {throttle} from '@/util/api'

const {proxy} = getCurrentInstance();
let store = mainStore()
let datalist = ref([])
let allpage = ref(null) //接口获取的当前总页数
let currentpage = ref(null) //接口获取的当前页数
let page = ref(1) //用于加载下一页
let inputValue = ref(null)
let textStyle = ref({
  'box-shadow': '',
  'border': ''
})

//节流
let numclick = throttle(function (e) {
  console.log(e)
  if (page.value === e) {
//当前页数
    return ElMessage.error(`当前页码就是${e}!`)
  }
  if (e > allpage.value || e <= 0) {
    return ElMessage.error('请输入正确的页码!')
  }
  page.value = e
  getData()
}, 1000)

function getData() {
//用setTimeout模拟网络请求延迟
//Math.round(Math.random() * 5 + 1) 随机生成5-10的数字
  setTimeout(() => {
    proxy.$axios({
      url: '/getList',
      method: 'get',
      params: {
        page: page.value
      }
    }).then((res) => {
      console.log('请求成功!', res)
      datalist.value = res.data.dataList
      allpage.value = res.data.allpage //总页数
      currentpage.value = res.data.currentPage * 1 //当前页数
      inputValue.value = null
    });
  }, Math.round(Math.random() * 5 + 5))

}

//点击上一页 下一页
function clickPage(e) {
//上一页
  if (e === 1) {
    page.value -= 1
    getData()
  }
//下一页
  if (e === 2) {
    page.value += 1
    getData()
  }
}

onMounted(() => {
  getData()
  if (store.background == '#181818') {
    textStyle.value['box-shadow'] = ' 0 1px 8px 0 rgba(0, 0, 0, .6)'
    textStyle.value.border = '1px solid rgba(0, 0, 0, .3)!important'
  } else {
    textStyle.value['box-shadow'] = '0 1px 8px 0 rgba(0, 0, 0, 0.1)'
    textStyle.value.border = '1px solid #eaecef!important'
  }
})

watch(() => store.background, (newV, oldV) => {
  if (newV === '#181818') {
    textStyle.value['box-shadow'] = ' 0 1px 8px 0 rgba(0, 0, 0, .6)'
    textStyle.value.border = '1px solid rgba(0, 0, 0, .3)!important'
  } else {
    textStyle.value['box-shadow'] = '0 1px 8px 0 rgba(0, 0, 0, 0.1)'
    textStyle.value.border = '1px solid #ffffff!important'
  }
})
</script>

<style scoped lang="less">
.bg {
  width: 100vw;

  .home-blog {
    padding: 0;
    margin: 0 auto;

    .hero {
      margin: 135px auto 0;
      position: relative;
      box-sizing: border-box;
      padding: 0 20px;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;

      .hero-img {
        max-width: 500PX;
        display: block;
        margin: -450px auto 56px !important;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 18px;
      }

      .description {
        margin-top: 70px;
        line-height: 1.3;
        font-family: cursive;
        font-size: 75px !important;
      }
    }

    @media (max-width: 719px) {
      .hero {
        height: 450PX;

        .hero-img {
          max-height: 210PX;
          margin: 75px auto 45px
        }

        .description {
          font-size: 45px;
        }
      }
    }
  }

  .home-blog-wrapper {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20PX;
    max-width: 1126PX;

    .blog-list {
      flex: auto;
      width: 0;

      .abstract-wrapper {
        width: 100%;

        .abstract-item {
          position: relative;
          margin: 0 auto 20PX;
          padding: 16PX 20PX;
          width: 100%;
          overflow: hidden;
          border-radius: 9px;
          box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);;
          box-sizing: border-box;
          transition: all .3s;
          background-color: rgba(172, 220, 253, .239) !important;
          cursor: pointer;

          &:hover {
            transform: scale(1.02);
            transition: all .5s;
            box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
          }

          .title {
            position: relative;
            font-size: 48px;
            line-height: 46PX;
            display: inline-block;

            a:hover {
              color: #3eaf7c;
            }

            &:hover:after {
              visibility: visible;
              transform: scaleX(1);

            }

            &:after {
              content: "";
              position: absolute;
              width: 100%;
              height: 2.5PX;
              bottom: 0;
              left: 0;
              background-color: #3eaf7c;
              visibility: hidden;
              transform: scaleX(0);
              transition: .3s ease-in-out;
            }
          }

          .iconfont {
            display: inline-block;
            line-height: 56px;


            span {
              margin-left: 18.75px;
              font-size: 13PX;
              color: #7F7F7F;
            }
          }

          .iconfont:not(:last-child) {
            margin-right: 37.5px;
          }
        }

        .pagetion {
          font-weight: 700;
          text-align: center;
          color: #242424;
          margin: 20PX auto 0;
          background-color: #FFFFFF;

          .pagation-list {
            font-size: 0;
            line-height: 50PX;

            span {
              font-size: 14PX;
            }

            .jump {
              padding: 5PX 8PX;
              border-radius: 4PX;
              cursor: pointer;
              margin-left: 5PX;
            }

            .jump, input {
              //box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
              //border: 1px solid #eaecef !important;
            }

            //选中的页码
            .bgprimary {
              cursor: default;
              color: #fff;
              background: #3eaf7c;
            }

            //跳转至
            .jumppoint {
              margin: 0 10PX 0 15PX;
            }

            //input框
            .jumpinp {

              input {
                width: 30PX;
                height: 26PX;
                background-color: #FFFFFF;
                font-size: 13PX;
                border-radius: 4PX;
                text-align: center;
                outline: none;
              }

            }

            //前往
            .gobtn {
            }

            @media (min-width: 719px) {
              .jumpinp {

                input {
                  width: 55PX;
                }

              }

              .jumppoint {
                margin: 0 10PX 0 30PX;
              }
            }
          }
        }
      }
    }

    .info-wrapper {
      cursor: pointer;
      position: sticky;
      top: 70PX;
      overflow: hidden;
      transition: all .3s;
      margin-left: 15PX;
      flex: 0 0 300PX;
      height: auto;
      box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);;
      border-radius: 9PX;
      box-sizing: border-box;
      padding: 0 15PX;
      background: #FFFFFF;

      hr {
        border: 0;
        border-top: 1px solid #eaecef;
      }

      .personal-info-wrapper {
        .personal-img {
          display: block;
          margin: 75px auto 37.5px;
          width: 225px;
          height: 225px;
          border-radius: 50%;
        }

        .num {
          display: flex;
          margin: 0 auto 1rem;
          width: 80%;

          div {
            text-align: center;
            flex: 0 0 50%;

            &:first-child {
              border-right: 1px solid #333;
            }

            h3 {
              font-size: 45px;
              font-weight: 500;
              line-height: 1.25;
              margin: 0 0 0.6rem;
              //color: #242424;
            }

            h6 {
              margin: 0;
              //color: #242424;
            }
          }


        }

        .social-links {
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          padding: 10PX;
          line-height: 2.2;

          li {
            width: 39PX;
            height: 36PX;
            line-height: 36PX;
            text-align: center;
            list-style: none;
            transition: transform .3s;
          }
        }
      }

      .category-wrapper {
        margin: 15PX 0;
        line-height: 2.2;

        li {
          &:hover {
            transform: scale(1.02);
            transition: all .5s;
            box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);

            a {
              color: #3EAF7C;
            }
          }
        }

        .category-item {
          margin-bottom: 15px;
          padding: 15px 30px;
          line-height: 2.2;
          transition: all .5s;
          border-radius: 9px;
          background-color: #FFFFFF;
          box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2);

          a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #333;

            span:last-child {
              width: 60px;
              height: 60px;
              line-height: 60px;
              text-align: center;
              background-color: red;
              font-size: 13PX;
              color: #FFFFFF;
              border-radius: 9px;
              font-weight: 550;
            }
          }

        }
      }

      @media (max-width: 719px) {

        .personal-info-wrapper {
          display: none;
        }
      }
    }

  }

  .content__default:not(.custom) {
    max-width: 860PX;
    margin: 0 auto;
    padding: 75px 93.75px;
  }

  @media (max-width: 959px) {
    .content__default:not(.custom) {
      padding: 75px;
    }
  }

  @media (max-width: 719px) {
    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        margin-left: 0;
      }
    }
  }

}
</style>
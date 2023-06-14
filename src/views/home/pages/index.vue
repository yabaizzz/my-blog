<template>
  <div class="bg">
    <div class="home-blog">
      <div class="hero "
           style="text-align:center;overflow:hidden;background:url('https://cleaner.love/assets/img/bg.2cfdbb33.svg') center/cover no-repeat;">
        <div class="">
          <img class="hero-img animated animate__slideInDown " src="https://cleaner.love/logo.jpg" alt="">
          <p style="" class="description animated animate__slideInDown ">“拔刀能留住落樱吗”</p>
        </div>
      </div>
    </div>
    <div class="home-blog-wrapper">
      <div class="blog-list">
        <div class="abstract-wrapper">
          <div class="abstract-item" v-for="item in datalist" :key="item.label2">
            <div class="title"><a href="">{{ item.title }}</a></div>
            <div class="abstract"></div>
            <div class="">
              <i class="iconfont icon-a-zidingyirenwu"><span>{{ item.author }}</span></i>
              <i class="iconfont icon-date"><span>{{ item.date }}</span></i>
              <i class="iconfont icon-biaoqian"><span>{{ item.label }}</span></i>
            </div>
          </div>
        </div>
      </div>
      <div class="info-wrapper">
        <div class="personal-info-wrapper">
          <img class="personal-img" src="https://cleaner.love/avator.jpg" alt="">
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
        <ul class="category-wrapper"></ul>
        <hr>
        <h4>标签</h4>
        <div class="tags"></div>
      </div>
    </div>
    <div class="home-center content__default"></div>
  </div>
</template>


<script setup>
import {onMounted, reactive, ref, getCurrentInstance} from "vue";

const {proxy} = getCurrentInstance();

let datalist = ref([])
onMounted(() => {
  proxy.$axios({
    url: '/getList',
    method: 'get',
    params: {
      page: 1
    }
  }).then((res) => {
    console.log('请求成功!', res.data.dataList)
    datalist.value = res.data.dataList
  });
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

      &:hover {
        transform: scale(1.02);
        transition: all .5s;
        box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
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
              color: #242424;
            }

            h6 {
              margin: 0;
              color: #242424;
            }
          }


        }

        .social-links {
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          padding: 10PX;
          line-height: 2.2;
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
    }
  }

}
</style>
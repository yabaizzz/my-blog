<template>
  <header class="navbar">
    <div class="sidebar-button">
      <img src="@/assets/img/topbar/mroe.png" alt="">
    </div>
    <a href="/">
      <span>Yabaiz</span>
    </a>
    <div class="link">
      <div class="color-picker">
        <img src="@/assets/img/topbar/colo.png" alt="">
      </div>
      <div class="search-box">
        <img src="@/assets/img/topbar/search.png" alt="">
        <input type="text">
      </div>
      <div class="nav-links can-hide">
        <div class="nav-item"></div>
      </div>
    </div>
  </header>
</template>
<script setup>

</script>
<style scoped lang="less">

@media (max-width: 719px) {
  .navbar {
    padding: 22px 48px !important;
    padding-left: 128px !important;
  }
}

.navbar {
  z-index: 20;
  right: 0;
  height: 116px;
  box-sizing: border-box;
  padding: 22px 48px;
  line-height: 76px;
  box-shadow: 4px 4px 8px #D9D9D9;


  background: #ffffff;


  .sidebar-button {
    cursor: pointer;
    display: none;
    width: 80px;
    height: 80px;
    position: absolute;
    padding: 20px;
    box-sizing: border-box;
    top: 20px;
    left: 32px;

    img {
      display: block;
      width: 40px;
      height: 40px;
    }
  }

  //宽度小于719px时
  @media (max-width: 719px) {
    .sidebar-button {
      display: block;
    }
  }

  a {
    font-size: 38px;
    font-weight: 600;
  }

  .link {
    padding-left: 48px;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 30px;
    position: absolute;
    right: 48px;
    top: 24px;
    display: flex;
    background: #fff;

    .color-picker {
      display: flex;
      align-items: center;
      margin-right: 32px;
      cursor: pointer;

      img {
        width: 44px;
        height: 46px;
      }
    }

    .search-box {
      display: flex;
      align-items: center;
      margin-right: 32px;
      position: relative;

      img {
        width: 52px;
        height: 52px;
        position: absolute;
        left: 5px;
        top: 5px;
      }


      input {
        cursor: text;
        width: 340px;
        height: 64px;
        color: #4e6e8e;
        display: inline-block;
        border: 1px solid #D9D9D9;
        border-radius: 0.25rem;
        font-size: 30px;
        line-height: 64px;
        padding: 0 0px 0 64px;
        outline: none;
        transition: all .2s ease;
        background: transparent;
        background-size: 32px;
      }

      input:focus {
        width: 340px;
        border-color: #3eaf7c
      }

      @media (max-width: 959px) {
        input {
          cursor: pointer;
          width: 0;
          border-color: transparent;
          position: relative;
        }

        input:focus {
          width: 340px;
        }
      }
    }
  }

  //宽度大于719时
  @media screen and (min-width: 719px) {
    .link {
      max-width: 90%;
    }
  }
  @media (max-width: 719px) {
    .link {
      padding-left: 10px;
    }
  }
}

</style>
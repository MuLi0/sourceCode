<template>
  <!-- 顶部搜索框，开始 -->
  <div class='headerSearchWrap'>
    <img class='logo' src="https://res.vmallres.com/portal/1.11.3.300/h5/images/logo_red.png" />

    <!-- 搜索框按钮 -->
    <div class='searchBtn'>
      <svg class='magnifierLogo' width="16" height="16" viewBox="0 0 1024 1024">
        <path
          d="M744.758 704.861l143.275 143.25c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-143.686-143.691c16.388-13.702 31.662-28.692 45.666-44.814zM442.667 85.333c197.35 0 357.333 159.984 357.333 357.333 0 88.502-32.174 169.489-85.464 231.903v0l-0.944 1.101c-2.851 3.312-5.762 6.571-8.731 9.776l9.674-10.877c-3.963 4.641-8.042 9.179-12.233 13.61-2.5 2.643-5.032 5.239-7.602 7.796-0.895 0.89-1.782 1.764-2.674 2.633-2.996 2.92-6.063 5.806-9.18 8.637-1.208 1.097-2.431 2.193-3.663 3.282-2.857 2.525-5.744 4.995-8.67 7.419-0.589 0.488-1.169 0.965-1.75 1.441-61.596 50.386-140.317 80.613-226.098 80.613-197.35 0-357.333-159.984-357.333-357.333s159.984-357.333 357.333-357.333zM442.667 149.333c-162.004 0-293.333 131.33-293.333 293.333s131.33 293.333 293.333 293.333c162.004 0 293.333-131.33 293.333-293.333s-131.33-293.333-293.333-293.333z"
          fill="#000000" fill-opacity="0.6"></path>
      </svg>
      <p>无忧服务，华为手机牛b</p>
    </div>

    <svg class='accountLogo' width="24" height="24" viewBox="0 0 1024 1024">
      <path
        d="M661.333 128c176.731 0 320 143.269 320 320 0 174.964-140.418 317.131-314.708 319.957l-5.292 0.043h-72.085l-161.287 161.294c-11.997 11.997-31.15 12.477-43.719 1.44l-1.536-1.44c-11.997-11.997-12.477-31.15-1.44-43.719l1.44-1.536 170.667-170.667c5.501-5.501 12.799-8.792 20.514-9.303l2.113-0.070h85.333c141.385 0 256-114.615 256-256 0-139.971-112.334-253.705-251.767-255.966l-302.9-0.034c-141.385 0-256 114.615-256 256 0 139.971 112.334 253.705 251.767 255.966l4.233 0.034h32c17.673 0 32 14.327 32 32 0 17.042-13.322 30.972-30.12 31.946l-1.88 0.054h-32c-176.731 0-320-143.269-320-320 0-174.964 140.418-317.131 314.708-319.957l5.292-0.043h298.667zM298.667 394.667c29.455 0 53.333 23.878 53.333 53.333s-23.878 53.333-53.333 53.333c-29.455 0-53.333-23.878-53.333-53.333s23.878-53.333 53.333-53.333zM512 394.667c29.455 0 53.333 23.878 53.333 53.333s-23.878 53.333-53.333 53.333c-29.455 0-53.333-23.878-53.333-53.333s23.878-53.333 53.333-53.333zM725.333 394.667c29.455 0 53.333 23.878 53.333 53.333s-23.878 53.333-53.333 53.333c-29.455 0-53.333-23.878-53.333-53.333s23.878-53.333 53.333-53.333z"
        fill="#000000" fill-opacity="1"></path>
    </svg>

    <!-- 商城会员，登录图标 -->
    <img class='mallMember'
      src="https://res.vmallres.com/pimages/uomcdn/CN/cms/202111/F4EF91EB72D3D82F0CA772243C6A031E.png" />
  </div>
  <!-- 顶部搜索框，结束 -->

  <!-- 产品类别按钮，开始 -->
  <div class='goodsTypeBtn'>
    <van-tabs v-model:active="goodsTypeVal">
      <van-tab v-for='n in goodsTypeDataObj.arr' :title="n.txt" />
    </van-tabs>
  </div>
  <!-- 产品类别按钮，结束 -->

  <!-- 轮播图，开始 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for='n in swipeObj.arr'>
      <img :src="n.imgurl" />
    </van-swipe-item>
  </van-swipe>
  <!-- 轮播图，结束 -->

  <!-- 宫格组件，可拖动的产品类型按钮，开始 -->
  <div class='goodsDragBtnList'>
    <!-- 只用于产生滚动的容器，其width为200%; -->
    <div style='width:200%;'>
      <van-grid :column-num="8">
        <van-grid-item v-for='n in gridGoodsObj.arr'>
          <img :src="n.imgurl" />
          <p> {{ n.txt }} </p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
  <!-- 宫格组件，可拖动的产品类型按钮，结束 -->

  <!-- 限时购，开始 -->
  <div class='limitBuy'>
    <p class='title_1'>限时购</p>
    <em class='title_2'>好货限时抢</em>

    <!-- 倒计时组件：count-down，开始 -->
    <van-count-down class='countDownSty' :time="countDownTime">
      <template #default="timeData">
        <span class="block">{{ timeData.hours }}</span>
        <span class="colon">:</span>
        <span class="block">{{ timeData.minutes }}</span>
        <span class="colon">:</span>
        <span class="block">{{ timeData.seconds }}</span>
      </template>
    </van-count-down>
    <!-- 倒计时组件：count-down，结束 -->

    <!-- 限时购，四个产品 -->
    <van-row class='limitGoodsSty'>
      <van-col span="6" v-for='n in limitGoodsObj.arr'>
        <img :src="n.imgurl" />
        <p class='price_1'> {{ n.price }} </p>
        <b class='price_2'> {{ n.ol_price }} </b>
      </van-col>
    </van-row>
  </div>
  <!-- 限时购，结束 -->

  <!-- 广告位，开始 -->
  <div class='adSpace'>
    <img src="https://res.vmallres.com/uomcdn/CN/cms/202205/3AA4039F637FDCF25150E41F521ED9BD.gif" />
  </div>
  <!-- 广告位，结束 -->

  <!-- footer底部导航栏 -->
  <footerTabber />
</template>

<script>
import axios from 'axios'
import requestFn from '@/utils/https'
import { ref, reactive } from 'vue'
import footerTabber from '@/components/footerTabber'

export default {
  name: 'IndexWrap',
  data() {
    return {
      msg: 'vmall 首页'
    }
  },
  components: {
    footerTabber
  },
  setup() {
    // footerBar的变红按钮的索引重置，每次新开项目，都是“首页按钮”为红色
    localStorage.setItem('switchTabVal', 0);

    let goodsTypeVal = ref(0)

    // 产品类别按钮
    let goodsTypeDataObj = reactive({ arr: [] })
    requestFn({
      url: '/goodsTypeData',
      method: 'get'
    }).then(_d => {
      // console.log( _d.data )
      goodsTypeDataObj.arr = _d.data;
    });

    // 轮播图
    let swipeObj = reactive({ arr: [] })
    requestFn({
      url: '/swipeData',
      method: 'get'
    })
      .then(_d => {
        // console.log( _d.data )
        swipeObj.arr = _d.data;
      });

    // 宫格组件，可拖动的产品类型按钮
    let gridGoodsObj = reactive({ arr: [] })
    requestFn({
      url: '/gridGoodsData',
      method: 'get'
    })
      .then(_d => {
        // console.log( _d.data )
        gridGoodsObj.arr = _d.data;
      });

    // 倒计时组件
    const countDownTime = ref(30 * 60 * 60 * 1000);

    // 限时购的四个商品
    let limitGoodsObj = reactive({ arr: [] })
    requestFn({
      url: '/limieGoodsData',
      method: 'get'
    })
      .then(_d => {
        // console.log( _d.data )
        limitGoodsObj.arr = _d.data;
      });

    return {
      goodsTypeVal,
      goodsTypeDataObj,
      swipeObj,
      gridGoodsObj,
      countDownTime,
      limitGoodsObj
    }
  }
}
</script>

<style scoped>
/* 顶部搜索框，开始 */
.headerSearchWrap {
  padding: 0 16px;
  position: relative;
  height: 60px;
}

.headerSearchWrap img.logo {
  position: absolute;
  left: 16px;
  top: 18px;
}

.headerSearchWrap .accountLogo {
  position: absolute;
  right: 57px;
  top: 18px;
}

.headerSearchWrap img.mallMember {
  position: absolute;
  right: 16px;
  top: 18px;
  display: block;
  width: 24px;
  height: 24px;
}

.searchBtn {
  position: absolute;
  top: 10px;
  left: 122px;
  width: 159px;
  height: 40px;
  background: #c3c3c3;
  border-radius: 20px;
  overflow: hidden;
}

.searchBtn p {
  position: absolute;
  top: 12px;
  left: 30px;
}

.magnifierLogo {
  position: absolute;
  left: 10px;
  top: 13px;
}

/* 顶部搜索框，结束 */

/* 产品类别按钮，开始 */
.goodsTypeBtn {
  margin: auto;
}

.goodsTypeBtn ::v-deep .van-tab {
  background: #c3c3c3;
  margin-right: 8px;
  height: 30px;
  border-radius: 20px;
}

.goodsTypeBtn ::v-deep .van-tabs__line {
  display: none;
}

/* 产品类别按钮，结束 */

/*轮播图，开始*/
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

/* 轮播图，结束 */

/* 宫格组件，可拖动的产品类型按钮，开始 */
.goodsDragBtnList {
  overflow-x: scroll;
}

/*
  ::-webkit-scrollbar，
  它一般在不同的浏览器，有不同的写法
  它有兼容性的问题
*/
.goodsDragBtnList::-webkit-scrollbar {
  display: none;
}

.goodsDragBtnList img {
  width: 48px;
  height: 48px;
}

/* 宫格组件，可拖动的产品类型按钮，结束 */

/* 限时购，开始 */
.limitBuy {
  background: #f1f3f5;
  margin: 0 12px;
  border-radius: 20px;
  overflow: hidden;
  height: 164px;
  position: relative;
}

.limitBuy p.title_1 {
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  left: 15px;
  top: 15px;
}

.limitBuy em.title_2 {
  position: absolute;
  top: 17px;
  left: 72px;
  font-size: 12px;
  background-color: rgba(237, 111, 33, 0.1);
}

.limitBuy .colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}

.limitBuy .block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}

.countDownSty {
  position: absolute;
  top: 15px;
  right: 30px;
}

.limitGoodsSty {
  margin-top: 50px;
}

.limitGoodsSty img {
  width: 58px;
  height: 58px;
}

.limitGoodsSty p.price_1 {
  color: #f00;
  font-weight: bold;
}

.limitGoodsSty b.price_2 {
  color: #666;
  font-weight: normal;
  text-decoration-line: line-through;
}

/* 限时购，结束 */

/* 广告位 */
.adSpace {
  margin: 16px;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 70px;
}
</style>


<template>
  <van-tabbar v-model="tabbarActive" active-color="#f00" inactive-color="#666" @change="onChangeFn">
    <van-tabbar-item icon="home-o" to='/'>
      <span>首页</span>
      <template #icon="props">
        <img :src="props.active ? footerIcon_1.active : footerIcon_1.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search" to='category'>分类</van-tabbar-item>
    <van-tabbar-item icon="friends-o">发现</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="shopingcar" :badge="shopingStepperVal">购物车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="personal">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import requestFn from '@/utils/https'
import { ref, reactive, onMounted, nextTick } from 'vue'

export default {
  name: 'footerTabber',
  data() {
    return {
      msg: 'footer底部导航栏'
    }
  },
  setup() {
    // 屠导航栏，切换的索引
    let tabbarActive = ref(0);

    // 购物车中的商品数量
    let shopingStepperVal = ref(0)

    // 页面刚打开的时候，从mysql中加载商品的数量
    const getStepperNum = () => {
      requestFn({
        url: '/mysql_getShoppingGoodsInfo',
        method: 'get'
      }).then(_d => {
        // console.log(_d.data)
        shopingStepperVal.value = _d.data.num
      })
    }

    onMounted(() => {
      // console.log( typeof localStorage.getItem('switchTabVal') )
      let _v = localStorage.getItem('switchTabVal');
      tabbarActive.value = Number(_v)

      // 页面打开时，先从mysql中读取已经有的商品的数量
      getStepperNum()
    })

    const onChangeFn = (inx) => {
      // console.log( inx )
      localStorage.setItem('switchTabVal', inx);
    }

    const footerIcon_1 = {
      active: 'https://res.vmallres.com//uomcdn/CN/cms/202202/655C627E76D597D20ACAE2FFFE05A943.png',
      inactive: 'https://res.vmallres.com//uomcdn/CN/cms/202105/3F3570287DBE1F6B7DB01175AB00320D.png',
    }

    // 子组件的事件
    const sonFn = ()=>{
      // nextTick，把回调推迟到下一个dom更新周期之后。在一些数据更新之后等dom更新之后，立即执行
      nextTick(()=>{
        // console.log('子组件的方法')
        getStepperNum()
      })
    }

    return {
      tabbarActive,
      footerIcon_1,
      onChangeFn,

      shopingStepperVal,
      sonFn
    }
  }
}
</script>
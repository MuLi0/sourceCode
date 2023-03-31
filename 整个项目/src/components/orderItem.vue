<template>
    <div class="orderItemWrap">
        <!-- 订单的title -->
        <div class="title">
            <label>华为商城自营</label>
            <span>待支付 00:22:44</span>
        </div>

        <!-- 订单列表，开始 -->
        <div class="goodsItem" v-for="n in getAllGoods.arr">
            <label>
                <img :src=n.goods_img alt="">
            </label>
            <span>{{n.goods_title}}</span>
            <em>{{n.goods_des}}</em>
            <b>￥{{n.unit_price}}</b>
            <i>x{{n.goods_num}}</i>
        </div>
        <!-- 订单列表，结束 -->

        <div style="text-align:left;margin-bottom:1rem;">订单编号：2291850955622708</div>
        <div style="text-align:right;margin-bottom:.5rem;font-size: .4rem;">
            <label>共{{totalMoney_goodsNum.arr.num}}件商品，</label>
            <span>待付：￥{{totalMoney_goodsNum.arr.money}}</span>
        </div>
        <div style="text-align:right;">
            <van-button plain round type="primary" size="mini">取消订单</van-button>
            <van-button plain round type="primary" size="mini">修改订单</van-button>
            <van-button to="cashier" round type="danger" size="mini">去支付</van-button>
        </div>
    </div>
</template>

<script>
import requestFn from '@/utils/https'
import { getFn, postFn } from '@/utils/index'
import { ref, reactive, nextTick, watch } from 'vue'

export default {
    name: 'orderItem',
    data() {
        return {
            msg: '某个订单的模块'
        }
    },
    setup() {

        // 页面刚打开的时候，从mysql中加载商品的数量
        // 从shopping_cart购物车表中，取得所有商品信息
        let getAllGoods = reactive({ arr: [] })
        requestFn({
            url: '/mysql_getShoppingGoodsInfo',
            method: 'get'
        }).then(_d => {
            // console.log(_d.data)
            if (_d.data.goodsObj.length === 0) {
                isShopCartEmpty.value = true
            }
            getAllGoods.arr = _d.data.goodsObj
        })

        // 页面一打开，就直接请求所有商品数量、总价
        let totalMoney_goodsNum = reactive({ arr: [] })
        requestFn({
            url: '/mysql_getGoodsMoney',
            method: 'get'
        }).then(_d => {
            console.log(_d.data)
            totalMoney_goodsNum.arr = _d.data
        });


        return {
            getAllGoods,
            totalMoney_goodsNum
        }
    }
}
</script>

<style scoped>
.orderItemWrap {
    background: #eee;
    margin: .5rem;
    padding: .3rem;
    border-radius: .3rem;
    overflow: hidden;
}

.orderItemWrap div.title {
    overflow: hidden;
    background-image: url('https://res.vmallres.com/uomcdn/CN/sc/shop/VMALL-HUAWEIDEVICE/202203/90BC709CA0BD01DA1DDFA510535ACE6A.png');
    background-repeat: no-repeat;
    background-size: .6rem;
}

.orderItemWrap div.title label {
    float: left;
    font-size: .4rem;
    margin-left: .8rem;
}

.orderItemWrap div.title span {
    float: right;
}

.orderItemWrap .goodsItem {
    overflow: hidden;
    position: relative;
    padding-left: 2rem;
    margin-bottom: 1rem;
}

.orderItemWrap .goodsItem label {
    width: 2rem;
    position: absolute;
    top: 0;
    left: 0;
}

.orderItemWrap .goodsItem span {
    text-align: left;
    font-size: .37rem;
    font-weight: bold;
    float: left;
    clear: both;
    width: 5.3rem;
    height: 1.2rem;
    overflow: hidden;
}

.orderItemWrap .goodsItem em {
    text-align: left;
    float: left;
    clear: both;
    width: 5.3rem;
}

.orderItemWrap .goodsItem i {
    position: absolute;
    right: 0;
    bottom: 0;
}
</style>
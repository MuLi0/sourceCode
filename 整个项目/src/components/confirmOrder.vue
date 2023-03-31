<template>
    <!-- 整个页面的容器，是灰色的背景 -->
    <div class="carPageWrap" :style="{ height: pageHeight + 'px' }">

        <!-- 确认订单title，和返回上一级箭头 -->
        <div class="header">
            <van-icon @click="goBack" name="arrow-left" style="margin:0 .3rem 0 0;" />确认订单
        </div>

        <!-- 确认地址栏，开始 -->
        <!-- 地址这里，先不做。因为咱们个人中心还没有呢 -->
        <div class="comfirmAddress">
            <van-icon name="location-o" class='addressIcon' size=".6rem" />
            <div class="addressInfo">
                <p class="p1">
                    <span>我是老尚</span>
                    <span>12655478965</span>
                    <span>默认</span>
                </p>
                <p class="p2">安徽马鞍山市博望区 - 幸福小区1-2</p>
            </div>
        </div>
        <!-- 确认地址栏，结束 -->


        <!-- 确认商品信息，开始 -->
        <div class="shopInfoBox">
            <!-- 全选按钮 -->
            <h1>
                <div class="allGoodsCheckBoxIcon">华为商城自营</div>
            </h1>

            <!-- 购物车中的商品列表 -->
            <div class="goodsPanels">
                <!-- 单个的某个商品，开始 -->
                <div class="goodsItem" v-for="n in getAllGoods.arr">
                    <span class="goodsImg">
                        <img :src=n.goods_img alt="" />
                    </span>
                    <!-- 产品信息，开始 -->
                    <div class="goodsInfo">
                        <p class="p1">{{ n.goods_title }}</p>
                        <p class="p2"> {{ n.goods_des }} </p>
                        <p class="p3">x {{ n.goods_num }}</p>
                    </div>
                    <!-- 产品信息，结束 -->
                </div>
                <!-- 单个的某个商品，结束 -->

                <!-- 赠品 -->
                <div class="otherGoodsInfo">
                    <span class="p1">【赠品】</span>
                    <p class="p2">华为充电器SuperCharge快充版（Max 40W）</p>
                    <p class="p3">x2</p>
                </div>

                <!-- 配送 -->
                <div class="deliveryDate">
                    <span>配送</span>
                    <i>
                        <van-icon name="warning-o" size=".5rem" />
                    </i>
                    <label>标准配送</label>
                </div>

                <!-- 发票 -->
                <div class="invoiceType">
                    <span class="spanL">发票</span>
                    <span class="spanR">电子普通发票-个人</span>
                </div>
            </div>
        </div>
        <!-- 确认商品信息，结束 -->

        <!-- 优惠券 -->
        <div class="CouponName">
            <span>优惠券</span>
            <label>无可用优惠券</label>
        </div>

        <!-- 积分、总价、配送费，开始 -->
        <div class="priceCenter">
            <!-- 积分 -->
            <div class="priceCenterItem">
                <span class="p1">积分</span>
                <i class="p2">
                    <van-icon name="warning-o" size=".5rem" />
                </i>
                <van-switch size=".4rem" v-model="switchChecked" class="p5" />
                <em class="p4">抵0.05元</em>
                <em class="p3">使用5积分</em>
            </div>

            <!-- 商品总价 -->
            <div class="priceCenterItem">
                <span class="p1">商品总价</span>
                <em class="p3 fontBold">￥{{ totalMoney_goodsNum.arr }}</em>
            </div>

            <!-- 配送费 -->
            <div class="priceCenterItem">
                <span class="p1">配送费</span>
                <i class="p2">
                    <van-icon name="warning-o" size=".5rem" />
                </i>
                <em class="p4 fontBold">+￥0</em>
            </div>

            <!-- 商品优惠 -->
            <div class="priceCenterItem">
                <span class="p1">商品优惠</span>
                <em class="p4 fontBold">-￥0</em>
            </div>

            <!-- 积分 -->
            <div class="priceCenterItem" style="margin-bottom:2rem;">
                <span class="p1">积分</span>
                <em class="p4 fontBold">-￥0</em>
            </div>

        </div>
        <!-- 积分、总价、配送费，结束 -->

        <!-- 提交订单栏，footer，开始 -->
        <div class="submitOrder">
            <span class="spanL">￥{{ totalMoney_goodsNum.arr }}</span>
            <van-button to="cashier" round type="danger" class="subBtnStyle">提交订单</van-button>
        </div>
        <!-- 提交订单栏，footer，结束 -->

    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import requestFn from '@/utils/https'

export default {
    name: 'confirmOrder',
    setup() {
        // 获得当前页面的高度
        let pageHeight = document.documentElement.clientHeight;
        // console.log(pageHeight)

        // 积分的开关
        const switchChecked = ref(true)

        // 回到上一页
        const router = useRouter()
        const goBack = () => {
            router.push({
                path: '/shopingcar'
            })
        }

        // 页面一打开，就直接请求所有商品数量、总价
        let totalMoney_goodsNum = reactive({ arr: [] })
        requestFn({
            url: '/mysql_getGoodsMoney',
            method: 'get'
        }).then(_d => {
            // console.log(_d.data)
            totalMoney_goodsNum.arr = _d.data.money

        });

        // 页面刚打开的时候，从mysql中加载商品的数量
        // 从shopping_cart购物车表中，取得所有商品信息
        let getAllGoods = reactive({ arr: [] })
        requestFn({
            url: '/mysql_getShoppingGoodsInfo',
            method: 'get'
        }).then(_d => {
            // console.log(_d.data.goodsObj)
            getAllGoods.arr = _d.data.goodsObj
        })

        return {
            pageHeight,
            switchChecked,

            goBack,
            totalMoney_goodsNum,
            getAllGoods
        }
    }
}
</script>

<style scoped>
/* 整个页面的容器，是灰色的背景 */
.carPageWrap {
    background: #f1f3f5;
    padding: 0 0.5rem;
}

/* 确认订单title，和返回上一级箭头 */
.header {
    margin: 0 .5rem;
    height: 1rem;
    padding: .2rem 0;
    text-align: left;
    font-size: .6rem;
}

/* 确认地址栏 */
.comfirmAddress {
    padding: .2rem;
    overflow: hidden;
    background: #fff;
    border-radius: .3rem;
}

.comfirmAddress .addressIcon {
    float: left;
    margin: .3rem .3rem 0 .2rem;
}

.addressInfo {
    float: left;
}

.addressInfo p {
    text-align: left;
}

/* 确认商品信息 */

/* 商品列表 */
.shopInfoBox {
    margin: 0.3rem 0 0 0;
    padding: .3rem;
    background: #fff;
    border-radius: .3rem;
}

.shopInfoBox h1 {
    overflow: hidden;
}

.allGoodsCheckBoxIcon {
    margin: .3rem 0;
    text-align: left;
    padding: .1rem 0 .2rem .7rem;
    background-image: url('https://res.vmallres.com/uomcdn/CN/sc/shop/VMALL-HUAWEIDEVICE/202203/90BC709CA0BD01DA1DDFA510535ACE6A.png');
    background-repeat: no-repeat;
    background-size: .6rem;
}

/* 购物车中的所有的商品的列表容器 */
.goodsPanels {
    clear: both;
    overflow: hidden;
}

/* 购物车中的某个商品 */
.goodsPanels .goodsItem {
    clear: both;
    overflow: hidden;
    padding-bottom: 1rem;
}

.goodsPanels .goodsItem span.goodsImg {
    float: left;
    overflow: hidden;
    width: 2rem;
    height: 2rem;
}

.goodsPanels .goodsItem span.goodsImg img {
    width: 2rem;
    height: 2rem;
}

.goodsInfo {
    float: left;
    width: 6rem;
    overflow: hidden;
    position: relative;
}

.goodsInfo p.p1 {
    font-size: .38rem;
    text-align: left;
    margin-bottom: .2rem;
}

.goodsInfo p.p2 {
    text-align: left;
    color: #666;
    /* //溢出隐藏 */
    overflow: hidden;
    /* //禁止换行 */
    white-space: nowrap;
    /* //... */
    text-overflow: ellipsis;
    margin-bottom: .2rem;
}

.goodsInfo p.p3 {
    position: absolute;
    top: .6rem;
    right: 0;
}

/* 赠品信息 */
.otherGoodsInfo {
    text-align: left;
    overflow: hidden;
    margin: .5rem 0;
}

.otherGoodsInfo span.p1,
.otherGoodsInfo p.p2,
.otherGoodsInfo p.p3 {
    float: left;
}

.otherGoodsInfo span.p1 {
    margin-right: .65rem;
}

.otherGoodsInfo p.p2 {
    width: 60%;
    padding: 0 0 0 .5rem;
    /* //溢出隐藏 */
    overflow: hidden;
    /* //禁止换行 */
    white-space: nowrap;
    /* //... */
    text-overflow: ellipsis;
    background-image: url('https://res.vmallres.com/pimages//product/6941487208531/142_142_FDA0EDDBE95421AC08DCC5DD197E236CED6ECAB7F1F837C3mp.png');
    background-repeat: no-repeat;
    background-size: .5rem;
}

/* 配送 */
.deliveryDate {
    overflow: hidden;
    padding: .2rem;
    border-bottom: 1px solid #ddd;
}

.deliveryDate span {
    float: left;
}

.deliveryDate i {
    float: left;
    margin: 0 .1rem;
}

.deliveryDate label {
    float: right;
}

/* 发票 */
.invoiceType {
    overflow: hidden;
    padding: .2rem;
    margin: .4rem 0 0 0;
}

.invoiceType span.spanL {
    float: left;
}

.invoiceType span.spanR {
    float: right;
}

/* 优惠券 */
.CouponName {
    overflow: hidden;
    background: #fff;
    padding: .5rem;
    border-radius: .3rem;
    margin: .4rem 0;
}

.CouponName span {
    float: left;
}

.CouponName label {
    float: right;
}

/* 积分、总价、配送费，开始 */
.priceCenter {
    overflow: hidden;
    background: #fff;
    padding: .4rem .5rem;
    border-radius: .3rem;
    margin: .4rem 0;
}

.priceCenter .priceCenterItem {
    clear: both;
    padding: .3rem 0;
    overflow: hidden;
}

.priceCenter span.p1 {
    margin-right: .2rem;
}

.priceCenter span.p1,
.priceCenter i.p2 {
    float: left;
}

.priceCenter em.p3,
.priceCenter em.p4,
.priceCenter .p5 {
    float: right;
}

.priceCenter em.p4 {
    color: #f00;
    margin: 0 .3rem;
}

.priceCenter .fontBold {
    font-weight: bold;
}

/* 提交订单栏，footer */
.submitOrder {
    width: 100%;
    height: 1.5rem;
    background: #f1f3f5;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
}

.submitOrder span.spanL {
    float: left;
    font-size: .7rem;
    color: #f00;
    line-height: 1.5rem;
    margin-left: .3rem;
}

.submitOrder .subBtnStyle {
    float: right;
    margin: .2rem .5rem 0 0;
}
</style>
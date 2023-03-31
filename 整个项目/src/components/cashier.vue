<!-- cashier [kæˈʃɪr] ，收银台 -->
<template>
    <!-- 整个页面的容器，是灰色的背景 -->
    <div class="carPageWrap" :style="{height:pageHeight + 'px'}">

        <!-- 收银台title，和返回上一级箭头 -->
        <div class="header">
            <van-icon @click="goBack" name="arrow-left" style="margin:0 .3rem 0 0;" />收银台
        </div>

        <!-- 限时付款容器 -->
        <div class="payWrap">
            <!-- 限时付款，开始 -->
            <div class="limitPayWrap">
                <span class="p1">请您在</span>
                <span class="p2">
                    <van-count-down :time="countDownTime" />
                </span>
                <span class="p3">内完成支付</span>
            </div>
            <!-- 限时付款，结束 -->
            <div class="payMoneyNum">
                <span class="spanL">付款金额</span>
                <span class="spanR">
                    ¥{{totalMoney_goodsNum.arr}}
                </span>
            </div>
            <div class="address">
                <span class="spanL">收货信息</span>
                <span class="spanR">
                    我***,196****7852
                </span>
            </div>
        </div>

        <!-- 请选择支付方式 -->
        <div class="selectPay">请选择支付方式</div>

        <!-- 选择支付方式列表 -->
        <div class="selectPayModeList">
            <ul>
                <li class="icon_1">支付宝</li>
                <li class="icon_2">微信支付</li>
                <li class="icon_3">
                    <span class="spanTop">华为支付</span>
                    <p class="pBottom">
                        首次绑卡最高优惠5元 点击查看详情
                    </p>
                </li>
                <li class="icon_4">
                    <span class="spanTop">银联分期</span>
                    <p class="pBottom">
                        分期支付满2000减100 点击查看详情
                    </p>
                </li>
                <li class="icon_5">
                    <span class="spanTop">花呗分期</span>
                    <p class="pBottom">12期0费率</p>
                </li>
            </ul>
            <!-- 查看更多支付方式 -->
            <div class="morePaymode">查看更多支付方式<van-icon name="arrow-down" /></div>
        </div>
        
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import requestFn from '@/utils/https'

export default {
    name: 'cashier',
    data() {
        return {
            msg: '收银台页面'
        }
    },
    setup() {
        // 获得当前页面的高度
        let pageHeight = document.documentElement.clientHeight;
        // console.log(pageHeight)

        // 限时付款，倒计时
        const countDownTime = ref(30 * 60 * 60 * 1000);

        // 创建路由对象
        let router = useRouter()
        const goBack = ()=>{
            router.push({
                path:'/confirmOrder'
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

        return {
            pageHeight,
            countDownTime,

            goBack,
            totalMoney_goodsNum
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

/* 收银台title，和返回上一级箭头 */
.header {
    margin: 0 .5rem;
    height: 1rem;
    padding: .2rem 0;
    text-align: left;
    font-size: .6rem;
}


.payWrap {
    padding: .2rem .4rem;
    overflow: hidden;
    background: #fff;
    border-radius: .3rem;
}

/* 限时付款，开始 */
.limitPayWrap {
    padding: 0 0 0 3rem;
    overflow: hidden;
    margin: .3rem 0;
}

.limitPayWrap span.p1,
.limitPayWrap span.p2,
.limitPayWrap span.p3 {
    float: left;
}

/* 付款金额 */
.payMoneyNum {
    overflow: hidden;
    clear: both;
    font-size: .4rem;
}

.payMoneyNum span.spanL {
    float: left;
}

.payMoneyNum span.spanR {
    float: right;
    color: #f00;
}

/* 收货地址 */
.address {
    overflow: hidden;
}

.address span.spanL {
    float: left;
    color: rgb(170, 170, 170);
}

.address span.spanR {
    float: left;
    color: rgb(170, 170, 170);
}

/* 请选择支付方式 */
.selectPay {
    margin: .3rem auto;
    line-height: 1.2rem;
    height: 1rem;
    text-align: left;
}

/* 请选择支付方式的，列表 */
.selectPayModeList {
    padding: .2rem .4rem;
    overflow: hidden;
    background: #fff;
    border-radius: .3rem;
}

.selectPayModeList ul {
    padding: 0 .3rem;
}

.selectPayModeList li {
    height: 1rem;
    line-height: 1rem;
    font-size: .3rem;
    text-align: left;
    padding: 0 0 0 1.4rem;
    margin-bottom: 0.6rem;
    position: relative;
}

.selectPayModeList li span.spanTop {
    position: absolute;
    top: -0.2rem;
    left: 1.4rem;
}

.selectPayModeList li p.pBottom {
    position: absolute;
    bottom: -0.3rem;
    left: 1.4rem;
    color: #f00;
}

.selectPayModeList li.icon_1 {
    background-image: url('https://res.vmallres.com/ips/mobile/20220630/images/indexBankIcon/ALIPAY.png');
    background-repeat: no-repeat;
    background-size: 1rem;
}

.selectPayModeList li.icon_2 {
    background-image: url('https://res.vmallres.com/ips/mobile/20220630/images/indexBankIcon/WXPAY.png');
    background-repeat: no-repeat;
    background-size: 1rem;
}

.selectPayModeList li.icon_3 {
    background-image: url('https://res.vmallres.com/ips/mobile/20220630/images/indexBankIcon/SHARELINK.png');
    background-repeat: no-repeat;
    background-size: 1rem;
}

.selectPayModeList li.icon_4 {
    background-image: url('https://res.vmallres.com/ips/mobile/20220630/images/indexBankIcon/UNIONPINST.png');
    background-repeat: no-repeat;
    background-size: 1rem;
}

.selectPayModeList li.icon_5 {
    background-image: url('https://res.vmallres.com/ips/mobile/20220630/images/indexBankIcon/HUABEI.png');
    background-repeat: no-repeat;
    background-size: 1rem;
}
</style>
<template>
    <!-- 返回上一级箭头 -->
    <div class="header">
        <van-icon @click="goBack" name="arrow-left" style="margin:0 .3rem 0 0;" />回到上一页
    </div>

    <!-- 订单列表切换，开始 -->
    <van-tabs v-model:active="orderActive" swipeable>
        <van-tab title="全部">
            <!-- 封装为订单组件，要不然全部写在这里，就太杂乱了 -->
            <orderItem />
        </van-tab>
        <van-tab title="待付款">内容 2</van-tab>
        <van-tab title="待收货">内容 3</van-tab>
        <van-tab title="已完成">内容 4</van-tab>
    </van-tabs>
    <!-- 订单列表切换，结束 -->

</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import requestFn from '@/utils/https'
import orderItem from './orderItem'

export default {
    name: 'orderCenter',
    data() {
        return {
            msg: '订单中心页面'
        }
    },
    setup() {
        const router = useRouter()

        // 回到上一页
        const goBack = () => {
            router.push({
                path: '/personal'
            })
        }

        // 订单切换的索引
        const orderActive = ref(0)


        return {
            goBack,
            orderActive
        }
    },
    components:{orderItem}
}
</script>

<style scoped>
/* 返回上一级箭头 */
.header {
    margin: 0 .5rem;
    height: 1rem;
    padding: .2rem 0;
    text-align: left;
    font-size: .6rem;
}
</style>
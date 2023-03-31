<template>
    <van-stepper :default-value=defaultValue @change="shopingNumChangeFn" />
</template>

<script>
import { ref } from 'vue'
import { getFn, postFn } from '@/utils/index'
import requestFn from '@/utils/https'

export default {
    name: 'addAndMinusBtn',
    data() {
        return {
            msg: '用在购物车页面的商品数量的，vant加减按钮组件'
        }
    },
    props: {
        goods_num: {
            type: [Number],
            default: 0
        },
        goods_key: {
            type: [Number],
            default: 0
        }
    },
    setup(props, { emit }) {
        // console.log(context中，对象的解构赋值，命名变量)

        // 页面打开时的，加减号中间框的默认值
        let defaultValue = ref(0)
        defaultValue.value = props.goods_num

        // 每个商品的key，它不是响应式的，直接赋值就可以
        let goods_key = props.goods_key

        // 点击加减号的按钮时，调用
        const shopingNumChangeFn = (e) => {
            // 当前加减号按钮的数字
            // console.log( e )

            // mysql_editShoppingCart
            /* requestFn({
                url: '/mysql_editShoppingCart',
                method: 'get',
                data: { n: e, m: goods_key }
            }).then(() => {

                // 请求接口，mysql_getGoodsMoney，获得点击加减号之后的，商品总数、总价
                requestFn({
                    url: '/mysql_getGoodsMoney',
                    method: 'get'
                }).then(_d => {
                    // console.log(_d.data)
                    emit('getTotalMoney_goodsNum', _d.data)
                });

            }); */

            // 改为Promise形式
            getFn('mysql_editShoppingCart', { n: e, m: goods_key })
                .then(() => {
                    // 请求接口，mysql_getGoodsMoney，获得点击加减号之后的，商品总数、总价
                    return getFn('mysql_getGoodsMoney')
                })
                .then(_d => {
                    emit('getTotalMoney_goodsNum', _d.data)
                });
        }

        return {
            defaultValue,
            shopingNumChangeFn
        }
    }
}
</script>
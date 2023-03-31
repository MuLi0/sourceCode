<template>
    <van-checkbox v-model="is_checkbox" @click="checkboxEventFn" style="float:left;margin:.7rem 0 0 0;" />
</template>

<script>
import { ref, watch } from 'vue';
import requestFn from '@/utils/https'
import { getFn, postFn } from '@/utils/index'

export default {
    name: 'vantCheckBoxItem',
    data() {
        return {
            msg: '购物车中某个商品的左侧的复选框'
        }
    },
    props: {
        is_checkbox: {
            type: [Number],
            default: 1
        },
        goods_key: {
            type: [Number],
            default: 1
        }
    },
    setup(props, context) {
        // console.log(props)
        let is_checkbox = ref(props.is_checkbox)

        watch(props, (oldVal, newVal) => {
            // console.log(newVal)
            is_checkbox.value = newVal.is_checkbox;
        })

        // 复选框的事件
        // 添加新的接口，mysql_editShoppingIsCheckbox
        // 根据key，修改shopping_cart表中的，is_checkbox字段
        const checkboxEventFn = () => {
            // console.log(props.goods_key)
            // console.log(is_checkbox.value)
            let _o = is_checkbox.value == true ? 1 : 0
            // console.log(_o)

            // 根据key，修改shopping_cart表中的，is_checkbox字段
            /* requestFn({
                url: '/mysql_editShoppingIsCheckbox',
                method: 'get',
                data: { n: _o, m: props.goods_key }
            })

            // 【思路：】
            // 同时，要修改全选按钮的状态
            // 1、要先看 shopping_cart 表中，所有商品的 is_checkbox 字段 中的数据 
            // 2、如果都是1/true，则表示 全选按钮应该是true，
            // 3、如果有任意一个商品的is_checkbox的值为0/false，就表示 全选按钮的值应该是false/0

            // 还是要先获得购物车中，所有商品的信息
            requestFn({
                url: '/mysql_getShoppingGoodsInfo',
                method: 'get'
            }).then(_d => {
                // console.log(_d.data)

                let _goodsObj = _d.data.goodsObj;
                let _is = 1;//是否全选的标识。默认是1，表示 全选
                for (let n in _goodsObj) {
                    // console.log( _goodsObj[n] )
                    // 判断：如何有任何一个商品的is_checkbox的值，为0，就直接break循环
                    if (_goodsObj[n].is_checkbox === 0) {
                        _is = 0;
                        break;
                    }
                }

                // 根据 _is 的判断 结果，来修改全选按钮的状态，
                // mysql_getAllGoodsCheck
                requestFn({
                    url: '/mysql_getAllGoodsCheck',
                    method: 'get',
                    data: { n: _is }
                }).then(()=>{
                    context.emit('editAllGoodsCheckFn')
                });
            }); */

            // 改为，Promise 形式
            getFn('/mysql_editShoppingIsCheckbox', { n: _o, m: props.goods_key })
                .then(() => {
                    return getFn('/mysql_getShoppingGoodsInfo')
                })
                .then(_d => {
                    // console.log(_d.data)

                    let _goodsObj = _d.data.goodsObj;
                    let _is = 1;//是否全选的标识。默认是1，表示 全选
                    for (let n in _goodsObj) {
                        // console.log( _goodsObj[n] )
                        // 判断：如何有任何一个商品的is_checkbox的值，为0，就直接break循环
                        if (_goodsObj[n].is_checkbox === 0) {
                            _is = 0;
                            break;
                        }
                    }
                    return getFn('/mysql_getAllGoodsCheck', { n: _is })
                })
                .then(() => {
                    // 触发父组件，获取、保存全选按钮的状态的事件
                    context.emit('editAllGoodsCheckFn')

                    // 从 shopping_cart 购物车表中，取得所有商品的被修改之后的，is_checkbox
                    // 当点击 每个商品左侧复选框时，触发，更新 getAllGoods.arr，导致页面重新渲染
                    // 否则，在点击全选按钮时，因为 getAllGoods.arr 没有变化，所以页面不会重新渲染
                    context.emit('childrenAgainEmit')

                    
                });
        }

        return {
            is_checkbox,
            checkboxEventFn
        }
    }
}
</script>
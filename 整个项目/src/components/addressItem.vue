<template>
    <!-- 返回上一级箭头 -->
    <div class="header">
        <van-icon @click="goBack" name="arrow-left" style="margin:0 .3rem 0 0;" />管理收货地址
    </div>

    <!-- 地址列表，开始 -->
    <div class="addressList" v-for="n in addressList.arr">
        <div class="item">
            <p>{{ n.name }}<em>{{ n.tel }}</em></p>
            <p>{{ n.province }}-{{ n.city }}-{{ n.county }}-{{ n.addressDetail }}</p>
        </div>
        <div class="btn">
            <label>
                <!-- <van-checkbox>默认地址</van-checkbox> -->
                <!-- <h1> {{n.isDefault}} </h1> -->
                <defaultAddress :isDefault="n.isDefault" />
            </label>
            <span @click="delAddressEvent(n.addressId)">
                <van-icon size=".6rem" name="delete-o" />删除
            </span>
            <span @click="editAddressEvent(n.addressId)">
                <van-icon size=".6rem" name="records" />编辑
            </span>
        </div>
    </div>
    <!-- 地址列表，结束 -->

    <!-- 新增收货地址，footer -->
    <div class="footer">
        <van-button to="addNewAddress" round color="#cf0a2c" style="font-size: .5rem;" block type="primary">+ 新增收货地址
        </van-button>
    </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import requestFn from '@/utils/https'
import defaultAddress from './defaultAddress'

import { getFn } from '@/utils/index'

export default {
    name: 'addressItem',
    data() {
        return {
            msg: '管理收货地址页面'
        }
    },
    components: {
        defaultAddress
    },
    setup() {
        let router = useRouter()

        // 回到上一页
        const goBack = () => {
            router.push({
                path: '/personal'
            })
        }

        // 用户地址列表
        let addressList = reactive({ arr: [] })

        // 打开页面，请求获得用户送货地址接口，mysql_getAddress
        requestFn({
            url: '/mysql_getAddress',
            method: 'get'
        }).then(_d => {
            // console.log(_d.data)
            addressList.arr = _d.data;
        })

        // 删除按钮事件
        const delAddressEvent = (_id) => {
            // console.log(_id)

            /* requestFn({
                url: '/mysql_delAddress',
                method: 'get',
                data: { n: _id }
            }).then(_d => {
                // console.log(_d.data)

                // 删除之后，刷新页面
                requestFn({
                    url: '/mysql_getAddress',
                    method: 'get'
                }).then(_d => {
                    console.log(_d.data)
                    addressList.arr = _d.data;
                });
            }); */

            // 改为promise形式，解决回调地址
            getFn('/mysql_delAddress', { n: _id })
                .then(_d => {
                    return getFn('/mysql_getAddress')
                })
                .then(_d => {
                    // console.log(_d.data)
                    addressList.arr = _d.data;
                });
        }

        // 编辑用户地址的事件
        const editAddressEvent = (_id) => {
            // console.log(_id)

            // 跳转到修改地址页面
            // 使用“命名路由”的方式，向目标页面传入参数
            router.push({
                // path:'/editAddress'
                name: 'editAddress',
                params: {
                    addId: _id
                }
            })
        }

        return {
            goBack,
            addressList,
            delAddressEvent,

            editAddressEvent
        }
    }
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

/* 地址列表 */
.addressList {
    margin: 1rem;
    padding: .5rem;
    background-color: rgb(246, 246, 246);
    border-radius: .3rem;
}

.addressList .item {
    overflow: hidden;
}

.addressList .item p {
    text-align: left;
    padding-bottom: .2rem;
}

.addressList .item em {
    padding-left: .3rem;
}

.addressList .btn {
    overflow: hidden;
    padding-top: .4rem;
}

.addressList .btn label {
    float: left;
}

.addressList .btn span {
    float: right;
    margin-right: .3rem;
}

/* 新增收货地址，footer */
.footer {
    position: fixed;
    left: .25rem;
    bottom: .2rem;
    width: 95%;
}
</style>
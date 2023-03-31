<template>
    <!-- title部分，开始 -->
    <div class="wrap">
        <img @click="gotoUploadImg" class="avatar" :src="imgSrc" alt="" />
        <label class="name" @click="loginEventFn">{{ userName }}</label>
        <van-icon class="vanIcon" @click="gotoAddress" size=".8rem" name="apps-o" />
    </div>
    <!-- title部分，结束 -->

    <!-- 我的订单，开始 -->
    <div class="orderWrap">
        <dl>
            <dt>
                <label>我的订单</label>
                <span @click="gotoOrderCenter">全部订单</span>
            </dt>
            <dd>
                <van-grid :column-num="5">
                    <van-grid-item icon="paid" text="待付款" />
                    <van-grid-item icon="send-gift-o" text="待收货" />
                    <van-grid-item icon="chat-o" text="待评价" />
                    <van-grid-item icon="after-sale" text="退换退款" />
                    <van-grid-item icon="revoke" text="回收单" />
                </van-grid>
            </dd>
        </dl>
    </div>
    <!-- 我的订单，结束 -->

    <footerTabber />
</template>

<script>
import footerTabber from '@/components/footerTabber'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'personal',
    data() {
        return {
            msg: 'personal'
        }
    },
    setup() {
        let userName = ref('登录/注册')
        const router = useRouter()

        // 用户登录、注册的事件
        const loginEventFn = () => {
            // 跳转到登录或注册的页面
            router.push({
                path: '/login'
            })
        }

        // 页面刚加载时，就读取cookie，并转码，decodeURIComponent
        // 读取并操作cookie，开始
        if (document.cookie) {
            // console.log(document.cookie)
            // console.log(decodeURIComponent(document.cookie))

            let _cookie = decodeURIComponent(document.cookie);

            // 找到第一个=号出现的位置，其实就是查找token=
            // console.log( _cookie.indexOf('=') )
            let _cookieInx = _cookie.indexOf('=');
            // console.log(_cookie.substring(_cookieInx + 1))

            let _subCookieStr = _cookie.substring(_cookieInx + 1)
            // console.log( _subCookieStr.split(';') )

            // 把截取之后的字符串，转为数组
            let _cookieArr = _subCookieStr.split(';')
            let _cookieObj = {}
            for (let n of _cookieArr) {
                // console.log(n)
                // console.log(n.split('='))

                // 拼接对象的键、值
                _cookieObj[n.split('=')[0]] = n.split('=')[1]
            }
            // console.log(_cookieObj)

            // 读取cookie之后，设置登录之后的用户的用户名
            userName.value = _cookieObj.cn_name + '，欢迎回来！'
        } else {
            userName.value = '登录/注册'
        }
        // 读取并操作cookie，结束

        // 跳转到管理收货地址页面
        const gotoAddress = () => {
            router.push({
                path: '/addressItem'
            })
        }

        // 跳转到用户头像上传页面
        const gotoUploadImg = () => {
            router.push({
                path: '/uploadImg'
            })
        }

        // 页面一打开，要读取用户上传的头像的地址。如果没有，就加载assets的默认头像
        let _avatarImg = localStorage.getItem('imgsrc')
        console.log(_avatarImg)

        let imgSrc = ''
        if (_avatarImg) {
            // 这是动态加载图片，require
            // 如果有，就加载用户上传头像
            // 因为 webpack本身是一个预编译的打包工具，无法预测未知变量路径，所以不能require纯变量路径。
            imgSrc = require('../uploadImg/' + _avatarImg)
        } else {
            // 如果没有，就加载默认头像
            imgSrc = require('../assets/avatar.png')
        }

        // 跳转到订单中心页面
        const gotoOrderCenter = ()=>{
            router.push({
                path:"/orderCenter"
            })
        }


        return {
            userName,
            loginEventFn,
            gotoAddress,
            gotoUploadImg,
            imgSrc,
            gotoOrderCenter
        }
    },
    components: {
        footerTabber
    }
}
</script>

<style scoped>
.wrap {
    overflow: hidden;
    padding: 1rem .5rem;
}

.wrap img.avatar {
    float: left;
    height: 1.2rem;
    margin-right: .2rem;
}

.wrap label.name {
    float: left;
    font-size: .46rem;
}

.wrap .vanIcon {
    float: right;
}

/* 订单 */
.orderWrap {
    overflow: hidden;
    padding: 1rem .5rem;
}

.orderWrap dl dt,
.orderWrap dl dd {
    clear: both;
    overflow: hidden;
}

.orderWrap dl dt label {
    float: left;
    font-size: .46rem;
}

.orderWrap dl dt span {
    float: right;
    font-size: .36rem;
}
</style>
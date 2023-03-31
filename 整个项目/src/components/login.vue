<template>
    <!-- 收银台title，和返回上一级箭头 -->
    <div class="header" @click="goBack">
        <van-icon name="arrow-left" style="margin:0 .3rem 0 0;" />回到上一页
    </div>

    <van-form @submit="onSubmit" style="margin-top:3rem">
        <van-cell-group inset>
            <van-field v-model="username" name="en_name" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                登录
            </van-button>
        </div>
        <div style="margin: 16px;">
            <van-button @click="gotoRegister" color="#eee" round block type="primary" native-type="submit"
                style="color:#007dff">
                注册账号
            </van-button>
        </div>
    </van-form>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import requestFn from '@/utils/https'
import { Dialog } from 'vant';

export default {
    name: 'login',
    data() {
        return {
            msg: '用户登录页'
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

        // 跳转到注册页面
        const gotoRegister = () => {
            router.push({
                path: '/register'
            })
        }

        // 用户登录事件
        const username = ref('');
        const password = ref('');
        const onSubmit = (values) => {
            // console.log(values)

            // 请求用户登录接口
            requestFn({
                url: '/mysql_login',
                method: 'get',
                data: { n: values }
            }).then(_d => {
                // console.log(_d.data)

                // 把登录信息写入cookie
                // 使用 expires 时应该和 cookie 同时写入，否则会形成多个cookie
                // expires用于设置cookie的过期时间
                // 如果还没有过失效期，即使重新启动电脑，cookie 仍然不会丢失
                // 如果没有指定 expires 值，那么在关闭浏览器时，cookie 即失效。
                // 但cookie不能读取
                // 为了便于演示，咱们先不封装

                // 设置过期时间
                let expires = new Date()
                expires.setTime(expires.getTime() + 60 * 60 * 1000) //一小时之后，cookie失效

                // 把你存入cookie的多个信息，拼成一个字符串
                let cookieContent = `en_name=${_d.data.en_name};cn_name=${_d.data.cn_name}`
                // console.log(cookieContent)

                // 存入cookie之后，跳转到个人中心页
                document.cookie = 'token=' + encodeURIComponent(cookieContent) + ';expires=' + expires.toGMTString()

                // 提示框
                Dialog.alert({
                    title: '注册提示',
                    message: _d.data.msg
                }).then(() => {

                    // 跳转回个人中心页
                    router.push({
                        path: '/personal'
                    });
                })
            })
        }

        return {
            username,
            password,
            onSubmit,
            goBack,
            gotoRegister
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
    font-size: .4rem;
}
</style>
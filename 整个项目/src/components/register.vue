<template>
    <!-- 收银台title，和返回上一级箭头 -->
    <div class="header" @click="goBack">
        <van-icon name="arrow-left" style="margin:0 .3rem 0 0;" />回到上一页
    </div>

    <van-form @submit="onSubmit" style="margin-top:3rem">
        <van-cell-group inset>
            <van-field v-model="en_username" name="en_username" label="用户名ID" placeholder="用户名ID"
                :rules="[{ required: true, message: '请填写用户名ID' }]" />
            <van-field v-model="cn_username" name="cn_username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <van-field v-model="password2" type="password" name="password" label="重复密码" placeholder="重复密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                注册
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
    name: 'register',
    data() {
        return {
            msg: '注册页'
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

        const en_username = ref('');
        const cn_username = ref('');
        const password = ref('');
        const password2 = ref('');
        const onSubmit = (values) => {
            if (password.value !== password2.value) {
                console.log('二次输入的密码不一样')
            } else {
                console.log(values)

                // 请求用户注册接口中
                requestFn({
                    url: '/mysql_register',
                    method: 'get',
                    data: { n: values }
                }).then(_d => {
                    console.log(_d.data)

                    // 用户注册成功与否的判断，没有错误
                    if (_d.data.error === false) {

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
                    }

                })
            }
        }

        return {
            en_username,
            cn_username,
            password,
            password2,
            onSubmit,
            goBack
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
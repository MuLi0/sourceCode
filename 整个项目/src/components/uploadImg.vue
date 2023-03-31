<template>
    <!-- 返回上一级箭头 -->
    <div class="header">
        <van-icon @click="goBack" name="arrow-left" style="margin:0 .3rem 0 0;" />回到上一页
    </div>

    <!-- 用户头像上传 -->
    <van-uploader :after-read="afterRead" />

    <!-- 用户头像预览 -->
    <div class="previewImg">
        <img :src="imgscr" alt="">
    </div>

    <van-button type="default" @click="goPersonal">确认</van-button>

</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import requestFn from '@/utils/https'

export default {
    name: 'uploadImg',
    data() {
        return {
            msg: '上传用户头像'
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

        let imgscr = ref('')

        // 用户上传头像
        const afterRead = (fileObj) => {
            // 此时可以自行将文件上传至服务器
            // console.log(fileObj);
            imgscr.value = fileObj.content

            // 调用图片上传接口，mysql_uploadImg
            requestFn({
                url: '/mysql_uploadImg',
                method: 'post',
                data: { n: fileObj.content, name: fileObj.file.name }
            }).then(_d => {
                console.log(_d.data)

                // 把上传成功之后返回的，图片信息，保存在本地存储
                localStorage.setItem('imgsrc',_d.data.name)
            })
        }

        // 回到用户中心页
        const goPersonal = ()=>{
            router.push({
                path:'/personal'
            })
        }

        return {
            goBack,
            afterRead,
            imgscr,
            goPersonal
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

/* 用户头像预览 */
.previewImg {
    background: #eee;
    overflow: hidden;
    border-radius: .3rem;
    margin: 1rem;
    min-height: 2rem;
}
</style>
<template>
    <!-- 返回上一级箭头 -->
    <div class="header">
        <van-icon @click="goBack" name="arrow-left" style="margin:0 .3rem 0 0;" />编辑收货地址页面
    </div>
    <van-address-edit :area-list="areaList" show-postal show-set-default show-search-result
        :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
        @change-detail="onChangeDetail" :address-info="addressInfo.arr" />

</template>

<script>
import { ref, reactive } from 'vue'
import { Toast } from 'vant';
import { areaList } from '@vant/area-data'
import { useRoute, useRouter } from 'vue-router'
import requestFn from '@/utils/https'

export default {
    name: 'editAddress',
    data() {
        return {
            msg: '编辑收货地址页面'
        }
    },
    setup() {
        let router = useRouter()

        // 回到上一页
        const goBack = () => {
            router.push({
                path: '/addressItem'
            })
        }

        const searchResult = ref([])

        const onChangeDetail = (val) => {
            // console.log(val)
            if (val) {
                searchResult.value = [
                    {
                        name: '黄龙万科中心',
                        address: '杭州市西湖区',
                    },
                ];
            } else {
                searchResult.value = [];
            }
        }

        // 接收参数
        let route = useRoute()
        let addId = route.params.addId
        // console.log(addId)

        // mysql里，没有boolean这个类型，其实你保存的还是数字，0、1之类的

        // 地址信息，初始值
        let addressInfo = reactive({ arr: [] })

        // 页面一打开，就根据传入的id，获得对应的地址信息
        requestFn({
            url: '/mysql_getIdAddress',
            method: 'get',
            data: { n: addId }
        }).then(_d => {
            // console.log(_d.data[0])
            let _temp = _d.data[0]
            _temp.isDefault = JSON.parse(_temp.isDefault) === 1 ? true : false
            addressInfo.arr = _temp
            // console.log(addressInfo.arr)
        })

        // 点击保存按钮时触发
        const onSave = (obj) => {
            console.log(obj)
            // console.log(obj.name)

            // mysql_updataAddress
            requestFn({
                url: '/mysql_updataAddress',
                method: 'get',
                data: { n: addId, m: obj }
            }).then(_d => {
                // console.log(_d.data)

                // 修改用户地址成功，跳转到地址列表页
                if(_d.data.is){
                    router.push({
                        path:'/addressItem'
                    })
                }
            })
        }

        return {
            goBack,
            onSave,
            areaList,
            searchResult,
            onChangeDetail,

            addressInfo
        }
    }
}
</script>

<style scoped>
.header {
    margin: 0 .5rem;
    height: 1rem;
    padding: .2rem 0;
    text-align: left;
    font-size: .6rem;
}
</style>
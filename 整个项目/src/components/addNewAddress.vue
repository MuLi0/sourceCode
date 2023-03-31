<template>
    <!-- 返回上一级箭头 -->
    <div class="header">
        <van-icon @click="goBack" name="arrow-left" style="margin:0 .3rem 0 0;" />新增收货地址
    </div>
    <van-address-edit :area-list="areaList" show-postal show-set-default show-search-result
        :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
        @delete="onDelete" @change-detail="onChangeDetail" />

</template>

<script>
import { ref, reactive } from 'vue'
import { Toast } from 'vant';
import { areaList } from '@vant/area-data'
import { useRoute, useRouter } from 'vue-router'
import requestFn from '@/utils/https'

export default {
    name: 'addNewAddress',
    data() {
        return {
            msg: '新增收货地址页面'
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

        const onDelete = () => Toast('delete')
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

        // 点击保存按钮时触发
        const onSave = (obj) => {
            console.log(obj)
            // console.log(obj.name)

            requestFn({
                url: '/mysql_address',
                method: 'get',
                data: { n: obj }
            }).then(_d => {
                // console.log(_d.data)

                if (_d.data.is) {
                    router.push({
                        path: '/addressItem'
                    })
                }

                /* 实际工作中的情况，应该是这样，
                1、每个用户，对应的多条收货地址；
                2、反应在mysql表当中，就是一个，一对多的关系
                3、要去给mysql表，去设置主键、外键，多表查询、修改等知识
                这就涉及到mysql的表结构的设计，等方面的知识了

                一是前端开发确实用不到。在实际工作中，没有哪个公司会让前端开发去设计青藏止的数据库的表结构
                二、这方面的知识，也确实是超出了本项目课的范围
                所以在这里，咱们把它简化，就是能新增用户送货地址，能对地址进行增删改查等操作，就ok
                 */
            })
        }

        return {
            goBack,
            onSave,
            onDelete,
            areaList,
            searchResult,
            onChangeDetail
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
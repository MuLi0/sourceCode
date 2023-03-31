<template>
    <van-checkbox v-model="isDefault">默认地址</van-checkbox>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
    name: 'defaultAddress',
    data() {
        return {
            msg: '设置为默认地址的vant的复选框'
        }
    },
    props: {
        isDefault: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        // console.log(props.isDefault, typeof props.isDefault)
        // console.log(JSON.parse(props.isDefault), typeof JSON.parse(props.isDefault))

        let isDefault = ref('')
        isDefault.value = JSON.parse(props.isDefault)

        return {
            isDefault
        }
    }
}
</script>
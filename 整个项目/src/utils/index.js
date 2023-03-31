import axios from 'axios'

// 新建一个axios对象
const $https = axios.create({
    baseURL: '/api'
})

export const getFn = (url, params) => {
    params = params || {}

    return new Promise((resolve, reject) => {
        $https.get(url, { params }).then(_d => {
            resolve(_d)
        })
    })
}

export const postFn = () => {
    console.log('bbbbb')
}
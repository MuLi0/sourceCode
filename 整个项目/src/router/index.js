import { createRouter, createWebHistory } from 'vue-router'
import IndexWrap from '@/components/IndexWrap'
import category from '@/components/category'
import goodsDetail from '@/components/goodsDetail'
import shopingcar from '@/components/shopingcar'
import confirmOrder from '@/components/confirmOrder'
import cashier from '@/components/cashier'
import personal from '@/components/personal'
import login from '@/components/login'
import register from '@/components/register'
import addressItem from '@/components/addressItem'
import addNewAddress from '@/components/addNewAddress'
import editAddress from '@/components/editAddress'
import uploadImg from '@/components/uploadImg'
import orderCenter from '@/components/orderCenter'


const routes = [
  {
    path: '/',
    name: 'IndexWrap',
    component: IndexWrap
  },{
    path: '/category',
    name: 'category',
    component: category
  },{
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: goodsDetail
  },{
    path: '/shopingcar',
    name: 'shopingcar',
    component: shopingcar
  },{
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: confirmOrder
  },{
    path: '/cashier',
    name: 'cashier',
    component: cashier
  },{
    path: '/personal',
    name: 'personal',
    component: personal
  },{
    path: '/login',
    name: 'login',
    component: login
  },{
    path: '/register',
    name: 'register',
    component: register
  },{
    path: '/addressItem',
    name: 'addressItem',
    component: addressItem
  },{
    path: '/addNewAddress',
    name: 'addNewAddress',
    component: addNewAddress
  },{
    path: '/editAddress',
    name: 'editAddress',
    component: editAddress
  },{
    path: '/uploadImg',
    name: 'uploadImg',
    component: uploadImg
  },{
    path: '/orderCenter',
    name: 'orderCenter',
    component: orderCenter
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


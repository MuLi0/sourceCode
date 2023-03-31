<template>
    <!-- 整个页面的容器，是灰色的背景 -->
    <div class="carPageWrap" :style="{ height: pageHeight + 'px' }">

        <!-- 购物车页面的title -->
        <div class="cartTitle">
            <h1>购物车</h1>
            <span @click="editBtnEvent">{{ editBtn }}</span>
        </div>

        <!-- 商品列表，开始 -->
        <div class="shopInfoBox">
            <!-- 全选按钮 -->
            <h1>
                <van-checkbox v-model="allGoodsChecked" @click="allGoodsCheckedEventFn">
                    <div class="allGoodsCheckBoxIcon">华为商城自营</div>
                </van-checkbox>
            </h1>

            <!-- 限时特惠 -->
            <div class="limitTime">
                <em>限时特惠</em>
                <span>距离活动结束还有</span>
                <van-count-down :time="limitTime" style="float:left;" />
            </div>

            <h1 v-show="isShopCartEmpty">购物车中没有商品，请添加购物车</h1>

            <!-- 购物车中的商品列表 -->
            <div class="goodsPanels">
                <!-- 单个的某个商品，开始 -->
                <div class="goodsItem" v-for="n in getAllGoods.arr">

                    <!-- vant的单个商品的复选框 -->
                    <!-- 在shopping_cart表中，添加一个某个商品是否选中的字段 ：is_checkbox，0/1 -->
                    <vantCheckBoxItem @editAllGoodsCheckFn="allGoodsCheckedFn" :is_checkbox=n.is_checkbox
                        :goods_key=n.goods_key @childrenAgainEmit="ageinGetAllGoodsFn"
                        v-show="isVantCheckBoxItemShow" />

                    <!-- 编辑删除商品的按钮 -->
                    <input v-show="isDelEditInputShow" :data-editKey="n.goods_key" type="checkbox"
                        style="float:left;margin:1rem 0 0 0;" @click="editGoodsCheckboxKeyFn">

                    <span class="goodsImg">
                        <img :src="n.goods_img" />
                    </span>

                    <!-- 产品信息，开始 -->
                    <div class="goodsInfo">
                        <p class="p1"> {{ n.goods_title }} </p>
                        <p class="p2"> {{ n.goods_des }} </p>
                        <div class="priceLine">
                            <span style="float:left">￥{{ n.unit_price }}</span>
                            <del style="float:left;margin-top: .06rem;">￥8988</del>
                            <span style="float:right">
                                <addAndMinusBtn :goods_key=n.goods_key :goods_num=n.goods_num
                                    @change="shopingNumChangeFn()" @getTotalMoney_goodsNum="getTotalMoney_goodsNum" />
                            </span>
                        </div>
                    </div>
                    <!-- 产品信息，结束 -->

                </div>
                <!-- 单个的某个商品，结束 -->
            </div>

        </div>
        <!-- 商品列表，结束 -->

        <!-- 底部，总计栏，开始 -->
        <div class="totalWrap" v-show="isTotalWrapShow">
            <van-checkbox v-model="allGoodsChecked" @click="allGoodsCheckedEventFn" class="allCheckFooter">
                <div>全选</div>
            </van-checkbox>
            <van-button to="confirmOrder" round type="danger" style="float:right;">结算({{ totalMoney_goodsNum.arr.num }})
            </van-button>
            <div class="priceNumber">
                <label>总计：</label>
                <em>￥</em>
                <span>{{ totalMoney_goodsNum.arr.money }}</span>
            </div>
        </div>
        <!-- 底部，总计栏，结束 -->

        <!-- 底部，删除商品栏，开始 -->
        <div class="totalWrap" v-show="isDelGoodsShow">
            <van-checkbox class="allCheckFooter">
                <div>全选(它就是摆在这，它的功能咱们不去做)</div>
            </van-checkbox>

            <van-button round type="danger" @click="delGoodsKeyBtnFn" style="float:right;margin-right: .5rem;">删除
            </van-button>
        </div>
        <!-- 底部，删除商品栏，结束 -->

    </div>
    <!-- footer底部导航栏 -->
    <footerTabber ref="sonRef" />
</template>
<!-- 
    未完成需求：
	当购物车中，商品取消选中时，
	结算按钮、总价，
	要显示剩余被选中的商品的总价、数量
 -->
<script>
import requestFn from '@/utils/https'
import { getFn, postFn } from '@/utils/index'
import { ref, reactive, nextTick, watch } from 'vue'
import footerTabber from '@/components/footerTabber'
import addAndMinusBtn from '@/components/addAndMinusBtn'
import vantCheckBoxItem from '@/components/vantCheckBoxItem'

export default {
    name: 'shopingcar',
    data() {
        return {
            msg: '购物车页面'
        }
    },
    setup() {
        // 获得当前页面的高度
        let pageHeight = document.documentElement.clientHeight;
        // console.log(pageHeight)

        // 1、新加一个接口：mysql_getAllGoodsCheck，获取、保存全选按钮的状态
        // 2、新加一个表，all_goods_check_state，字段：ischeck；默认值1，选中状态
        // 3、单独建一个表，不要跟购物车商品或其它的，混在一起，不好维护

        // 全选按钮
        const allGoodsChecked = ref()

        // 页面加载时，读取全选按钮的状态，渲染到页面。是选中？还是未选中？
        const allGoodsCheckedFn = () => {
            requestFn({
                url: '/mysql_getAllGoodsCheck',
                method: 'get'
            }).then(_d => {
                // console.log(_d.data)
                allGoodsChecked.value = _d.data[0].ischeck
            });
        }
        allGoodsCheckedFn()

        // 购物中，没有商品时的提示
        let isShopCartEmpty = ref(false)

        // 页面刚打开的时候，从mysql中加载商品的数量
        // 从shopping_cart购物车表中，取得所有商品信息
        let getAllGoods = reactive({ arr: [] })
        requestFn({
            url: '/mysql_getShoppingGoodsInfo',
            method: 'get'
        }).then(_d => {
            // console.log(_d.data)
            if (_d.data.goodsObj.length === 0) {
                isShopCartEmpty.value = true
            }
            getAllGoods.arr = _d.data.goodsObj
        })

        // 全选按钮的点击事件
        const allGoodsCheckedEventFn = () => {
            // console.log(allGoodsChecked.value)

            let _o = allGoodsChecked.value === true ? 1 : 0
            // console.log(_o)

            // 获取、保存全选按钮的状态
            /* requestFn({
                url: '/mysql_getAllGoodsCheck',
                method: 'get',
                data: { n: _o }
            }); */

            /* 【全选按钮的思路】：
            1、当点击全选按钮时，把所有商品的checkbox的值，改为1或0
            2、让shopping_cart表中所有商品的is_checkbox字段的值，与全选的值相同
            3、每个接口只做一件事，那么，新建接口：mysql_editAllCheckBox
            4、咱们现在先单独写ajax之类的请求，先不用 Promise 来封装ajax的嵌套，
            咱们一件事一件事的解决，目前是先解决业务逻辑，把逻辑写通
             */
            /* requestFn({
                url: '/mysql_editAllCheckBox',
                method: 'get',
                data: { n: _o }
            }).then(() => {

                // 然后，再次从 shopping_cart 购物车表中，取得所有商品的被修改之后的，is_checkbox
                requestFn({
                    url: '/mysql_getShoppingGoodsInfo',
                    method: 'get'
                }).then(_d => {
                    // console.log(_d.data)
                    getAllGoods.arr = _d.data.goodsObj
                });
            }); */

            // 使用 Promise解决axios的回调地狱，功能同上
            getFn('/mysql_getAllGoodsCheck', { n: _o })
                .then(_d => {
                    return getFn('/mysql_editAllCheckBox', { n: _o })
                })
                .then(_d => {
                    return getFn('/mysql_getShoppingGoodsInfo')
                })
                .then(_d => {
                    // console.log( _d.data )
                    getAllGoods.arr = _d.data.goodsObj
                });
        }

        // 从 shopping_cart 购物车表中，取得所有商品的被修改之后的，is_checkbox
        // 由每个商品左侧的复选框按钮触发，是子组件通过自定义事件来触发的
        // 思路，在父组件，先在页面上输出{{n.is_checkbox}}，看看页面上这个数字是否有变化
        // 来判断数据是否有变化，导致页面没有重新渲染
        const ageinGetAllGoodsFn = () => {
            getFn('/mysql_getShoppingGoodsInfo').then(_d => {
                // console.log( _d.data )
                getAllGoods.arr = _d.data.goodsObj
            });
        }

        // ==============================================
        // Promise测试，解决回调地狱
        /* getFn('/mysql_getShoppingGoodsInfo')
            .then(_d=>{
                console.log( _d.data )
                return getFn('/goodsTypeData')
            })
            .then(_d=>{
                console.log( _d.data )
                return getFn('/swipeData')
            })
            .then(_d=>{
                console.log( _d.data )
            }); */

        // 倒计时
        const limitTime = ref(30 * 60 * 60 * 1000);

        // 子组件的调用
        const sonRef = ref()

        // 结算按钮栏的所有商品数量、总价
        // 计算所有商品的总数、总价
        // 请求接口，可以使用接口，mysql_getShoppingGoodsInfo
        // 但是原则是，每个接口，只做一件事
        // 所以咱们新增一个接口，mysql_getGoodsMoney
        let totalMoney_goodsNum = reactive({ arr: [] })

        // 从子组件，传值过来
        const getTotalMoney_goodsNum = (_d) => {
            // console.log( _d )
            totalMoney_goodsNum.arr = _d
        }

        // 页面一打开，就直接请求所有商品数量、总价
        requestFn({
            url: '/mysql_getGoodsMoney',
            method: 'get'
        }).then(_d => {
            // console.log(_d.data)
            totalMoney_goodsNum.arr = _d.data
        });

        // 加减号按钮，change事件
        const shopingNumChangeFn = () => {

            // 直接这么去请求、计算所有商品的总数、总价，有一个顺序的问题
            // 你可能拿到的是db修改之前的数据，
            // 因为它是加减号触发的
            /* requestFn({
                url: '/mysql_getGoodsMoney',
                method: 'get'
            }).then(_d => {
                console.log(_d.data)
                totalMoney_goodsNum.arr = _d.data
            }) */

            // 调用子组件footerTabber.vue的方法
            nextTick(() => {
                // console.log( sonRef )
                sonRef.value.sonFn()
            });
        }

        // 购物车title右侧的“编辑按钮” ==============>>>>>>>>
        let editBtn = ref('编辑')
        // 文件切换标识 
        let _isTitleEditFont = false
        // 底部footer，结算栏，显示、隐藏。默认显示，true
        let isTotalWrapShow = ref(true)
        // 底部footer，删除商品栏，显示、隐藏。默认隐藏，false
        let isDelGoodsShow = ref(false)
        // 单个商品左边的复选框，当点击title右上角“编辑”按钮时，隐藏。默认显示，true
        let isVantCheckBoxItemShow = ref(true)
        // 单个商品左边的，点击title右上角“编辑”按钮时，显示。默认隐藏，false
        let isDelEditInputShow = ref(false)

        // 点击编辑按钮，触发事件
        const editBtnEvent = () => {
            _isTitleEditFont = !_isTitleEditFont
            isDelGoodsShow.value = !isDelGoodsShow.value;
            isTotalWrapShow.value = !isTotalWrapShow.value;
            isVantCheckBoxItemShow.value = !isVantCheckBoxItemShow.value
            isDelEditInputShow.value = !isDelEditInputShow.value
            _isTitleEditFont === true ? editBtn.value = '完成' : editBtn.value = '编辑'
        }

        // 点击右上角编辑按钮时，商品左侧的checkbox按钮可以显示，并触发事件
        const editGoodsCheckboxKeyFn = (e) => {
            let _key = e.target.getAttribute('data-editkey')
            // console.log(_key)
            // 要把多个商品的key，保存在一个数组里，传入中间件，拼接sql语句，操作db，修改数据
            editGoodsArr(_key)
        }

        // 判断要删除的商品的数组中，有没有你新加入的商品的key？
        // 没有，才能添加；如果有，要删除；
        // 同学们注意，这不是数组去重的需求。
        // 点击右上角的编辑按钮，保存要删除的商品的key的数组
        let editDelGoodsKeyArr = []
        const editGoodsArr = (_key) => {
            // console.log(typeof _key)
            // 用findIndex()来判断，返回传入一个测试条件（函数）符合条件的数组第一个元素位置
            // 如果没有符合条件的元素返回 -1

            let _is = editDelGoodsKeyArr.findIndex(n => {
                return n === _key
            })
            // console.log(_is)

            // _is 等于-1，就是数组中，没有这个_key，可以push
            if (_is < 0) {
                editDelGoodsKeyArr.push(_key)
            } else {
                // _is，大于或等于0，就是数组中已经存在某个商品的key，就删除这个key
                // 删除数组中的元素，用.splice，可以向数组中添加、或删除项目
                // .splice，第一个参数是要添加、删除的项目，第二个是删除几个
                editDelGoodsKeyArr.splice(_is, 1)
            }
            // console.log(editDelGoodsKeyArr)
        }

        // 点击右上角编辑按钮之后，选择你要删除的商品
        // 把它们的key，保存在数组editDelGoodsKeyArr之中，
        // 点击右下角删除按钮，请求接口，修改db，更新页面
        const delGoodsKeyBtnFn = () => {
            console.log(editDelGoodsKeyArr)

            // 请求接口，删除shopping_cart表中的商品数据，根据key
            /* requestFn({
                url: '/mysql_delShopping_cartGoods',
                method: 'get',
                data: { n: editDelGoodsKeyArr }
            }).then(() => {

                // 再次从mysql中加载商品的数量
                // 从shopping_cart购物车表中，取得所有商品信息
                requestFn({
                    url: '/mysql_getShoppingGoodsInfo',
                    method: 'get'
                }).then(_d => {
                    // console.log(_d.data)
                    getAllGoods.arr = _d.data.goodsObj
                });
            }); */

            // 改写为Promise形式，解决回调地狱
            getFn('/mysql_delShopping_cartGoods', { n: editDelGoodsKeyArr })
                .then(_d => {
                    return getFn('/mysql_getShoppingGoodsInfo')
                })
                .then(_d => {
                    getAllGoods.arr = _d.data.goodsObj
                    editBtn.value = '编辑'
                    isDelGoodsShow.value = false
                    isTotalWrapShow.value = true

                    // 购物车中没有商品时的提示
                    if (_d.data.goodsObj.length === 0) {
                        isShopCartEmpty.value = true
                    }

                    // 单个商品左边的，点击title右上角“编辑”按钮时，显示。默认隐藏，false
                    isDelEditInputShow.value = false
                    // 退出编辑按钮时的，左侧商品的复选框
                    isVantCheckBoxItemShow.value = true

                    // 调用子组件footerTabber.vue的方法
                    nextTick(() => {
                        // console.log( sonRef )
                        sonRef.value.sonFn()
                    });
                });
        }

        return {
            allGoodsChecked,
            allGoodsCheckedEventFn,

            limitTime,
            pageHeight,
            shopingNumChangeFn,
            sonRef,

            getAllGoods,
            allGoodsCheckedFn,
            ageinGetAllGoodsFn,

            editBtn,
            editBtnEvent,
            isDelGoodsShow,
            isTotalWrapShow,
            isVantCheckBoxItemShow,
            isDelEditInputShow,
            editGoodsCheckboxKeyFn,
            delGoodsKeyBtnFn,

            isShopCartEmpty,
            totalMoney_goodsNum,
            getTotalMoney_goodsNum
        }
    },
    components: { footerTabber, addAndMinusBtn, vantCheckBoxItem }
}
</script>

<style scoped>
/* 整个页面的容器，是灰色的背景 */
.carPageWrap {
    background: #f1f3f5;
}

/* 购物车页面的title */
div.cartTitle {
    clear: both;
    overflow: hidden;
    padding: .2rem .5rem;
}

div.cartTitle h1 {
    float: left;
    font-size: .7rem;
}

div.cartTitle span {
    float: right;
    font-size: .4rem;
    margin-top: .2rem;
}

/* 商品列表 */
.shopInfoBox {
    margin: 0 .4rem;
    padding: .3rem;
    background: #fff;
    border-radius: .3rem;
}

.shopInfoBox h1 {
    overflow: hidden;
}

.allGoodsCheckBoxIcon {
    margin: .3rem 0;
    padding: 0 0 0 .7rem;
    background-image: url('https://res.vmallres.com/uomcdn/CN/sc/shop/VMALL-HUAWEIDEVICE/202203/90BC709CA0BD01DA1DDFA510535ACE6A.png');
    background-repeat: no-repeat;
    background-size: .55rem;
}

/* 限时特惠 */
.limitTime {
    clear: both;
    overflow: hidden;
    margin: .3rem 0;
    padding: 0 0 0 .3rem;
    background-image: url('data:image/png;base64,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');
    background-repeat: no-repeat;
    background-size: .25rem;
}

.limitTime em {
    float: left;
    font-size: .4rem;
    margin-right: .2rem;
}

.limitTime span {
    float: left;
    margin: .09rem .3rem 0 0;
}

/* 购物车中的所有的商品的列表容器 */
.goodsPanels {
    clear: both;
    overflow: hidden;
}

/* 购物车中的某个商品 */
.goodsPanels .goodsItem {
    clear: both;
    overflow: hidden;
}

.goodsPanels .goodsItem span.goodsImg {
    float: left;
    overflow: hidden;
    width: 2rem;
    height: 2rem;
}

.goodsPanels .goodsItem span.goodsImg img {
    width: 2rem;
    height: 2rem;
}

.goodsInfo {
    float: left;
    width: 6rem;
    overflow: hidden;
}

.goodsInfo p.p1 {
    font-size: .38rem;
    text-align: left;
    margin-bottom: .2rem;
}

.goodsInfo p.p2 {
    text-align: left;
    color: #666;
    /* //溢出隐藏 */
    overflow: hidden;
    /* //禁止换行 */
    white-space: nowrap;
    /* //... */
    text-overflow: ellipsis;
    margin-bottom: .2rem;
}

.priceLine {
    text-align: left;
}

.priceLine span {
    font-size: .4rem;
    color: #f00;
    margin-right: .2rem;
}

/* 优惠、服务，赠品 */
.otherInfo {
    clear: both;
    padding: .3rem 0 0 0;
    overflow: hidden;
    margin: .2rem 0 0 1rem;
}

.otherInfo span,
.otherInfo p {
    float: left;
}

.otherInfo em {
    float: right;
}

.otherInfo ul {
    float: left;
    width: 6rem;
}

.otherInfo ul li {
    text-align: left;
    margin-bottom: .3rem;
    padding: 0 0 0 .6rem;
    /* //溢出隐藏 */
    overflow: hidden;
    /* //禁止换行 */
    white-space: nowrap;
    /* //... */
    text-overflow: ellipsis;
}

.otherInfo ul li.icon_1 {
    background-image: url('https://res.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487243853/428_428_E47599189E3AF9836DABF8637A30767Amp.png');
    background-repeat: no-repeat;
    background-size: .55rem;
}

.otherInfo ul li.icon_2 {
    background-image: url('https://res.vmallres.com/pimages/product/6941487208531/428_428_FDA0EDDBE95421AC08DCC5DD197E236CED6ECAB7F1F837C3mp.png');
    background-repeat: no-repeat;
    background-size: .55rem;
}

/* 底部footer的产品总计栏 */
.totalWrap {
    overflow: hidden;
    width: 100%;
    height: 1.3rem;
    padding: .1rem 0;
    background-color: rgba(250, 250, 250, 0.95);
    position: absolute;
    left: 0;
    bottom: 1.4rem;
}

.totalWrap .allCheckFooter {
    float: left;
    margin: 0.4rem 0 0 .4rem;
}

.totalWrap .priceNumber {
    float: right;
    margin: 0.4rem .2rem 0 0;
    font-size: .35rem;
}

.totalWrap .priceNumber em {
    font-size: .25rem;
    color: #f00;
}

.totalWrap .priceNumber span {
    font-size: .4rem;
    color: #f00;
}
</style>
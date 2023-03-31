<template>
	<!-- 页面向下滚动 > 50时，顶部的tab菜单出现，开始 -->
	<!-- 
		scrollIntoView()，调用它的元素，会滚动到当前窗口的可见位置、区域
		document.querySelector('#id名').scrollIntoView(true)
		true，元素的顶端，对齐；
		false，元素的底端，对齐；
	 -->
	<!-- isTopTabMentShow -->
	<div class="tabTabMent" v-show="isTopTabMentShow">
		<!-- 回上一页 -->
		<div class='goBackPage' @click='goBackPageFn'>
			<svg t="1653448154730" class="iconLeft" viewBox="0 0 1024 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="3611" width="300" height="300">
				<path
					d="M767.7 480.9H207.1l217.7-217.7c12.3-12.3 12.3-32.4 0-44.7l-0.7-0.7c-12.3-12.3-32.4-12.3-44.7 0.1L107 490.3c-12.3 12.3-12.3 32.4 0 44.7l0.6 0.7c0.1 0 0.2 0.1 0.2 0.1l271.1 271.1c12.5 12.5 32.9 12.5 45.4 0s12.5-32.9 0-45.4L206.7 543.9h561c17.3 0 31.5-14.2 31.5-31.5s-14.2-31.5-31.5-31.5z"
					fill="#ffffff" p-id="3612"></path>
				<path d="M864.1 512.6a31.8 31.7 0 1 0 63.6 0 31.8 31.7 0 1 0-63.6 0Z" fill="#ffffff" p-id="3613"></path>
			</svg>
		</div>

		<!-- tabs标签按钮 -->
		<div style="margin:0 auto;width:70%;">
			<van-tabs background="#f1f3f5" @click-tab="tabTabMentEventFn">
				<van-tab title="商品"></van-tab>
				<van-tab title="类型"></van-tab>
				<van-tab title="评价"></van-tab>
				<van-tab title="详情"></van-tab>
			</van-tabs>
		</div>

		<!-- 右上角，按钮 -->
		<div class='popupWrap' @click='popupWrapFn'>
			<svg t="1653448550904" class="iconRight" viewBox="0 0 1073 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="5825" width="300" height="300">
				<path d="M121.904762 902.095238m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5826" fill="#ffffff"></path>
				<path d="M536.380952 512m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5827" fill="#ffffff"></path>
				<path d="M536.380952 121.904762m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5828" fill="#ffffff"></path>
				<path d="M121.904762 121.904762m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5829" fill="#ffffff"></path>
				<path d="M121.904762 512m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5830" fill="#ffffff"></path>
				<path d="M536.380952 902.095238m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5831" fill="#ffffff"></path>
				<path d="M950.857143 902.095238m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5832" fill="#ffffff"></path>
				<path d="M950.857143 121.904762m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5833" fill="#ffffff"></path>
				<path d="M950.857143 512m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5834" fill="#ffffff"></path>
			</svg>
		</div>
	</div>
	<!-- 页面向下滚动 > 50时，顶部的tab菜单出现，结束 -->

	<!-- 轮播图的整体容器，开始 -->
	<div id="anchor_A" class='swipeWrap'>
		<!-- 回上一页 -->
		<div class='goBackPage' @click='goBackPageFn'>
			<svg t="1653448154730" class="iconLeft" viewBox="0 0 1024 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="3611" width="300" height="300">
				<path
					d="M767.7 480.9H207.1l217.7-217.7c12.3-12.3 12.3-32.4 0-44.7l-0.7-0.7c-12.3-12.3-32.4-12.3-44.7 0.1L107 490.3c-12.3 12.3-12.3 32.4 0 44.7l0.6 0.7c0.1 0 0.2 0.1 0.2 0.1l271.1 271.1c12.5 12.5 32.9 12.5 45.4 0s12.5-32.9 0-45.4L206.7 543.9h561c17.3 0 31.5-14.2 31.5-31.5s-14.2-31.5-31.5-31.5z"
					fill="#ffffff" p-id="3612"></path>
				<path d="M864.1 512.6a31.8 31.7 0 1 0 63.6 0 31.8 31.7 0 1 0-63.6 0Z" fill="#ffffff" p-id="3613"></path>
			</svg>
		</div>

		<!-- 右上角，按钮 -->
		<div class='popupWrap' @click='popupWrapFn'>
			<svg t="1653448550904" class="iconRight" viewBox="0 0 1073 1024" version="1.1"
				xmlns="http://www.w3.org/2000/svg" p-id="5825" width="300" height="300">
				<path d="M121.904762 902.095238m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5826" fill="#ffffff"></path>
				<path d="M536.380952 512m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5827" fill="#ffffff"></path>
				<path d="M536.380952 121.904762m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5828" fill="#ffffff"></path>
				<path d="M121.904762 121.904762m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5829" fill="#ffffff"></path>
				<path d="M121.904762 512m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5830" fill="#ffffff"></path>
				<path d="M536.380952 902.095238m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5831" fill="#ffffff"></path>
				<path d="M950.857143 902.095238m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5832" fill="#ffffff"></path>
				<path d="M950.857143 121.904762m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5833" fill="#ffffff"></path>
				<path d="M950.857143 512m-121.904762 0a2.5 2.5 0 1 0 243.809524 0 2.5 2.5 0 1 0-243.809524 0Z"
					p-id="5834" fill="#ffffff"></path>
			</svg>
		</div>

		<!-- 右上角，弹出菜单 -->
		<div class='popUpMenu' v-if='isPopUpMenuShow'>
			<p>首页</p>
			<p>搜索</p>
			<p>分类</p>
			<p>购物车</p>
			<p>我的</p>
		</div>

		<!-- 轮播图 -->
		<van-swipe @change="onChangeImgFn" class="mySwipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for='n in swipeImgData.arr.goodsImg'>
				<img :src="n" />
			</van-swipe-item>
		</van-swipe>

		<!-- 轮播图，第几张图片的索引 -->
		<div class='imgInx'> {{ swipeImgInx }} / {{ swipeImgLengt }} </div>
	</div>
	<!-- 轮播图的整体容器，结束 -->

	<!-- 售价，倒计时，开始 -->
	<div class="goodsPriceDiv">
		<p class="p1">限时优惠</p>
		<p class="p2">
			<small>￥</small>
			{{ price }}
			<span>￥{{ old_price }}</span>
		</p>
		<!-- 还剩多少时间 -->
		<div class="goodsPriceRight">
			<span class="p3">距结束还剩</span>
			<van-count-down :time="countDownTime">
				<template #default="timeData">
					<span class="countDownTime_block">{{ timeData.hours }}</span>
					<span class="countDownTime_colon">:</span>
					<span class="countDownTime_block">{{ timeData.minutes }}</span>
					<span class="countDownTime_colon">:</span>
					<span class="countDownTime_block">{{ timeData.seconds }}</span>
				</template>
			</van-count-down>
		</div>
	</div>
	<!-- 售价，倒计时，结束 -->

	<!-- 产品名、优惠，开始 -->
	<div class="goodsTitleWrap">
		<h1> {{ goodsTitle }} </h1>
		<span> {{ goodsDes }} </span>
		<div class="getPromotion" @click="showPromotionFn">
			<label class="p1">优惠</label>
			<ul class="p2">
				<li v-for="n in promotion.arr">
					<p class="p3"> {{ n.title }} </p>
					{{ n.des }}
				</li>
			</ul>
			<!-- 三个小点icon -->
			<van-icon name="ellipsis" style="float:right;" />
		</div>
		<!-- 产品名、优惠的底部弹出菜单 -->
		<van-action-sheet v-model:show="isPromotionShow" cancel-text="确定" close-on-click-action title="促销"
			@cancel="onCancelPromotionBtn">
			<div class="content">
				<h1>内容</h1>
			</div>
		</van-action-sheet>
	</div>
	<!-- 产品名、优惠，结束 -->

	<!-- 商品的销售、类型、保障，开始 -->
	<div id="anchor_B" class="productSkuMain">
		<dl v-for="n in goodsStockInfo.arr">
			<dt>{{ n.name }}</dt>
			<dd v-for="m in n.stock">
				<em>{{ m.txt }}</em>
			</dd>
		</dl>
		<dl>
			<dt>数量</dt>
			<dd>
				<van-stepper v-model="stepperValue" />
			</dd>
		</dl>
		<dl>
			<dt>保障</dt>
			<dd>
				<em>选购</em><em class="redEm">碎屏宝</em><em class="redEm">延长宝</em>
			</dd>
		</dl>
	</div>
	<!-- 商品的销售、类型、保障，结束 -->

	<!-- 配送、服务，开始 -->
	<div class="productSendAddress">
		<!-- 送至 -->
		<div class="item" style="margin-bottom:.6rem;" @click="addressPopUp">
			<label>送到</label>
			<div class="send">
				<div class="addressWrap">
					<p v-for="n in selectAddressVal.arr">{{ n.name }}</p>
				</div>
				<span style="color:#f00;">现货</span>
			</div>
			<!-- 三个小点icon -->
			<van-icon name="ellipsis" style="float:right;" />
		</div>
		<!-- 服务 -->
		<div class="item">
			<label>服务</label>
			<div id="anchor_C" class="serve">
				<p>满48元包邮</p>
				<p>由华为终端提供商品、发货开票及售后服务</p>
			</div>
		</div>
		<!-- 弹出菜单 -->
		<van-action-sheet v-model:show="isAddressShow" close-on-click-action title="选择地区">
			<!-- 选择城市 -->
			<van-area :area-list="areaList" @confirm="resultSelectAddress" />
		</van-action-sheet>
	</div>
	<!-- 配送、服务，结束 -->

	<!-- 用户评价，开始 -->
	<div class="commentWrap">
		<header>
			<span class="spanL">用户评价(3785)</span>
			<span class="spanR">95% <em>好评></em></span>
		</header>
		<!-- 评论标签 -->
		<ul class="ulTip">
			<li>外观不错</li>
			<li>物流不错</li>
			<li>手感好</li>
			<li>电池不错</li>
		</ul>
		<!-- 用户评价，滚动 -->
		<div class="commentSwipeWrap">
			<van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
				<!-- 这里的数据是v-for循环的，现在先写死二个 -->
				<van-swipe-item>
					<div class="userSlider">
						<!-- 用户名、头像、评价星级 -->
						<div class="userAvatar">
							<label class="avatar">
								<img src="https://res.vmallres.com/rms/comment/image/U0959/CB4336B4DD0969D633BAB4B47B61BB79BA8FFA21BD0FD9C7F734B1506F6F8206/E37954522CE343FB5B8EF0CB.jpg"
									alt="" />
							</label>
							<!-- 用户名 -->
							<p class="p1">云***</p>
							<!-- 星星 -->
							<p class="p2">
								<van-rate v-model="rateValue" />
							</p>
						</div>
						<!-- 评价的内容 -->
						<p class="userSliderComment">用户未填写评价内容</p>
					</div>
				</van-swipe-item>
				<van-swipe-item>
					<div class="userSlider">
						<!-- 用户名、头像、评价星级 -->
						<div class="userAvatar">
							<label class="avatar">
								<img src="https://res.vmallres.com/rms/comment/image/U0959/CB4336B4DD0969D633BAB4B47B61BB79BA8FFA21BD0FD9C7F734B1506F6F8206/E37954522CE343FB5B8EF0CB.jpg"
									alt="" />
							</label>
							<!-- 用户名 -->
							<p class="p1">云***</p>
							<!-- 星星 -->
							<p class="p2">
								<van-rate v-model="rateValue" />
							</p>
						</div>
						<!-- 评价的内容 -->
						<p class="userSliderComment">除了小巧能折叠，其他不建议！没有智能遥控！没有无线充电！打游戏也不太方便！像素还行！比我的迈特30pro还容易发烫！后悔买了！</p>
					</div>
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="commentFooter">
			<span>查看全部评价</span>
			<span>购买咨询(22)</span>
		</div>
	</div>
	<!-- 用户评价，结束 -->

	<!-- 加入购物车，footer，开始 -->
	<div class="addShopingWrap">
		<van-action-bar>
			<van-action-bar-icon icon="chat-o" text="首页" @click="onClickIcon" />
			<van-action-bar-icon icon="cart-o" text="客服" @click="onClickIcon" />
			<van-action-bar-icon icon="shop-o" text="购物车" :badge="badgeVal" to="shopingcar" />
			<van-action-bar-button type="warning" text="加入购物车" @click="addGoodsToShopingcar" />
			<van-action-bar-button type="danger" text="立即购买" @click="onClickButton" />
		</van-action-bar>
	</div>
	<!-- 加入购物车，footer，结束 -->

	<!-- 产品详情图片，开始 -->
	<div id="anchor_D" class="picDetail" style="margin-bottom:1rem;">
		<img src="https://res.vmallres.com//uomcdn/CN/pms/202207/4E5603733256B9E580616DE91DA98D37.jpg" alt="">
		<img src="https://res.vmallres.com//uomcdn/CN/pms/202207/3BA0BB3F860625EDF3472339F8847658.jpg" alt="">
		<img src="https://res.vmallres.com//uomcdn/CN/pms/202207/EE27B62EE4D4CB84A832E8BB33CBB2F4.jpg" alt="">
	</div>
	<!-- 产品详情图片，结束 -->
</template>

<script>
import requestFn from '@/utils/https'
import { ref, reactive, onMounted } from 'vue'
import { areaList } from '@vant/area-data';

// 这里，没有r
import { useRoute, useRouter } from 'vue-router'

export default {
	name: 'goodsDetail',
	data() {
		return {
			msg: '商品详情页'
		}
	},
	setup() {
		// 路由对象
		const route = useRoute() //取值
		const router = useRouter() //路由跳转
		// console.log( route.query )

		// 轮播图的图片链接data
		let swipeImgData = reactive({ arr: [] })
		// 轮播图的总数量
		let swipeImgLengt = ref(0)
		// 当前轮播图的索引
		let swipeImgInx = ref(1)
		// 轮播图的切换事件
		const onChangeImgFn = (inx) => {
			// console.log(inx)
			swipeImgInx.value = inx + 1;
		}
		// 左上，回上一页按钮，
		const goBackPageFn = () => {
			router.push({
				path: '/category'
			})
		}
		// 右上角，弹出菜单，是否显示？
		let isPopUpMenuShow = ref(false)
		// 右上角，弹出菜单，是否显示的函数
		const popupWrapFn = () => {
			isPopUpMenuShow.value = !isPopUpMenuShow.value
		}

		// 原价
		let price = ref(0);
		// 优惠价
		let old_price = ref(0);
		// 商品名称
		let goodsTitle = ref('');
		// 商品描述
		let goodsDes = ref('');
		// 优惠信息
		let promotion = reactive({ arr: [] });
		// 商品库存信息
		let goodsStockInfo = reactive({ arr: [] });

		// 获取当前商品-【假数据】
		requestFn({
			url: '/getGoodsDetail',
			method: 'get',
			data: { key: route.query.goodsKey }
		}).then(_d => {
			let goodsData = _d.data[0];
			// console.log( goodsData )
			swipeImgData.arr = goodsData;
			swipeImgLengt.value = goodsData.goodsImg.length;

			// 商品信息
			price.value = goodsData.price
			old_price.value = goodsData.old_price
			goodsTitle.value = goodsData.goodsTitle
			goodsDes.value = goodsData.goodsDes
			promotion.arr = goodsData.promotion
			goodsStockInfo.arr = goodsData.goodsStockInfo
		});

		// 距离开始的倒计时
		const countDownTime = ref(30 * 60 * 60 * 1000);

		// 产品名、优惠的底部弹出菜单
		const isPromotionShow = ref(false);
		const showPromotionFn = () => {
			isPromotionShow.value = !isPromotionShow.value;
		}
		// 产品名、优惠的底部弹出菜单的取消按钮
		const onCancelPromotionBtn = () => {
			console.log('取消')
		}

		// 销售、保障模块的加减数字输入框
		const stepperValue = ref(1)

		// 配送、服务那个模块的，选择城市地址的弹出菜单
		const isAddressShow = ref(false)
		const addressPopUp = () => {
			isAddressShow.value = !isAddressShow.value
		}
		// 选择城市菜单返回的结果
		let selectAddressVal = reactive({ arr: [{ code: '000', name: '请选择你的配送地址' }] })
		const resultSelectAddress = (e) => {
			// console.log(e)
			selectAddressVal.arr = e
			// 让地址选择的弹出菜单，隐藏
			isAddressShow.value = false
		}

		// 用户评价，星星打分
		const rateValue = ref(3)

		// 加入购物车
		const onClickIcon = () => { console.log('aaaaaaaaaa') }
		const onClickButton = () => { console.log('bbbbbbbb') }

		// 购物车图标右上角的红圈数字
		let badgeVal = ref()

		// 页面打开时，先读取购物车中已经存在的商品的数量，
		// 写入购物车图标右上角的红圈数字
		requestFn({
			url: '/mysql_getStepperNum',
			method: 'get',
			data: { n: route.query.goodsKey }
		}).then(_d => {
			// console.log(_d.data)
			// 判断，当购物车中，没有当前商品的时候
			if (_d.data.length > 0) {
				badgeVal.value = _d.data[0].goods_num
			} else {
				badgeVal.value = 0
			}

		})

		// 当前的商品的信息
		let currentGoodsInfo = null;

		// 从mysql获得当前分类下所属的key，对应的商品的数据
		requestFn({
			url: '/mysql_getGoodsDetail',
			method: 'get',
			data: { key: route.query.goodsKey }
		}).then(_d => {
			// console.log( _d.data[0] )
			let _data = _d.data[0];
			let _temp1 = JSON.parse(_data.goodsImg)
			let _temp2 = JSON.parse(_data.goodsStockInfo)
			let _temp3 = JSON.parse(_data.promotion)

			_data.goodsImg = _temp1
			_data.goodsStockInfo = _temp2
			_data.promotion = _temp3

			// console.log(_data)
			currentGoodsInfo = _data;
		});

		// 加入购物车按钮
		const addGoodsToShopingcar = () => {
			// console.log(stepperValue.value)

			// 要存入到mysql购物车表中的商品的相关信息
			let _goodsObj = {
				goods_key: currentGoodsInfo.goodsKey,
				goods_img: currentGoodsInfo.goodsImg[0],
				unit_price: currentGoodsInfo.price,
				goods_title: currentGoodsInfo.goodsTitle,
				goods_des: currentGoodsInfo.goodsDes,
				goods_num: stepperValue.value
			}
			// console.log( _goodsObj )

			// 将商品详情信息整合之后，访问 mysql_saveToShoppingCar 接口，存入 shopping_cart 表中
			requestFn({
				url: '/mysql_saveToShoppingCar',
				method: 'get',
				data: { n: _goodsObj }
			}).then(() => {
				// 现在，这里的代码比较丑。但是不管它，先实现需求
				requestFn({
					url: '/mysql_getStepperNum',
					method: 'get',
					data: { n: route.query.goodsKey }
				}).then(_d => {
					// console.log(_d.data)
					badgeVal.value = _d.data[0].goods_num
				});
			});

			// 重置加减号按钮的值，为1
			stepperValue.value = 1
		}

		/* 
		这时，我想再增加商品数字怎么办？可能有同学会想，在这里+1呗，操作是对的，但思路不对
		你刷新华为官网，它的购物车还是4，因为它的数据是持久化的，在db里的。
		每次的操作，其实都是向后端接口，去提交你新增加的商品数量
		后端在去db中查找购物车当前有多少商品数字，然后再加上你传入的数字，
		再把结果返回给你，你再渲染到页面上，所以从这一节开始，咱们就需要mysql了
		 */

		/* 无论设计什么东西，都不能从中间开始，所以我们还是回到起点。
		就是 category，商品列表页，从db中读取某分类所属的商品信息
		也就是点击“新品”，显示新品推荐的二个手机，一个手表
		 */

		/* MySQL中无数组类型，通常将数组元素按某个字符分割以字符串形式存储
		mysql存储数组的方法：先将传入的数组字符串截取成多个字符；然后传入到临时表中；
		最后使用游标或者直接关联表过滤数据，即可达到mysql存数组的目的了
		更好的方法是，使用多个表，并在查询中加入它们
		数组是一种数据结构的概念，跟数据持久化没有关系
		 */

		/* 在这个项目中，mysql的数据库、表的设计，并不是重点，我也并不擅长。
		我们的目的，只是用mysql来保存数据，只要能通过node中间件，从mysql中查到数据，就ok了
		因为在实际工作中，做为前端开发的我们，基本上你没有可能直接操作数据库
		 */

		/* npm i mysql -D
		安装 phpstudy，使用它来操作mysql，很方便，很简单
		 */

		// 页面向下滚动>50，顶部的tab菜单，出现
		let scrollTop = 0
		let isTopTabMentShow = ref(false)
		document.addEventListener('scroll', () => {
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

			if (scrollTop > 50) {
				isTopTabMentShow.value = true;
			} else {
				isTopTabMentShow.value = false
			}
			// console.log( scrollTop, isTopTabMentShow.value)
		})

		const tabTabMentEventFn = (n) => {
			// console.log(n)

			switch (n.name) {
				case 0:
					document.querySelector('#anchor_A').scrollIntoView(true)
					break;
				case 1:
					document.querySelector('#anchor_B').scrollIntoView(true)
					break;
				case 2:
					document.querySelector('#anchor_C').scrollIntoView(true)
					break;
				case 3:
					document.querySelector('#anchor_D').scrollIntoView(true)
					break;
			}
		}

		return {
			isPromotionShow,
			onCancelPromotionBtn,
			showPromotionFn,
			swipeImgData,
			swipeImgLengt,
			onChangeImgFn,
			swipeImgInx,
			goBackPageFn,
			popupWrapFn,
			isPopUpMenuShow,
			countDownTime,
			stepperValue,
			addressPopUp,
			isAddressShow,
			areaList,
			resultSelectAddress,
			onClickIcon,
			onClickButton,
			rateValue,
			isTopTabMentShow,
			tabTabMentEventFn,

			// 商品相关信息
			price,
			old_price,
			goodsTitle,
			goodsDes,
			promotion,
			goodsStockInfo,
			selectAddressVal,

			// 购物车
			badgeVal,
			addGoodsToShopingcar
		}
	}
}
</script>

<style scoped>
.mySwipe .van-swipe-item {
	color: #fff;
	font-size: 20px;
	line-height: 150px;
	text-align: center;
	background: #fff;
}

.swipeWrap {
	position: relative;
}

.swipeWrap .imgInx {
	width: 35px;
	height: 20px;
	background: #666;
	border-radius: 10px;
	position: absolute;
	right: 10px;
	bottom: 10px;
	z-index: 99;
	color: #fff;
	line-height: 20px;
	text-align: center;
}

/* 回上一页 */
.goBackPage {
	position: absolute;
	left: 20px;
	top: 20px;
	background: #666;
	border-radius: 100%;
	z-index: 99;
	width: 32px;
	height: 30px;
	padding: 2px 0 0 0;
}

.goBackPage .iconLeft {
	width: 28px;
	height: 28px;
}

/* 右上角，按钮 */
.popupWrap {
	width: 32px;
	height: 26px;
	position: absolute;
	top: 20px;
	right: 20px;
	background: #666;
	border-radius: 100%;
	z-index: 99;
	padding: 6px 0 0 0;
}

.popupWrap .iconRight {
	width: 20px;
	height: 20px;
}

/* 右上角，弹出菜单 */
.popUpMenu {
	width: 104px;
	height: auto;
	border-radius: 10px;
	border: 1px solid #000;
	position: fixed;
	right: 10px;
	top: 51px;
	z-index: 9999;
	background: #fff;
	opacity: .8;
}

.popUpMenu p {
	height: 25px;
	text-align: center;
	border-bottom: 1px solid #000;
	line-height: 25px;
}

/* 售价，倒计时 */
.goodsPriceDiv {
	width: 100%;
	height: 56px;
	position: relative;
	background-image: linear-gradient(90deg, #FF313F 0%, #FF935A 100%);
}

.goodsPriceDiv p.p1 {
	font-size: .1rem;
	color: #fff;
	font-weight: normal;
	position: absolute;
	top: .3rem;
	left: .5rem;
}

.goodsPriceDiv p.p2 {
	font-size: .5rem;
	color: #fff;
	font-weight: bold;
	position: absolute;
	top: .8rem;
	left: .5rem;
}

.goodsPriceDiv p.p2 small {
	font-size: .1rem;
	font-size: normal;
}

.goodsPriceDiv p.p2 span {
	font-size: .1rem;
	text-decoration: line-through;
}

/* 距离结束还剩多少时间 */
.goodsPriceRight {
	background-color: #fdf0e8;
	width: 3rem;
	height: 56px;
	overflow: hidden;
	position: absolute;
	top: 0;
	right: 0;
}

.goodsPriceRight span.p3 {
	font-size: .2rem;
	font-size: normal;
	color: #f00;
	display: block;
	margin: .3rem 0 0 0;
}

.countDownTime_colon {
	display: inline-block;
	margin: 0 4px;
	color: #ee0a24;
}

.countDownTime_block {
	display: inline-block;
	width: 22px;
	color: #fff;
	font-size: 12px;
	text-align: center;
	background-color: #ee0a24;
}

/* 产品名、优惠，开始 */
.goodsTitleWrap {
	margin: 0.4rem;
	padding: .4rem;
	background: #f5f5f5;
	text-align: left;
	border-radius: .3rem;
}

.goodsTitleWrap h1 {
	font-size: .45rem;
}

.goodsTitleWrap span {
	color: #f00;
}

/* 产品title，赠送部分 */
.getPromotion {
	margin: .4rem 0;
	overflow: hidden;
}

.getPromotion label.p1 {
	font-size: .2rem;
	float: left;
	margin-right: .4rem;
}

.getPromotion ul.p2 {
	display: block;
	float: left;
}

.getPromotion ul.p2 li {
	padding: 0 0 .4rem 0;
	overflow: hidden;
}

.getPromotion ul.p2 li p.p3,
.getPromotion ul.p2 li p.p4 {
	border-radius: .1rem;
	color: #f00;
	display: inline;
	border: 1px solid #f00;
	padding: 0 .2rem;
	margin-right: .2rem;
}

.content {
	padding: 16px 16px 160px;
}

/* 商品的销售、类型、保障，开始 */
.productSkuMain {
	margin: 0.4rem;
	padding: .4rem;
	background: #f5f5f5;
	text-align: left;
	border-radius: .3rem;
}

.productSkuMain dl {
	clear: both;
	display: block;
	overflow: hidden;
	padding: .3rem 0;
}

.productSkuMain dl dt,
.productSkuMain dl dd {
	float: left;
}

.productSkuMain dl dt {
	margin-right: .3rem;
}

.productSkuMain dl dd em {
	padding: .2rem .3rem;
	background: #fff;
	margin-right: .3rem;
	border-radius: .2rem;
}

.productSkuMain dl dd em.redEm {
	color: #cf0a2c;
	background: rgba(207, 10, 44, .05);
}

/* 配送、服务，开始 */
.productSendAddress {
	margin: 0.4rem;
	padding: 0.4rem;
	background: #f5f5f5;
	text-align: left;
	border-radius: 0.3rem;
}

.productSendAddress div.item {
	clear: both;
	overflow: hidden;
}

.productSendAddress div.item label {
	float: left;
	margin-right: .5rem;
}

.productSendAddress div.item div.send,
.productSendAddress div.item div.serve {
	float: left;
	line-height: .6rem;
	margin-top: -.03rem;
}

.productSendAddress div.item div.send p,
.productSendAddress div.item div.serve p {
	padding-left: .6rem;
	background-image: url('../assets/icon_1.png');
	background-repeat: no-repeat;
	background-size: .45rem;
}

.productSendAddress div.addressWrap {
	padding-left: .6rem;
	background-image: url('../assets/icon_1.png');
	background-repeat: no-repeat;
	background-size: .45rem;
	overflow: hidden;
}

.productSendAddress div.addressWrap p {
	background-image: none !important;
	padding: 0 !important;
	float: left;
	margin: 0 .3rem 0 0;
}

/* 用户评价 */
.commentWrap {
	margin: 0.4rem;
	padding: 0.4rem;
	background: #f5f5f5;
	text-align: left;
	border-radius: 0.3rem;
}

.commentWrap header {
	overflow: hidden;
}

.commentWrap header span.spanL {
	float: left;
	font-size: .5rem;
}

.commentWrap header span.spanR {
	float: right;
	color: #f00;
	font-size: .4rem;
}

.commentWrap header span.spanR em {
	color: rgb(150, 150, 150);
	font-size: .3rem;
}

div.commentWrap ul.ulTip {
	overflow: hidden;
}

div.commentWrap ul.ulTip li {
	float: left;
	margin-right: .3rem;
	padding: .1rem .2rem;
	background: #ddd;
	border-radius: .2rem;
}

div.commentWrap div.commentFooter {
	padding: .3rem 0;
	text-align: center;
}

div.commentWrap div.commentFooter span {
	padding: .2rem 1rem;
	margin-right: .3rem;
	background: #ddd;
	border-radius: .2rem;
}

/* 用户评价，轮播图的wrap容器 */
.commentSwipeWrap {
	padding: .3rem 0;
}

/* 用户评价，轮播图样式 */
.my-swipe .van-swipe-item {
	color: #fff;
	font-size: 20px;
	line-height: 150px;
	text-align: center;
	background-color: #eee;
}

/* 单个在轮播中的，用户评价 */
.userSlider {
	width: auto;
	height: 3rem;
}

div.userAvatar {
	position: relative;
	padding: 0 0 0 1.3rem;
}

div.userAvatar label.avatar {
	position: absolute;
	top: 0;
	left: 0;
	width: 1rem;
	height: 1rem;
	display: block;
	overflow: hidden;
	border-radius: 100%;
}

div.userAvatar label.avatar img {
	width: 1rem;
}

div.userAvatar p.p1,
div.userAvatar p.p2 {
	height: .5rem;
	line-height: .5rem;
	text-align: left;
	color: #000;
	font-size: .3rem;
}

div.userSlider p.userSliderComment {
	height: auto;
	color: #000;
	font-size: .3rem;
	line-height: .6rem;
	text-align: left;
}

/* 页面向下滚动 > 50时，顶部的tab菜单出现，开始 */
.tabTabMent {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 1.5rem;
	z-index: 9999;
	background: #f1f3f5;
}
</style>
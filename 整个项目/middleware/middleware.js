let express = require('express')
let app = express()

// 测试mysql，开始
let mysql = require('mysql')

// 封装-创建mysql连接对象
let sqlConnection = null;
function mysqlConnFn() {
	sqlConnection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root',
		database: 'vmall_project'
	})
	sqlConnection.connect()
}

// 测试mysql，结束
// 【原则之一】：一个接口，只做一件事

// 用户上传头像，post请求
app.post('/mysql_uploadImg', (req, res) => {
	// 对于post请求，不太熟悉的同学，可以课后去网上自行学习一下
	// 这里有一个数据流的概念，同学们自行百度

	// 引入fs文件模块
	let fs = require('fs')

	let _imgBase64 = '';//接收传过来的数据

	// data事件，有数据时触发
	req.on('data', (chunk) => {
		_imgBase64 += chunk
	})

	// end事件，当数据全部接收之后，触发
	req.on('end', () => {
		// console.log(JSON.parse(_imgBase64))
		let imgObj = JSON.parse(_imgBase64)
		// console.log(imgObj.params.name)

		// 去掉图片base64码前面部分：data:image/png;base64
		let imgData = imgObj.params.n.replace(/^data:image\/\w+;base64,/, "")
		// console.log('------------')
		// console.log(imgData)

		// 要把base64，转为buffer对象。对于buffer对象不太熟悉的同学，课后自行百度查询
		const dataBuffer = new Buffer.from(imgData, 'base64')
		// console.log( dataBuffer )

		// __dirname，用于获得目录的绝对路径，不知道的同学，自行百度
		console.log(__dirname)
		let _dirInx = __dirname.indexOf('\middleware')
		// console.log(_dirInx)
		let _dirsrc = __dirname.substring(0, _dirInx)
		// console.log(_dirsrc)
		let _imgDirSrc = _dirsrc + 'src\\uploadImg\\' + imgObj.params.name
		// console.log(_imgDirSrc)

		// 写入文件，文件名，文件内容，写入文件后的回调
		fs.writeFile(_imgDirSrc, dataBuffer, (err) => {
			if (err) return
			// console.log('写入文件成功')

			// 把文件名等信息，返回客户端
			res.send({
				txt: '文件上传成功',
				name: imgObj.params.name
			})
		})
	})
})

// 根据用户id，更新用户地址信息
app.get('/mysql_updataAddress', (req, res) => {
	let _id = req.query.n
	let _obj = req.query.m
	// console.log(_id, _obj)

	let _obj2 = JSON.parse(_obj)
	// console.log(_obj2.name)

	// 创建mysql连接对象
	mysqlConnFn()

	// 拼接sql语句
	let sql = 'UPDATE address SET ';
	sql += 'name="' + _obj2.name + '",'
	sql += 'tel="' + _obj2.tel + '",'
	sql += 'province="' + _obj2.province + '",'
	sql += 'city="' + _obj2.city + '",'
	sql += 'county="' + _obj2.county + '",'
	sql += 'addressDetail="' + _obj2.addressDetail + '",'
	sql += 'areaCode="' + _obj2.areaCode + '",'
	sql += 'isDefault="' + _obj2.isDefault + '",'
	sql += 'postalCode="' + _obj2.postalCode + '" '
	sql += 'WHERE addressId=' + _id
	// console.log(sql)

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		let _o = {
			is: true,
			msg: '修改用户地址，成功！'
		}
		res.send(_o)
	})
	sqlConnection.end()

})

// 根据用户id，获得对应的地址信息
app.get('/mysql_getIdAddress', (req, res) => {
	let _id = req.query.n
	// console.log(_id)

	// 创建mysql连接对象
	mysqlConnFn()

	let sql = 'SELECT * FROM address WHERE addressId=' + _id

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.parse(JSON.stringify(result)))
		let resultObj = JSON.parse(JSON.stringify(result))
		res.send(resultObj)
	})
	sqlConnection.end()
})

// 删除用户地址接口
app.get('/mysql_delAddress', (req, res) => {
	let _id = req.query.n
	// console.log(_id)

	// 创建mysql连接对象
	mysqlConnFn()

	let sql = 'DELETE FROM address WHERE addressId=' + _id

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		let _o = {
			is: true,
			msg: '删除地址成功'
		}
		res.send(_o)
	})
	sqlConnection.end()
})

// 获取用户送货地址
app.get('/mysql_getAddress', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	let sql = 'SELECT * FROM address';

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		let _o = {
			is: true,
			msg: '新增地址成功'
		}
		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.parse(JSON.stringify(result)))

		let resultObj = JSON.parse(JSON.stringify(result))
		res.send(resultObj)
	})
	sqlConnection.end()
})

// 保存用户地址
app.get('/mysql_address', (req, res) => {
	let _obj = JSON.parse(req.query.n)
	console.log(_obj)

	let sql = ''
	sql += 'INSERT INTO address(name, tel, province, city, county, addressDetail, areaCode, isDefault, postalCode)'
	sql += 'VALUES('
	sql += '"' + _obj.name + '",'
	sql += '"' + _obj.tel + '",'
	sql += '"' + _obj.province + '",'
	sql += '"' + _obj.city + '",'
	sql += '"' + _obj.county + '",'
	sql += '"' + _obj.addressDetail + '",'
	sql += '"' + _obj.areaCode + '",'
	sql += '"' + _obj.isDefault + '",'
	sql += '"' + _obj.postalCode + '"'
	sql += ')'
	console.log(sql)

	// 创建mysql连接对象
	mysqlConnFn()

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		let _o = {
			is: true,
			msg: '新增地址成功'
		}
		res.send(_o)
	})
	sqlConnection.end()
})

// 用户登录接口
app.get('/mysql_login', (req, res) => {
	let _keyObj = JSON.parse(req.query.n)
	// console.log(_keyObj)
	// console.log(_keyObj.en_name)

	// 创建mysql连接对象
	mysqlConnFn()

	let sql = 'SELECT * FROM user_name WHERE en_name="' + _keyObj.en_name + '" and password="' + _keyObj.password + '"';
	// console.log( sql )

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.parse(JSON.stringify(result)))

		let resultObj = JSON.parse(JSON.stringify(result))
		let msgObj = null

		// 实际工作中，判断条件会非常多，但思路都是一样的
		if (resultObj.length > 0) {
			// 找到匹配用户，登录成功
			msgObj = {
				login: true,
				msg: _keyObj.en_name + '登录成功',
				cn_name: resultObj[0].cn_name,
				en_name: resultObj[0].en_name,
			}
		} else {
			// 用户不存在，没找着
			msgObj = {
				login: false,
				msg: _keyObj.en_name + '用户名不存在'
			}
		}
		res.send(msgObj)
	})
	sqlConnection.end()
})

// 用户注册接口
app.get('/mysql_register', async (req, res) => {
	let _obj = JSON.parse(req.query.n)
	// console.log(_obj)
	// console.log(_obj.cn_username)

	// 在注册新用户之前，先检查用户名是不是重复
	// await后面跟一个promise对象
	let _is = await checkUserNameFn(_obj)
	// console.log('_is：' + _is)

	if (_is) {
		// 有重名的
		res.send('{"error":true,"msg":"用户名重复"}')
	} else {
		// 可以注册
		// 创建mysql连接对象
		mysqlConnFn()

		let sql = 'INSERT INTO user_name(en_name, cn_name, password) VALUES ("' + _obj.en_username + '","' + _obj.cn_username + '","' + _obj.password + '")';
		// console.log(sql)

		sqlConnection.query(sql, function (err, result) {
			if (err) {
				return;
			}
			res.send('{"error":false,"msg":"新用户注册成功"}')
		})
		sqlConnection.end()
	}

})

// 在注册新用户之前，先检查用户名是不是重复
function checkUserNameFn(_nObj) {
	// 创建mysql连接对象
	mysqlConnFn()

	let sql = 'SELECT * FROM user_name WHERE en_name="' + _nObj.en_username + '"';
	// console.log(sql)

	return new Promise((resolve, reject) => {
		sqlConnection.query(sql, function (err, result) {
			if (err) {
				return;
			}
			// console.log(result)
			// console.log('-------------------------')
			// console.log(JSON.parse(JSON.stringify(result)))
			let resultObj = JSON.parse(JSON.stringify(result))
			if (resultObj.length > 0) {
				// 根据传入的注册名，能够找到结果，表示有同名的用户
				// console.log('用户名重复')
				resolve(true)
			} else {
				// 用户名不存在，可以注册
				// console.log('可以注册')
				resolve(false)
			}
		})
		sqlConnection.end()
	})

}

// 计算所有商品的总数、总价
app.get('/mysql_getGoodsMoney', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	let sql = " SELECT * FROM shopping_cart"

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.parse(JSON.stringify(result)))
		let resultObj = JSON.parse(JSON.stringify(result))
		let sendObj = {}
		// 所有商品数量
		sendObj.num = 0
		// 商品的总价
		sendObj.money = 0

		for (let n of resultObj) {
			// console.log(n.goods_num)
			sendObj.num += Number(n.goods_num)
			sendObj.money += Number(n.goods_num) * Number(n.unit_price)
		}
		// console.log(sendObj)

		res.send(sendObj)
	})
	sqlConnection.end()
})

// 点击右上角编辑按钮之后，选择你要删除的商品
// 把它们的key，保存在数组editDelGoodsKeyArr之中，
// 点击右下角删除按钮，请求接口，修改db，更新页面
// 请求接口，删除shopping_cart表中的商品数据，根据key
app.get('/mysql_delShopping_cartGoods', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	let _delKey = req.query.n;
	// console.log( _delKey )
	// console.log( _delKey.join(',') )

	// sql语句不是咱们的重点，我提前准备好，就直接写在这了
	// 一条sql删除多条记录
	let delSql = 'DELETE FROM shopping_cart WHERE goods_key in(' + _delKey.join(',') + ')'
	// console.log( delSql )

	sqlConnection.query(delSql, function (err, result) {
		if (err) {
			return;
		}

		res.send('')
	})
	sqlConnection.end()
})

// 当点击全选按钮时，把所有商品的checkbox的值，改为1或0
app.get('/mysql_editAllCheckBox', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	let _key = Number(req.query.n)

	let updataSql = 'UPDATE shopping_cart SET is_checkbox=' + _key

	sqlConnection.query(updataSql, function (err, result) {
		if (err) {
			return;
		}

		res.send('')
	})
	sqlConnection.end()
})

// 1、获取、保存全选按钮的状态
// 2、新加一个表，all_goods_check_state，字段：ischeck；默认值1，选中状态
// 3、单独建一个表，不要跟购物车商品或其它的，混在一起，不好维护
app.get('/mysql_getAllGoodsCheck', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	let _isCheckVal = Number(req.query.n)
	// console.log(_isCheckVal)
	let sql = ''
	// 不能直接用true、false，因为0会转为false
	if (_isCheckVal === 0 || _isCheckVal === 1) {
		// 如果_isCheckVal是0或1，说明是点击 全选按钮，那就updata更新
		sql = 'UPDATE all_goods_check_state SET ischeck=' + _isCheckVal
	} else {
		// 如果_isCheckVal是NaN，说明是刷新 页面，那就 读取db
		sql = " SELECT * FROM all_goods_check_state"
	}

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.parse(JSON.stringify(result)))

		res.send(JSON.stringify(result))
	})
	sqlConnection.end()
})

// 添加新的接口，mysql_editShoppingIsCheckbox
// 根据key，修改shopping_cart表中的，is_checkbox字段
app.get('/mysql_editShoppingIsCheckbox', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	// 接收页面传过来的数字，加减号中的数字
	let isCheckVal = Number(req.query.n)
	let keyVal = Number(req.query.m)
	// console.log(stepperValue, badgeVal)

	let updataSql = 'UPDATE shopping_cart SET is_checkbox=' + isCheckVal + ' WHERE goods_key=' + keyVal

	sqlConnection.query(updataSql, function (err, result) {
		if (err) {
			return;
		}

		res.send('')
	})
	sqlConnection.end()
})

// 点击shopingcar页面的加减按钮时，把key带上，修改shopping_cart表中的商品数
app.get('/mysql_editShoppingCart', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	// 接收页面传过来的数字，加减号中的数字
	let numVal = Number(req.query.n)
	let keyVal = Number(req.query.m)
	// console.log(stepperValue, badgeVal)

	let updataSql = 'UPDATE shopping_cart SET goods_num=' + numVal + ' WHERE goods_key=' + keyVal

	sqlConnection.query(updataSql, function (err, result) {
		if (err) {
			return;
		}

		res.send('')
	})
	sqlConnection.end()
})

// 获取购物车中，所有商品的信息
app.get('/mysql_getShoppingGoodsInfo', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	let sql = " SELECT * FROM shopping_cart"

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.parse(JSON.stringify(result)))
		let resultObj = JSON.parse(JSON.stringify(result))
		let sendObj = {}
		// 所有商品数量
		sendObj.num = 0
		sendObj.goodsObj = resultObj

		for (let n of resultObj) {
			// console.log(n.goods_num)
			sendObj.num += Number(n.goods_num)
		}
		// console.log( num )

		res.send(sendObj)
	})
	sqlConnection.end()
})

// 商品详情页，当点击 “加入购物车时，请求此接口”
// 将商品详情页的商品信息，保存在shopping_cart表中
// 1、当前商品的obj；2、商品详情页，加减框中的数字
app.get('/mysql_saveToShoppingCar', (req, res) => {

	// 接收页面传过来的数字，加减号中的数字
	let _nObj = JSON.parse(req.query.n)
	// console.log(_nObj)

	// 在加入购物车之前，先看看购物车当中，是否有相同key的商品
	checkSameProductFn(_nObj, (s2) => {
		// 创建mysql连接对象
		mysqlConnFn()

		sqlConnection.query(s2, function (err, result) {
			if (err) {
				return;
			}

			res.send('')
		})
		sqlConnection.end()
	})
})

// 1、先看看sql购物车表当中，是否有相同key的商品
// 2、如果有相同key的商品，那么要用updata语句， 把原有的商品数，和新增的商品相加，来更新它的num商品的数据
// 3、如果没有相同的key的商品，那么直接 insert 插入sql就好了

// 在加入购物车之前，先看看购物车当中，是否有相同key的商品
function checkSameProductFn(_o, callback) {
	// console.log(_o)

	// 创建mysql连接对象
	mysqlConnFn()

	let sql_1 = " SELECT * FROM shopping_cart WHERE goods_key=" + _o.goods_key;

	sqlConnection.query(sql_1, function (err, result) {
		if (err) {
			return;
		}

		// console.log(result)
		// console.log(JSON.stringify(result)) //转为string
		// console.log(JSON.parse(JSON.stringify(result))) //转为json
		let serarchKeyResult = JSON.parse(JSON.stringify(result));

		// 咱们在这里，判断的逻辑不搞那么复杂，就是有没有商品，就ok
		let sql_2;
		if (serarchKeyResult.length > 0) {
			// 有相同key的商品，sql语句用 update
			let _num = Number(_o.goods_num) + Number(serarchKeyResult[0].goods_num);
			sql_2 = 'UPDATE shopping_cart SET goods_num=' + _num + ' WHERE goods_key=' + _o.goods_key;
		} else {
			// 没有相同key的商品，sql语句用insert
			sql_2 = 'INSERT INTO shopping_cart(goods_key, goods_img, unit_price, goods_title, goods_des, goods_num,is_checkbox) VALUES (' + _o.goods_key + ',"' + _o.goods_img + '",' + _o.unit_price + ',"' + _o.goods_title + '","' + _o.goods_des + '",' + _o.goods_num + ',1)';
		}
		// console.log(sql_2)
		callback(sql_2)
	})
	sqlConnection.end()
}

// 点击加入购物车按钮时，请求此接口
// 产品数量加减号按钮，测试的接口
app.get('/stepper_num', (req, res) => {
	// 创建mysql连接对象
	mysqlConnFn()

	// 接收页面传过来的数字，加减号中的数字
	let stepperValue = Number(req.query.n)
	let badgeVal = Number(req.query.m)
	// console.log(stepperValue, badgeVal)

	let updataSql = 'UPDATE goods_num SET num=' + (stepperValue + badgeVal) + ' WHERE goodsKey=111'

	sqlConnection.query(updataSql, function (err, result) {
		if (err) {
			return;
		}

		res.send('')
	})
	sqlConnection.end()

})

// 页面打开时，先读取购物车中已经存在的【某个】商品的数量
app.get('/mysql_getStepperNum', (req, res) => {
	let _inx = Number(req.query.n);

	// 创建mysql连接对象
	mysqlConnFn()

	let sql = " SELECT * FROM shopping_cart WHERE goods_key=" + _inx

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}
		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.parse(JSON.stringify(result)))
		res.send(JSON.stringify(result))
	})
	sqlConnection.end()
})

// 连接查询mysql
// 根据侧边栏不同的按钮的索引，返回对应的数据
app.get('/mysql_sidebarGetGoods', function (req, res) {
	let sidebarInx = Number(req.query.n);
	// console.log( sidebarInx )

	// 创建mysql连接对象
	mysqlConnFn()

	// let sql = 'SELECT * FROM goodslist'
	let sql = 'SELECT * FROM `goodslist` WHERE `inx`=' + sidebarInx

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}

		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.stringify(result))

		res.send(JSON.stringify(result))
	})
	sqlConnection.end()
})

// 产品类别按钮
app.get('/goodsTypeData', function (req, res) {
	let _d = [{
		txt: '华为专区',
		url: ''
	}, {
		txt: 'HarmonyOS',
		url: ''
	}, {
		txt: '耳机',
		url: ''
	}, {
		txt: '手表',
		url: ''
	}, {
		txt: '智慧屏',
		url: ''
	}, {
		txt: '手机',
		url: ''
	}, {
		txt: '家用电器',
		url: ''
	}, {
		txt: '路由',
		url: ''
	}, {
		txt: '巨贵的手机',
		url: ''
	}]
	res.send(_d);
});

// 轮播图，接口
app.get('/swipeData', function (req, res) {
	let _d = [{
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202205/328C497A2F686340139495C5165C254D.jpg'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202205/EB10641616E3AD4B1C5DC5DBF774675E.jpg'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202205/5CB53959E5FBF561DC16520571C32E08.png'
	}]
	res.send(_d)
})

// 宫格组件，可拖动的产品类型按钮
app.get('/gridGoodsData', function (req, res) {
	let _d = [{
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202201/D28270EC6F90EE2276E0D32E13627CC1.png.50.webp',
		txt: '智慧办公'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202110/17EEB6C722EE2B2C3F211445A188DE6E.png.50.webp',
		txt: '智慧办公'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202204/22430EE59D15A544B4977948AF359745.gif',
		txt: '智能家居'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202203/76198C13648422D73C6FAADAE5836B1A.png.50.webp',
		txt: '华为手机'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202201/9B7C450D94BACCAC55940220924CE93F.png.50.webp',
		txt: 'AITO汽车'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202205/2F4DB8F259282A579FB29E22D38FE616.png.50.webp',
		txt: '众测'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202204/1A2F81D6414E007E0C0F066664ECB780.png.50.webp',
		txt: '鸿蒙智联'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202204/B483EA11B20CD5F9A851846ED95BE476.png.50.webp',
		txt: '华为智选'
	}, {
		imgurl: 'https://res.vmallres.com/uomcdn/CN/cms/202110/F01D274BCBE65DCD7C61289D5889C7F0.png.50.webp',
		txt: '运动健康'
	},]
	res.send(_d)
})

// 限时购
app.get('/limieGoodsData', function (req, res) {
	let _d = [{
		imgurl: 'https://res.vmallres.com/pimages//product/6941487238989/428_428_047A8AAD89C45343328FD313EEB94340C088DECAAFD4DB68mp.png',
		price: 999,
		ol_price: 1999
	}, {
		imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202204/gbom/6971404611472/428_428_24C47E14B09DBE6BB50FF1A571FADD9Amp.png',
		price: 888,
		ol_price: 1888
	}, {
		imgurl: 'https://res.vmallres.com/pimages//product/6972485890497/428_428_2F7DB9A458622D39C0FF66A1CBE8014ACA0026DDDA79946Emp.png',
		price: 777,
		ol_price: 17777
	}, {
		imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202110/gbom/6939991700085/428_428_7156D42F0620E7EF4B3A10B1582CC01Bmp.png',
		price: 666,
		ol_price: 1666
	}]

	res.send(_d)
})

// 分类页的，侧边导航的栏目名
app.get('/sidebarItemName', function (req, res) {
	let _d = [{
		sidebarName: '新品'
	}, {
		sidebarName: '手机'
	}, {
		sidebarName: '平板'
	}, {
		sidebarName: '笔记本'
	}, {
		sidebarName: '台显打印'
	}, {
		sidebarName: '耳机音箱'
	}, {
		sidebarName: '智慧屏'
	}, {
		sidebarName: '门锁路由'
	}, {
		sidebarName: '出行车品'
	}, {
		sidebarName: '数码配件'
	}, {
		sidebarName: '华为服务'
	}, {
		sidebarName: '数字内容'
	}, {
		sidebarName: '商用终端'
	}, {
		sidebarName: '可穿戴'
	}, {
		sidebarName: '华为智选'
	}, {
		sidebarName: '家用电器'
	}, {
		sidebarName: '智能家装'
	}, {
		sidebarName: '运动户外'
	}, {
		sidebarName: '家庭影音'
	}, {
		sidebarName: '个护健康'
	}, {
		sidebarName: '美食酒饮'
	}, {
		sidebarName: '教育玩具'
	}]

	res.send(_d)
})

// 根据侧边栏不同的按钮的索引，返回对应的数据
// 作废
app.get('/sidebarGetGoods', function (req, res) {
	let sidebarInx = Number(req.query.n);
	// console.log( typeof sidebarInx, sidebarInx )

	// 现在还没有数据库，所以数据先写在这里
	let _d = [{
		// inx，表示你点的是哪个sidebar按钮
		inx: 0,
		title: '新品推荐0',
		goods: [{
			imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202204/gbom/6941487261352/428_428_79227E5C15D7A07A0E513B8737074254mp.png',
			// 每个商品的key，是唯一的
			goodsKey: 111,
			goodsName: 'HUAWEI Mate Xs 2',
		}, {
			imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202205/gbom/6941487261307/428_428_BACB14CF39B419EA7964719059132AAAmp.png',
			goodsKey: 222,
			goodsName: 'HUAWEI P50 Pocket',
		}, {
			imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202204/gbom/6941487249428/428_428_D0425B49F36377EBC15687B3E52E955Amp.png',
			goodsKey: 333,
			goodsName: 'WATCH GT 3 Pro',
		}]
	}, {
		inx: 1,
		title: '手机周边1',
		goods: [{
			imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202204/gbom/GB57020609/428_428_6C7C02A83B5A67CE4C6B6DFB2A209D89mp.png',
			goodsKey: 444,
			goodsName: '问界M5 后驱标准版 智能豪华高性能SUV',
		}, {
			imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202204/gbom/GB50050000301/428_428_DCE0C5B5D20412954B0A32A23007E4F2mp.png',
			goodsKey: 555,
			goodsName: 'AITO 问界M5 预约试驾',
		}, {
			imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202203/gbom/6975250720128/428_428_7A462F649DE5F2FE2C5B9661E71DB875mp.jpg',
			goodsKey: 666,
			goodsName: 'AITO汽车专享3M车窗膜',
		}]
	}, {
		inx: 2,
		title: '电脑鸿蒙智联2',
		goods: [{
			imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202202/gbom/6971101730148/428_428_9DA674DA3845657D0AC5587DFFB54E7Emp.jpg',
			goodsKey: 777,
			goodsName: '万播智能投影仪 T2R Max',
		}, {
			imgurl: 'https://res.vmallres.com/pimages//uomcdn/CN/pms/202205/sbom/4003040002801/428_428_212139D80AE96C98623A7CE5D0C37869.png',
			goodsKey: 888,
			goodsName: 'Helmetphone MT1 Neo智能骑行头盔 （山地/公路）',
		}, {
			imgurl: 'https://res.vmallres.com/pimages//FssCdnProxy/vmall_bop_server/BopMaterialCenter/428_428_BB84B49EE6B479DE5C58D8B9E8746F2C.png',
			goodsKey: 999,
			goodsName: '艾力斯特（iRest）年轻兀按摩椅',
		}]
	}]

	// filter筛选，匹配按钮索引的值
	let _goods = _d.filter(_obj => {
		// 返回符合条件的 obj
		return _obj.inx === sidebarInx
	})

	res.send(_goods)
})

// 商品详情页，根据商品的key，返回对应的商品详情
// 因为是假数据，而且根据课程进度，数据要不断的调整
// 所以上面1~9的商品，咱们只做二个用以演示
app.get('/mysql_getGoodsDetail', (req, res) => {
	let _key = Number(req.query.key);

	// 创建mysql连接对象
	mysqlConnFn()

	let sql = " SELECT * FROM product_library WHERE goodsKey=" + _key;

	sqlConnection.query(sql, function (err, result) {
		if (err) {
			return;
		}

		// console.log(result)
		// console.log('-------------------------')
		// console.log(JSON.stringify(result))

		res.send(JSON.stringify(result))
	})
	sqlConnection.end()
})

// 商品详情页，根据商品的key，返回对应的商品详情
// 因为是假数据，而且根据课程进度，数据要不断的调整
// 所以上面1~9的商品，咱们只做二个用以演示
app.get('/getGoodsDetail', function (req, res) {
	let _key = Number(req.query.key);
	// console.log( typeof _key )
	// console.log( _key )
	let _d = [{
		goodsKey: 111,
		goodsImg: [
			'https://res.vmallres.com/pimages//uomcdn/CN/pms/202205/displayProduct/10086488402232/428_428_a_mobile3F37F412519B440256A62B260A7F8B45.png',
			'https://res.vmallres.com/pimages//uomcdn/CN/pms/202204/gbom/6941487261352//428_428_79227E5C15D7A07A0E513B8737074254mp.png',
			'https://res.vmallres.com/pimages//uomcdn/CN/pms/202204/gbom/6941487261352/group//428_428_B13384331D3C89C498BFF042F814B1AB.png'
		],
		price: 8099,
		old_price: 8999,
		goodsTitle: 'HUAWEI Mate Xs 2 8GB+256GB （雅黑）',
		goodsDes: '【新品每天10:08限时抢购】更多甄选手机点击前往>>',
		promotion: [{
			title: '限时特价',
			des: '限时直降30元'
		}, {
			title: '分期免息',
			des: '银联、花呗、掌上生活、工行分期'
		}, {
			title: '赠送积分',
			des: '购买即送商城积分。。。'
		}],
		// 凡是颜色、版本，都对应着【库存】stock
		// 这个数据的结构，是我个人的根据咱们当前项目的需求，进行的设计，不完全合理，但肯定大方向是没有问题的
		// 因为咱们不知道华为它的实际的数据结构，只能是根据它的产品展示，进行反向的推测和设计，它的数据的结构
		// 但是在实际的工作当中，这种思路是没有问题的。但在这里呢，只供同学们学习参考
		goodsStockInfo: [{
			name: '销售',
			stock: [{
				txt: '全款购买',
				infoKey: ''
			}, {
				txt: '双11预定',
				infoKey: ''
			}]
		}, {
			name: '颜色',
			stock: [{
				txt: '黑色'
			}, {
				txt: '白色'
			}, {
				txt: '蓝色'
			}, {
				txt: '金色'
			}]
		}, {
			name: '版本',
			stock: [{
				txt: '8GB+256GB'
			}, {
				txt: '12GB+512GB'
			}, {
				txt: '8GB+512GB'
			}]
		}, {
			name: '网络',
			stock: [{
				txt: '4G全网通'
			}]
		}, {
			name: '类型',
			stock: [{
				txt: '官方标配'
			}]
		}]
		// 更多的属性就不再多写了，思路相同

	}, {
		// 第二个商品，只写几个，其余属性同上
		goodsKey: 222,
		goodsImg: [
			'https://res.vmallres.com/pimages//uomcdn/CN/pms/202210/displayProduct/10086315434669/428_428_b_mobile48DD403AEAD1A777C1F34E9DF57F72A7.png',
			'https://res.vmallres.com/pimages//uomcdn/CN/pms/202208/gbom/6941487279401/group//428_428_CE8D5ADA388A6FC54396DBCC8B82184E.png',
			'https://res.vmallres.com/pimages//uomcdn/CN/pms/202208/gbom/6941487279401/group//428_428_CD8F0799421269AC23B51F99C0DFA2A0.jpg',
			'https://res.vmallres.com/pimages//uomcdn/CN/pms/202208/gbom/6941487279401/group//428_428_F8E1AFA7064794F591593A74D2BC3720.jpg'
		],
		price: 8338,
		old_price: 8988,
		goodsTitle: '【新品】华为路由 Q6 网线版 （1母3子套装）Wi-Fi 6+ 3000Mbps 子母路由 全屋千兆网线组网'
	}]

	let _goodsResult = _d.filter(_d => {
		return _d.goodsKey === _key
	})

	res.send(_goodsResult)
})

app.listen(8083, function () {
	console.log('8083，中间件已经执行')
})
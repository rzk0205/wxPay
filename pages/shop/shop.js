// pages/shop/shop.js
import ShopModel from "../../model/shop"
import {addCart} from "../../common/cart"
import {navigateTo} from "../../utils/navigaet"
import Storage from '../../utils/storage'
Page({
	async getBanner() {
		const res = await ShopModel.getShopBanner()
		// console.log(res);
		this.setData({
			bannerData:res.data
		})
  },
async	getShopCode(event){
		console.log(event);
		const qcode=event.detail
		if(!qcode) return
	try {
		const res=await ShopModel.getShopingInfo(qcode)
		console.log(res);
		// 如果商品信息获取失败,则不继续往下执行
		if(!res.success) return

		const result=res.result

		// 获取商品的数据小于等于0 , 说明没有当前条形码的商品数据,则不继续往下执行
		if(result.length <= 0) return
		addCart(result[0])
		navigateTo("/pages/cart/cart")
	} catch (error) {
		console.log(error);
	}
  },
  getCartList(){
    const cartList = Storage.get("carts")
    const  status = cartList.length > 0 ? true : false
    const count = cartList.length
    this.setData({
      cartList,
      status,
      count
    })

  },
	/**
	 * 页面的初始数据
	 */
	data: {
    bannerData: [],
    cartList:[],
    status:false,
    count:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getBanner()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {
this.getCartList()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})
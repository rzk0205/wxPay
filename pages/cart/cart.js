// pages/cart/cart.js
import Storage from "../../utils/storage"
import ShopModel from "../../model/shop"
import {addCart} from "../../common/cart"
// import {navigateTo} from "../../utils/navigaet"
Page({
  handleDecrement(event){
    this.handleComputed(event,'decrement')
    this.handleComputedPrice()
  },
  handleIncrement(event){
    this.handleComputed(event,'increment')
    this.handleComputedPrice()

  },
  handleComputed(event,active){
    // console.log(event);
    const _index=event.currentTarget.dataset.index
    active==='increment'?this.data.cartList[_index].num+=1:this.data.cartList[_index].num-=1
    if(this.data.cartList[_index].num<=0){
      this.data.cartList[_index].num=1
      this.handleModalAction(_index)
      return
    }
    this.setData({
      cartList:this.data.cartList
    })
    Storage.set("carts",this.data.cartList)
  },
  handleComputedPrice(){
    let totalPrice=0
    this.data.cartList.forEach(item=>{
      const total=(item.num*item.price).toFixed(2)
      totalPrice+=Number.parseFloat(total)
      this.setData({
        totalPrice
      })
    })
  },
  handleModalAction(index){
    wx.showModal({
      title: '提示',
      content: '要删除这个商品吗',
      success: (res)=> {
        if (res.confirm) {
          this.data.cartList.splice(index,1)
          this.setData({
            cartList : this.data.cartList
          })
          Storage.set("carts",this.data.cartList)
          this.handleComputedPrice()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getShopCode(event){
    console.log(event);
console.log(1);
  },
	/**
	 * 页面的初始数据
	 */
	data: {
    cartList:[],
    totalPrice:0
	},
	getCartList(){
    const cartList = Storage.get("carts")
    
    if(cartList.length < 0) return
    this.setData({
      cartList
    })
    this.handleComputedPrice()
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
    // navigateTo("/pages/cart/cart")
    this.getCartList()
	} catch (error) {
		console.log(error);
	}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getCartList()
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
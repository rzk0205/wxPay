import Storage from "../utils/storage"
import ShopModel from "../model/shop"
// import {addCart} from "../../common/cart"
import {navigateTo} from "../utils/navigaet"
const addCart=(data)=>{
const carsArray=[]
if(!hasLocalData()){
	data.num=1
	carsArray.push(data)
	Storage.set("carts",carsArray)
	console.log(carsArray);
}else{
	const localData=Storage.get("carts")
	// if(hasShopData(data,localData)){
	// 	localData.forEach(item=>{
	// 		if(item._id===data._id){
	// 			item.num+=1
	// 		}
	// 	})
	// }else{
	// 	data.num=1
	// 	localData.push(data)
	// }
	const _data=localData.find(item=>{
		return item._id===data._id
	})
	if(_data){
		_data.num+=1
	}else{
		data.num=1
		localData.push(data)
	}
	Storage.set("carts", localData)
	console.log(localData);

}
}
// const getShopCode= async (event,url)=>{
//   const qcode=event.detail
//   if(!qcode) return
// try {
//   const res=await ShopModel.getShopingInfo(qcode)
//   console.log(res);
//   // 如果商品信息获取失败,则不继续往下执行
//   if(!res.success) return

//   const result=res.result

//   // 获取商品的数据小于等于0 , 说明没有当前条形码的商品数据,则不继续往下执行
//   if(result.length <= 0) return
//   addCart(result[0])
//   navigateTo(url)
// } catch (error) {
//   console.log(error);
// }
// }

/**
 * 检测本地有没有存储商品的数据 (检测是否是第一次存储)
 */
const hasLocalData = () => {
  const carts = Storage.get("carts")
  const status = carts ? true : false
  return status
}

// const hasShopData = (data, localData) => {
//   const _data = localData.filter(item=>{
//    return item._id === data._id
//   })
//   return _data.length > 0 ? true : false
// }

export {addCart}
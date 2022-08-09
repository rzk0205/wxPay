import Storage from "../utils/storage"

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
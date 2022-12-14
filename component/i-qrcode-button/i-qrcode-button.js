// component/i-qrcode-button/i-qrcode-button.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
    type:String,
    status :Boolean,
    count : {
      type : Number,
      value : 0
    }
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleScanCode(){
			wx.scanCode({
        onlyFromCamera: true,
        success : (res)=>{
          this.triggerEvent("getResult", res.result)
        },
        fail : (err)=>{
          console.log("取消扫码")
        }
      })
		}
	}
})

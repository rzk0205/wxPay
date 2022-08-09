import {APIConfig} from "../config/config"
import wxToPromise from "./wx"
import exceptionMessage from "../config/exceptionMessage"
class Http{
static	async request({url, method = 'GET', data = {}, name = 'api1'}, options){
		wx.showLoading()
		try {
			const res=await wxToPromise('request',{
				url:APIConfig[name].baseURL+url,
				method,
				data,
				...options
			})
			wx.hideLoading()
			if(res.statusCode < 400){
        return res.data
      }
  
      if(res.statusCode === 401){
        // token过期, 登录超时
        return 
			}
			Http._showError(res.data.code,res.data.msg)
		} catch (error) {
			console.log(error);
			wx.hideLoading()
			// _showError(error.data.code,error.data.msg)
		}
		
	}
	static	_showError(code, msg){
    let title = ""
    title = exceptionMessage[code] || msg || '发生未知错误'
    wx.showToast({
      title,
      icon : 'none',
      duration : 3000
    })
  }
}

export default Http
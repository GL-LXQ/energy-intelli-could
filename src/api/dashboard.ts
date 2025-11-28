import {get} from "@/utils/http"

//获取图标数据
const getChartDataApi = () => {
  return get('/chartData')
}

export {
  getChartDataApi
}
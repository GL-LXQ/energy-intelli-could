import {get} from "@/utils/http"

//获取图标数据
const getChartDataApi = () => {
  return get('/chartData')
}

function getChartDataApi2(){
    return get('/chartData2')
}

function getChartDataApi3(){
    return get('/chartData3')
}

export {
  getChartDataApi,
  getChartDataApi2,
  getChartDataApi3
}